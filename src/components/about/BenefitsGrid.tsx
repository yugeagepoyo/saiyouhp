import type { BenefitListItem } from "@/data/benefits";
import { BenefitIcon } from "./BenefitIcon";

/**
 * 1区分を「2列 × 複数行」で並べる。
 * カードは作らず、細い区切り線と余白だけで整列させる（スマートフォンは1列）。
 */
function BenefitGroup({
  title,
  icon,
  items,
}: {
  title: string;
  icon: "holidays" | "salary";
  items: BenefitListItem[];
}) {
  return (
    <div>
      <div className="flex items-center gap-3">
        <BenefitIcon name={icon} className="h-6 w-6 text-[var(--color-accent-600)]" />
        <h3 className="font-serif-jp text-xl font-bold text-[var(--color-ink-900)] md:text-2xl">{title}</h3>
      </div>
      {/* 見出し直下の細い赤罫（アクセント） */}
      <span aria-hidden className="mt-4 block h-px w-12 bg-[var(--color-accent-600)]" />

      {/* 区切り線は使わず、余白だけで項目を分ける。 */}
      <ul className="mt-8 grid grid-cols-1 gap-y-6 md:grid-cols-2 md:gap-x-16 md:gap-y-7">
        {items.map((item) => (
          <li key={item.label} className="text-sm leading-relaxed text-[var(--color-ink-900)]">
            <span className="flex gap-1">
              <span aria-hidden>・</span>
              <span>
                {item.label}
                {item.detail && (
                  <span className="mt-1 block text-xs whitespace-pre-line text-[var(--color-ink-500)]">
                    {item.detail}
                  </span>
                )}
              </span>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/** 福利厚生・待遇の一覧。共有資料の「■独自の福利厚生」「■待遇」の2区分を縦に積む。 */
export function BenefitsGrid({
  uniqueBenefits,
  treatmentBenefits,
}: {
  uniqueBenefits: BenefitListItem[];
  treatmentBenefits: BenefitListItem[];
}) {
  return (
    <div className="mx-auto max-w-4xl space-y-16 md:space-y-20">
      <BenefitGroup title="独自の福利厚生" icon="holidays" items={uniqueBenefits} />
      <BenefitGroup title="待遇" icon="salary" items={treatmentBenefits} />
    </div>
  );
}
