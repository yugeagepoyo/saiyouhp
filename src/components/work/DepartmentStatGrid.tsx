import type { DepartmentStat } from "@/data/departmentStats";

export function DepartmentStatGrid({ stats }: { stats: DepartmentStat[] }) {
  return (
    <dl className="grid grid-cols-2 gap-4 sm:grid-cols-3">
      {stats.map((stat) => {
        const hasNumericValue = stat.status === "confirmed" && stat.value != null;
        const isConfirmedTextOnly = stat.status === "confirmed" && stat.value == null;

        const displayValue = hasNumericValue
          ? `${stat.value}${stat.unit ?? ""}`
          : isConfirmedTextOnly
            ? (stat.note ?? "実施中")
            : stat.status === "unconfirmed" && stat.placeholderValue != null
              ? `${stat.placeholderValue}${stat.unit ?? ""}`
              : "準備中";

        return (
          <div key={stat.id} className="relative rounded-2xl border border-[var(--color-paper-200)] p-5">
            {stat.status !== "confirmed" && (
              <span className="absolute top-3 right-3 rounded-full bg-[var(--color-ink-900)] px-2 py-0.5 text-[10px] text-[var(--color-paper-050)]">
                仮
              </span>
            )}
            <dt className="text-xs text-[var(--color-ink-500)]">{stat.label}</dt>
            <dd
              className={
                isConfirmedTextOnly
                  ? "mt-2 text-base font-bold text-[var(--color-ink-900)]"
                  : "font-display mt-2 text-2xl text-[var(--color-ink-900)]"
              }
            >
              {displayValue}
            </dd>
            {!isConfirmedTextOnly && stat.note && <p className="mt-1 text-xs text-[var(--color-ink-500)]">{stat.note}</p>}
            {stat.pendingNote && <p className="mt-1 text-[11px] text-[var(--color-ink-500)]">{stat.pendingNote}</p>}
          </div>
        );
      })}
    </dl>
  );
}
