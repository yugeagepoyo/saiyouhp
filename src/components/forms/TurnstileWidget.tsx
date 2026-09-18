"use client";

import Script from "next/script";
import { useEffect, useRef, useState } from "react";

const SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

/** スパム対策のCloudflare Turnstileウィジェット。トークンをhidden inputに設定する。 */
export function TurnstileWidget({ fieldName = "turnstileToken" }: { fieldName?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const [token, setToken] = useState("");

  useEffect(() => {
    if (!scriptLoaded || !containerRef.current || !SITE_KEY || !window.turnstile) return;
    const widgetId = window.turnstile.render(containerRef.current, {
      sitekey: SITE_KEY,
      callback: (t: string) => setToken(t),
      "expired-callback": () => setToken(""),
    });
    return () => {
      window.turnstile?.remove(widgetId);
    };
  }, [scriptLoaded]);

  if (!SITE_KEY) {
    return (
      <p className="text-xs text-[var(--color-ink-500)]">
        （開発中）スパム対策ウィジェットは環境変数 NEXT_PUBLIC_TURNSTILE_SITE_KEY 未設定のため非表示です。
      </p>
    );
  }

  return (
    <>
      <Script
        src="https://challenges.cloudflare.com/turnstile/v0/api.js"
        strategy="afterInteractive"
        onLoad={() => setScriptLoaded(true)}
      />
      <div ref={containerRef} />
      <input type="hidden" name={fieldName} value={token} />
    </>
  );
}
