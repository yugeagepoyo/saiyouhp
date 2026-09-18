import { Resend } from "resend";

/**
 * RESEND_API_KEY が未設定の場合（開発中・キー未取得時）は実際の送信をスキップし、
 * 内容をコンソールに出力するだけにする。本番公開前に必ず環境変数を設定すること。
 */

const FROM_ADDRESS = process.env.RESEND_FROM_EMAIL || "NORBDENCE RECRUIT <onboarding@resend.dev>";

interface SendEmailInput {
  to: string;
  subject: string;
  text: string;
  attachments?: { filename: string; content: Buffer }[];
}

export async function sendEmail(input: SendEmailInput): Promise<{ sent: boolean }> {
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    console.warn(
      `[email] RESEND_API_KEY が未設定のため送信をスキップしました。宛先: ${input.to} / 件名: ${input.subject}`,
    );
    return { sent: false };
  }

  const resend = new Resend(apiKey);
  const { error } = await resend.emails.send({
    from: FROM_ADDRESS,
    to: input.to,
    subject: input.subject,
    text: input.text,
    attachments: input.attachments,
  });

  if (error) {
    console.error("[email] send failed", error);
    return { sent: false };
  }

  return { sent: true };
}

export async function fileToAttachment(file: File): Promise<{ filename: string; content: Buffer } | null> {
  if (!file || file.size === 0) return null;
  const buffer = Buffer.from(await file.arrayBuffer());
  return { filename: file.name, content: buffer };
}
