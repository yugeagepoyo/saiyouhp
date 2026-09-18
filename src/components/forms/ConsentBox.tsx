"use client";

import { labelClass } from "./fieldStyles";

export const ENTRY_PRIVACY_TEXT = `株式会社ノーブデンス（以下「当社」といいます。）は、採用応募者から取得する個人情報を、以下のとおり取り扱います。

1．取得する個人情報

当社は、採用活動に必要な範囲で、以下の個人情報を取得します。

・希望職種
・氏名
・電話番号
・メールアドレス
・履歴書に記載された情報
・職務経歴書に記載された情報
・当社との連絡および選考の過程で取得した情報

なお、履歴書および職務経歴書の提出は任意です。

2．利用目的

取得した個人情報は、以下の目的で利用します。

・採用応募の受付
・応募者への連絡および問い合わせへの対応
・書類選考、面接その他の採用選考
・応募者の経験、能力、適性等の確認
・選考結果の通知
・採用決定後の入社手続きおよび人事管理の準備
・採用活動の運営、改善および分析
・その他、採用活動に付随する業務

3．第三者への提供

当社は、法令に基づく場合その他法令で認められている場合を除き、応募者本人の同意なく、取得した個人情報を第三者に提供しません。

4．個人情報の取扱いの委託

当社は、フォームの運営、メール送信、データ保管その他の採用業務の一部を外部事業者に委託する場合があります。

この場合、当社は、個人情報を適切に取り扱う委託先を選定し、必要かつ適切な監督を行います。

5．安全管理措置

当社は、取得した個人情報への不正アクセス、漏えい、紛失、滅失、毀損または改ざん等を防止するため、必要かつ適切な安全管理措置を講じます。

6．保管および削除

取得した個人情報は、採用活動に必要な期間保管し、保管の必要がなくなった後、適切な方法により削除または廃棄します。

不採用となった応募者の個人情報については、選考終了後1年間保管した後、適切な方法により削除または廃棄します。

7．個人情報の提供の任意性

個人情報の提供は応募者本人の任意です。

ただし、採用選考に必要な情報をご提供いただけない場合、応募の受付、選考または連絡ができないことがあります。

8．開示、訂正、削除等

応募者本人から、当社が保有する本人の個人情報について、開示、訂正、追加、削除、利用停止等の申し出があった場合は、本人確認を行ったうえで、法令に従い適切に対応します。`;

export function ConsentBox({
  id,
  checked,
  onChange,
  text,
}: {
  id: string;
  checked: boolean;
  onChange: (v: boolean) => void;
  text: string;
}) {
  return (
    <div>
      <p className={labelClass}>採用応募者の個人情報の取扱いについて</p>
      <div className="h-40 overflow-y-auto rounded-xl border border-[var(--color-paper-200)] bg-[var(--color-paper-100)] p-4 text-xs leading-relaxed whitespace-pre-line text-[var(--color-ink-700)]">
        {text}
      </div>
      <label htmlFor={id} className="mt-4 flex cursor-pointer items-start gap-3 text-sm text-[var(--color-ink-900)]">
        <input
          id={id}
          name="consent"
          type="checkbox"
          required
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          className="mt-1 h-4 w-4 shrink-0 accent-[var(--color-accent-500)]"
        />
        採用応募者の個人情報の取扱いに同意します
      </label>
    </div>
  );
}
