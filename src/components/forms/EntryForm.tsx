"use client";

import { useActionState, useState } from "react";
import { submitEntryForm } from "@/app/entry/actions";
import { initialActionState } from "@/lib/formErrors";
import { ConsentBox, ENTRY_PRIVACY_TEXT } from "./ConsentBox";
import { TurnstileWidget } from "./TurnstileWidget";
import { labelClass, inputClass, requiredMark } from "./fieldStyles";
import {
  genderOptions,
  contactTimeOptions,
  experienceOptions,
  CONTACT_TIME_ANYTIME_VALUE,
} from "@/data/entryFormOptions";
import type { Job } from "@/data/jobs";

const ACCEPTED_FILE_TYPES = ".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.jpg,.jpeg,.png,.gif,.webp,.txt,.rtf";

function FieldError({ messages }: { messages?: string[] }) {
  if (!messages || messages.length === 0) return null;
  return <p className="mt-1 text-xs text-red-600">{messages[0]}</p>;
}

export function EntryForm({ jobs, initialJobSlug }: { jobs: Job[]; initialJobSlug?: string }) {
  const [consent, setConsent] = useState(false);
  const [contactTime, setContactTime] = useState<string[]>([]);
  const [state, formAction, isPending] = useActionState(submitEntryForm, initialActionState);

  function toggleContactTime(value: string) {
    setContactTime((prev) => {
      // 「いつでも可能」を選ぶと他の時間帯はすべて解除し、他の時間帯を選ぶと「いつでも可能」は解除する。
      if (value === CONTACT_TIME_ANYTIME_VALUE) {
        return prev.includes(value) ? [] : [value];
      }
      const withoutAnytime = prev.filter((v) => v !== CONTACT_TIME_ANYTIME_VALUE);
      return withoutAnytime.includes(value)
        ? withoutAnytime.filter((v) => v !== value)
        : [...withoutAnytime, value];
    });
  }

  return (
    <form action={formAction} className="space-y-6">
      {state.status === "error" && state.message && (
        <p className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">{state.message}</p>
      )}

      <div>
        <label htmlFor="job" className={labelClass}>
          希望職種{requiredMark}
        </label>
        <select id="job" name="job" required defaultValue={initialJobSlug ?? ""} className={inputClass}>
          <option value="" disabled>
            選択してください
          </option>
          {jobs.map((job) => (
            <option key={job.slug} value={job.slug}>
              {job.title}
            </option>
          ))}
          <option value="undecided">まだ決まっていない</option>
        </select>
        <FieldError messages={state.errors?.job} />
      </div>

      <div>
        <p className={labelClass}>
          経験有無{requiredMark}
        </p>
        <div className="grid grid-cols-2 gap-2 sm:w-72">
          {experienceOptions.map((o) => (
            <label
              key={o.value}
              className="flex cursor-pointer items-center gap-2 rounded-lg border border-[var(--color-paper-200)] px-3 py-2 text-sm text-[var(--color-ink-900)]"
            >
              <input
                type="radio"
                name="experience"
                value={o.value}
                required
                className="h-4 w-4 accent-[var(--color-accent-500)]"
              />
              {o.label}
            </label>
          ))}
        </div>
        <FieldError messages={state.errors?.experience} />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="lastName" className={labelClass}>
            姓{requiredMark}
          </label>
          <input id="lastName" name="lastName" type="text" required className={inputClass} />
          <FieldError messages={state.errors?.lastName} />
        </div>
        <div>
          <label htmlFor="firstName" className={labelClass}>
            名{requiredMark}
          </label>
          <input id="firstName" name="firstName" type="text" required className={inputClass} />
          <FieldError messages={state.errors?.firstName} />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="lastNameKana" className={labelClass}>
            フリガナ（セイ）{requiredMark}
          </label>
          <input id="lastNameKana" name="lastNameKana" type="text" required className={inputClass} />
          <FieldError messages={state.errors?.lastNameKana} />
        </div>
        <div>
          <label htmlFor="firstNameKana" className={labelClass}>
            フリガナ（メイ）{requiredMark}
          </label>
          <input id="firstNameKana" name="firstNameKana" type="text" required className={inputClass} />
          <FieldError messages={state.errors?.firstNameKana} />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="birthDate" className={labelClass}>
            生年月日{requiredMark}
          </label>
          <input id="birthDate" name="birthDate" type="date" required className={inputClass} />
          <FieldError messages={state.errors?.birthDate} />
        </div>
        <div>
          <label htmlFor="gender" className={labelClass}>
            性別{requiredMark}
          </label>
          <select id="gender" name="gender" required defaultValue="" className={inputClass}>
            <option value="" disabled>
              選択してください
            </option>
            {genderOptions.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
          <FieldError messages={state.errors?.gender} />
        </div>
      </div>

      <div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="tel" className={labelClass}>
              電話番号
            </label>
            <input id="tel" name="tel" type="tel" className={inputClass} />
          </div>
          <div>
            <label htmlFor="email" className={labelClass}>
              メールアドレス
            </label>
            <input id="email" name="email" type="email" className={inputClass} />
            <FieldError messages={state.errors?.email} />
          </div>
        </div>
        <FieldError messages={state.errors?.contact} />
      </div>

      <div>
        <p className={labelClass}>連絡可能時間（複数選択可）</p>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
          {contactTimeOptions.map((o) => (
            <label
              key={o.value}
              className="flex cursor-pointer items-center gap-2 rounded-lg border border-[var(--color-paper-200)] px-3 py-2 text-sm text-[var(--color-ink-900)]"
            >
              <input
                type="checkbox"
                name="contactTime"
                value={o.value}
                checked={contactTime.includes(o.value)}
                onChange={() => toggleContactTime(o.value)}
                className="h-4 w-4 accent-[var(--color-accent-500)]"
              />
              {o.label}
            </label>
          ))}
        </div>
      </div>

      <div className="space-y-4 rounded-xl border border-[var(--color-paper-200)] p-4">
        <p className={labelClass}>履歴書・職務経歴書（任意）</p>
        <div>
          <label htmlFor="resumeFile" className={labelClass}>
            履歴書の添付
          </label>
          <input
            id="resumeFile"
            name="resumeFile"
            type="file"
            accept={ACCEPTED_FILE_TYPES}
            className={inputClass}
          />
          <p className="mt-1 text-xs text-[var(--color-ink-500)]">PDF・Word・Excel・画像など、10MBまで</p>
          <FieldError messages={state.errors?.resumeFile} />
        </div>

        <div>
          <label htmlFor="careerFile" className={labelClass}>
            職務経歴書の添付
          </label>
          <input
            id="careerFile"
            name="careerFile"
            type="file"
            accept={ACCEPTED_FILE_TYPES}
            className={inputClass}
          />
          <p className="mt-1 text-xs text-[var(--color-ink-500)]">PDF・Word・Excel・画像など、10MBまで</p>
          <FieldError messages={state.errors?.careerFile} />
        </div>
      </div>

      <div>
        <label htmlFor="remarks" className={labelClass}>
          その他特記事項
        </label>
        <textarea id="remarks" name="remarks" rows={4} className={inputClass} />
        <FieldError messages={state.errors?.remarks} />
      </div>

      <ConsentBox id="entry-consent" checked={consent} onChange={setConsent} text={ENTRY_PRIVACY_TEXT} />

      <TurnstileWidget />

      <button
        type="submit"
        disabled={!consent || isPending}
        className="w-full rounded-full bg-[var(--color-accent-600)] py-3.5 text-sm font-semibold text-[var(--color-paper-050)] transition-opacity disabled:opacity-40"
      >
        {isPending ? "送信中..." : "エントリーを送信する"}
      </button>
    </form>
  );
}
