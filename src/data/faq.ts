export interface FaqCategory {
  id: string;
  label: string;
}

export const faqCategories: FaqCategory[] = [
  { id: "application", label: "応募・選考" },
  { id: "work", label: "仕事内容" },
  { id: "worklife", label: "働き方" },
  { id: "training", label: "研修・キャリア" },
  { id: "salary", label: "給与・待遇" },
  { id: "benefits", label: "福利厚生" },
  { id: "company", label: "会社" },
];

export interface FaqItem {
  categoryId: string;
  question: string;
  answer: string;
  /**
   * "pending" の場合、正式な制度内容が未確定であることを示す。
   * 本番公開前にこのファイルを status: "pending" で検索し、確定情報へ差し替えること。
   */
  status?: "confirmed" | "pending";
}

export const faqItems: FaqItem[] = [
  {
    categoryId: "application",
    question: "未経験でも応募できますか？",
    answer: "はい。事務職は未経験スタート率100%の実績があり、他職種でも研修体制を整えて受け入れています。",
  },
  {
    categoryId: "application",
    question: "選考にはどのくらいの期間がかかりますか？",
    answer: "職種により異なります。詳細は各募集職種の詳細ページに記載の選考フローをご確認ください。",
  },
  {
    categoryId: "application",
    question: "複数の職種に応募できますか？",
    answer: "はい、可能です。エントリーフォームの希望職種欄にてご相談ください。",
  },
  {
    categoryId: "application",
    question: "過去に不採用となった場合、再度エントリーすることはできますか？",
    answer:
      "はい、再度エントリーいただけます。以前の選考結果にかかわらず、その後のご経験や成長も含めて改めて選考いたします。",
  },
  {
    categoryId: "application",
    question: "選考フローを教えてください。",
    answer:
      "書類選考後、面接を実施します。面接は最大3回を予定しています。一部の選考についてはWeb面接にも対応しています。選考方法や面接回数は応募職種等により異なる場合がありますので、詳細は選考時にご案内します。",
  },
  {
    categoryId: "work",
    question: "1日の仕事の流れを教えてください。",
    answer: "職種によって異なります。各募集職種の詳細ページ、または社員インタビューの「1日のスケジュール」をご確認ください。",
  },
  {
    categoryId: "work",
    question: "部署異動はありますか？",
    answer: "本人の適性や希望を踏まえて検討する場合があります。詳しくは選考時にご相談ください。",
  },
  {
    categoryId: "worklife",
    question: "残業はどのくらいありますか？",
    answer: "部署・職種によって異なります。事務職は月平均残業0〜3時間（2025年実績）です。",
  },
  {
    categoryId: "worklife",
    question: "土日休みですか？",
    answer: "職種によって休日体系が異なります。募集職種詳細ページの「休日・休暇」欄をご確認ください。",
  },
  {
    categoryId: "worklife",
    question: "副業は可能ですか？",
    answer: "現在、副業は認めておりません。",
  },
  {
    categoryId: "worklife",
    question: "服装・髪色・ネイルに規定はありますか？",
    answer:
      "服装・髪色・ネイルについては、基本的に自由です。ただし、お客様対応や現場業務など、仕事内容や安全上の理由により適切な服装をお願いする場合があります。",
  },
  {
    categoryId: "training",
    question: "研修制度はありますか？",
    answer: "入社時研修、OJT、資格取得支援など、未経験からでも安心して成長できる体制を整えています。",
  },
  {
    categoryId: "training",
    question: "昇進・昇格の基準はありますか？",
    answer: "成果や役割に応じて評価する仕組みを整えています。詳細は選考時にご説明します。",
  },
  {
    categoryId: "salary",
    question: "昇給・昇格について教えてください。",
    answer:
      "原則として年1回の昇給機会を設けています。また、日々の業務実績や成長度合いに応じて、時期にかかわらず評価を見直す場合があります。年功序列ではなく、スキル・成果・業務への取り組みなどを総合的に評価し、昇給・昇格を決定しています。雇用形態や配属部署によって制度が異なる場合がありますので、詳細は各職種の募集要項をご確認ください。",
    status: "pending",
  },
  {
    categoryId: "benefits",
    question: "社会保険は完備していますか？",
    answer: "はい。健康保険・厚生年金・雇用保険・労災保険を完備しています。",
  },
  {
    categoryId: "benefits",
    question: "産休・育休の実績はありますか？",
    answer: "産休・育休復帰後定着率100%、男性育休取得率100%（いずれも2025年実績）です。",
  },
  {
    categoryId: "company",
    question: "どのような事業を行っていますか？",
    answer: "不動産事業・建設事業・解体産廃事業を中心に、複数の事業を連携させながら展開しています。",
  },
  {
    categoryId: "company",
    question: "会社の雰囲気を教えてください。",
    answer: "20代を中心とした若い社員が多く、挑戦を後押しする一方で、品格と信頼を大切にする社風です。",
  },
];
