"use server";

import { redirect } from "next/navigation";
import { z } from "zod";
import { sendEmail, fileToAttachment } from "@/lib/email";
import { verifyTurnstileToken } from "@/lib/turnstile";
import { zodErrorToFieldErrors, type ActionState } from "@/lib/formErrors";
import { getJobBySlug } from "@/data/jobs";
import { genderOptions, contactTimeOptions, experienceOptions } from "@/data/entryFormOptions";

// 採用担当の受信先。環境変数が未設定でも届くよう既定値を持たせる。
const RECRUIT_EMAIL = process.env.RECRUIT_NOTIFICATION_EMAIL || "jinji@norbdence.com";
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
// 添付はPDFのみ許可する（許可リスト方式）。拡張子とMIMEタイプの両方を見る。
const ALLOWED_EXTENSION = ".pdf";
const ALLOWED_MIME_TYPE = "application/pdf";

// フリガナは全角カタカナのみ（長音符・中点・スペースは許可）。
const KANA_PATTERN = /^[ァ-ヶー・　 ]+$/;
const KANA_MESSAGE = "全角カタカナで入力してください";

const genderValues = genderOptions.map((o) => o.value) as [string, ...string[]];
const experienceValues = experienceOptions.map((o) => o.value) as [string, ...string[]];

const entrySchema = z
  .object({
    job: z.string().trim().min(1, "希望職種を選択してください"),
    experience: z.enum(experienceValues, { message: "経験有無を選択してください" }),
    lastName: z.string().trim().min(1, "姓を入力してください"),
    firstName: z.string().trim().min(1, "名を入力してください"),
    lastNameKana: z
      .string()
      .trim()
      .min(1, "フリガナ（セイ）を入力してください")
      .regex(KANA_PATTERN, KANA_MESSAGE),
    firstNameKana: z
      .string()
      .trim()
      .min(1, "フリガナ（メイ）を入力してください")
      .regex(KANA_PATTERN, KANA_MESSAGE),
    birthDate: z.string().trim().min(1, "生年月日を入力してください"),
    gender: z.enum(genderValues, { message: "性別を選択してください" }),
    tel: z.string().trim(),
    email: z.string().trim(),
    contactTime: z.array(z.string()),
    remarks: z.string().trim().optional(),
  })
  .refine((data) => data.tel.length > 0 || data.email.length > 0, {
    message: "電話番号またはメールアドレスのいずれかを入力してください",
    path: ["contact"],
  })
  .refine((data) => data.email.length === 0 || z.string().email().safeParse(data.email).success, {
    message: "メールアドレスの形式が正しくありません",
    path: ["email"],
  });

function validateOptionalFile(file: File | null): string | null {
  if (!file || file.size === 0) return null;
  if (file.size > MAX_FILE_SIZE) return "ファイルサイズは10MB以下にしてください";
  const hasAllowedExtension = file.name.toLowerCase().endsWith(ALLOWED_EXTENSION);
  // type は空文字で送られてくる場合があるため、その場合は拡張子のみで判定する。
  const hasAllowedMimeType = file.type === "" || file.type === ALLOWED_MIME_TYPE;
  if (!hasAllowedExtension || !hasAllowedMimeType) return "添付できるのはPDFファイルのみです";
  return null;
}

