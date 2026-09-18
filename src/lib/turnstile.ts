/**
 * Cloudflare Turnstile のサーバー側検証。
 * TURNSTILE_SECRET_KEY が未設定の場合（開発中・キー未取得時）は検証をスキップし、
 * 常に成功として扱う。本番公開前に必ず環境変数を設定すること。
 */
export async function verifyTurnstileToken(token: string | null): Promise<{ success: boolean; skipped?: boolean }> {
  const secret = process.env.TURNSTILE_SECRET_KEY;

  if (!secret) {
    console.warn(
      "[turnstile] TURNSTILE_SECRET_KEY が未設定のため、スパム対策の検証をスキップしています。本番公開前に必ず設定してください。",
    );
    return { success: true, skipped: true };
  }

  if (!token) {
    return { success: false };
  }

  try {
    const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ secret, response: token }),
    });
    const data: { success: boolean } = await res.json();
    return { success: data.success === true };
  } catch (error) {
    console.error("[turnstile] verification request failed", error);
    return { success: false };
  }
}
