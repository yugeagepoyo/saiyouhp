import Image from "next/image";

/**
 * 実素材（社員写真・オフィス写真等）が未着手のためのプレースホルダー。
 * `src` を渡すと自動的に next/image による実画像表示に切り替わる（差し替えのみで更新可能）。
 * ラベルは差し替え担当者が「何を入れるべきか」を判別できるように表示する。
 */
export function PlaceholderImage({
  alt,
  label,
  src,
  objectPosition,
}: {
  alt: string;
  label?: string;
  src?: string;
  /** 被写体が切れないよう表示位置を調整したい場合に指定（CSS object-position） */
  objectPosition?: string;
}) {
  if (src) {
    return (
      <Image
        src={src}
        alt={alt}
        fill
        sizes="100vw"
        className="object-cover"
        style={objectPosition ? { objectPosition } : undefined}
      />
    );
  }

  return (
    <div
      role="img"
      aria-label={alt}
      className="flex h-full w-full items-center justify-center bg-[linear-gradient(135deg,var(--color-ink-700)_0%,var(--color-ink-900)_60%)]"
    >
      <span className="px-4 text-center text-xs tracking-[0.15em] text-[var(--color-paper-100)]/70 uppercase">
        {label ?? "PHOTO PLACEHOLDER"}
      </span>
    </div>
  );
}