export async function submitEntryForm(_prevState: ActionState, formData: FormData): Promise<ActionState> {
  if (formData.get("consent") !== "on") {
    return { status: "error", message: "個人情報の取り扱いへの同意が必要です。" };
  }

  const turnstileToken = formData.get("turnstileToken");
  const verification = await verifyTurnstileToken(typeof turnstileToken === "string" ? turnstileToken : null);
  if (!verification.success) {
    return { status: "error", message: "スパム対策の確認に失敗しました。もう一度お試しください。" };
  }

  const parsed = entrySchema.safeParse({
    job: formData.get("job"),
    experience: formData.get("experience"),
    lastName: formData.get("lastName"),
    firstName: formData.get("firstName"),
    lastNameKana: formData.get("lastNameKana"),
    firstNameKana: formData.get("firstNameKana"),
    birthDate: formData.get("birthDate"),
    gender: formData.get("gender"),
    tel: formData.get("tel"),
    email: formData.get("email"),
    contactTime: formData.getAll("contactTime"),
    remarks: formData.get("remarks"),
  });

  const fieldErrors = parsed.success ? {} : zodErrorToFieldErrors(parsed.error);

  const resumeFile = formData.get("resumeFile");
  const careerFile = formData.get("careerFile");
  const resumeFileError = resumeFile instanceof File ? validateOptionalFile(resumeFile) : null;
  const careerFileError = careerFile instanceof File ? validateOptionalFile(careerFile) : null;
  if (resumeFileError) fieldErrors.resumeFile = [resumeFileError];
  if (careerFileError) fieldErrors.careerFile = [careerFileError];

  if (!parsed.success || resumeFileError || careerFileError) {
    return {
      status: "error",
      errors: fieldErrors,
      message: "入力内容をご確認のうえ、もう一度お試しください。",
    };
  }

  const {
    job,
    experience,
    lastName,
    firstName,
    lastNameKana,
    firstNameKana,
    birthDate,
    gender,
    tel,
    email,
    contactTime,
    remarks,
  } = parsed.data;
  const jobInfo = job === "undecided" ? null : getJobBySlug(job);
  const jobLabel = jobInfo ? jobInfo.title : "まだ決まっていない";
  const experienceLabel = experienceOptions.find((o) => o.value === experience)?.label ?? experience;
  const genderLabel = genderOptions.find((o) => o.value === gender)?.label ?? gender;
  const contactTimeLabel =
    contactTime.length > 0
      ? contactTime.map((v) => contactTimeOptions.find((o) => o.value === v)?.label ?? v).join("、")
      : "指定なし";

  const attachments = (
    await Promise.all([
      resumeFile instanceof File ? fileToAttachment(resumeFile) : null,
      careerFile instanceof File ? fileToAttachment(careerFile) : null,
    ])
  ).filter((a): a is { filename: string; content: Buffer } => a !== null);

  if (RECRUIT_EMAIL) {
    await sendEmail({
      to: RECRUIT_EMAIL,
      subject: `[エントリー] ${jobLabel} - ${lastName}${firstName}様`,
      text: [
        "採用サイトよりエントリーがありました。",
        "",
        `希望職種: ${jobLabel}`,
        `経験有無: ${experienceLabel}`,
        `氏名: ${lastName} ${firstName}（${lastNameKana} ${firstNameKana}）`,
        `生年月日: ${birthDate}`,
        `性別: ${genderLabel}`,
        `電話番号: ${tel || "（未入力）"}`,
        `メールアドレス: ${email || "（未入力）"}`,
        `連絡可能時間: ${contactTimeLabel}`,
        `履歴書の添付: ${resumeFile instanceof File && resumeFile.size > 0 ? "あり" : "なし"}`,
        `職務経歴書の添付: ${careerFile instanceof File && careerFile.size > 0 ? "あり" : "なし"}`,
        "",
        "その他特記事項:",
        remarks || "（記載なし）",
      ].join("\n"),
      attachments: attachments.length > 0 ? attachments : undefined,
    });
  }

  if (email) {
    await sendEmail({
      to: email,
      subject: "【株式会社ノーブデンス】エントリーありがとうございます",
      text: [
        `${lastName} ${firstName} 様`,
        "",
        "この度はエントリーいただき、誠にありがとうございます。",
        `希望職種「${jobLabel}」にて、内容を確認のうえ担当者よりご連絡いたします。`,
        "",
        "株式会社ノーブデンス",
      ].join("\n"),
    });
  }

  redirect("/entry/thanks");
}
