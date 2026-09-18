import type { BenefitListItem } from "@/data/benefits";
import { BenefitIcon } from "./BenefitIcon";

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
        <p className="text-lg font-bold text-[var(--color-ink-900)]">{title}</p>
      </div>
      <ul className="mt-5 space-y-3">
        {items.map((item) => (
          <li key={item.label} className="flex gap-3 text-sm leading-relaxed text-[var(--color-ink-700)]">
            <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[var(--color-accent-500)]" />
            <span>
              {item.label}
              {item.detail && (
                <span className="mt-1 block text-xs whitespace-pre-line text-[var(--color-ink-500)]">
                  {item.detail}
                </span>
              )}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/** 福利厚生・待遇の一覧。共有資料の「■独自の福利厚生」「■待遇」の2区分をそのまま二列で表示する。 */
export function BenefitsGrid({
  uniqueBenefits,
  treatmentBenefits,
}: {
  uniqueBenefits: BenefitListItem[];
  treatmentBenefits: BenefitListItem[];
}) {
  return (
    <div className="grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-16">
      <BenefitGroup title="独自の福利厚生" icon="holidays" items={uniqueBenefits} />
      <BenefitGroup title="待遇" icon="salary" items={treatmentBenefits} />
    </div>
  );
}
