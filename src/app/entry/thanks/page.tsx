import type { Metadata } from "next";
import { ThanksMessage } from "@/components/entry/ThanksMessage";

export const metadata: Metadata = {
  title: "エントリー完了",
  robots: { index: false, follow: false },
};

export default function EntryThanksPage() {
  return <ThanksMessage />;
}
