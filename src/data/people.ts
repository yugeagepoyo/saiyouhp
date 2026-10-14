/**
 * 社員インタビューデータ。実際の社員取材が未実施のため、
 * ページ構成・デザイン確認用のサンプル（isSample: true）のみを含む。
 * 取材が完了次第、サンプルを実データに差し替える。
 *
 * 基本質問は12種類あるが、全員がすべてに回答する必要はない
 * （フィールドはすべて任意。値が入っている項目だけ詳細ページに表示される）。
 */

export interface ScheduleItem {
  time: string;
  activity: string;
}

export interface BeforeAfter {
  /** 入社前・前職の状況 */
  before: string;
  /** 入社後の現在・変化・成長 */
  after: string;
}

export interface Person {
  slug: string;
  name: string;
  departmentId: string;
  role: string;
  joinYear: string;
  /** インタビュー詳細ページ・カードに大きく掲載する一言キャッチコピー */
  quote: string;
  isSample?: boolean;
  /** 社長・部長メッセージ枠（LeadershipSlide）に表示する対象かどうか */
  isLeadership?: boolean;
  /** 氏名のフリガナ（共有済みの方のみ） */
  kana?: string;
  /** 共有済みの本人写真。未着の場合はプレースホルダーを表示する。 */
  photoSrc?: string;
  /** 顔が切れないよう調整する写真の表示位置（CSS object-position） */
  photoPosition?: string;
  /** 取材前で本文が未確定。カードに写真・氏名のみ出し、詳細ページは作らない。 */
  interviewPending?: boolean;

  // 基本質問（すべて任意。回答がある項目のみ詳細ページに表示する）
  previousCareer?: string; // 入社前は何をしていましたか？
  howFoundCompany?: string; // ノーブデンスを知ったきっかけは？
  reasonForJoining?: string; // 入社を決めた理由は？
  concernBeforeJoining?: string; // 入社前に不安だったことは？
  impressionChange?: string; // 実際に入社して印象が変わったことは？
  currentWork?: string; // 現在の仕事内容は？
  rewardingMoment?: string; // 仕事でやりがいを感じる瞬間は？
  growthMoment?: string; // 一番成長したと感じることは？
  teamAtmosphere?: string; // 会社や部署の雰囲気は？
  futureChallenge?: string; // 今後挑戦したいことは？
  idealColleague?: string; // どんな人と一緒に働きたいですか？
  messageToApplicants?: string; // 応募を検討している方へ一言

  /** 入社前→入社後の変化（BEFORE/AFTER比較UI用）。previousCareer等と内容が重複しても構わない */
  beforeAfter?: BeforeAfter;
  dailySchedule?: ScheduleItem[];
}

export const people: Person[] = [
  {
    slug: "ceo",
    name: "山住 広大",
    photoSrc: "/images/people/ceo.jpg",
    departmentId: "executive",
    role: "代表取締役",
    joinYear: "創業",
    quote: "（サンプル）若い会社だからこそ、一人ひとりの挑戦がそのまま会社の成長につながります。",
    isSample: true,
    isLeadership: true,
    reasonForJoining: "（サンプル）品格を大切にしながら、信用を積み重ねていける会社をつくりたいと考え、創業しました。",
    teamAtmosphere:
      "（サンプル）20代を中心とした若いメンバーが多く、挑戦を後押しする一方で、品格と信頼を大切にする社風です。",
    idealColleague: "（サンプル）まずは行動してみる方、変化を楽しめる方と一緒に働きたいです。",
    messageToApplicants:
      "（サンプル）若い会社だからこそ、一人ひとりの挑戦がそのまま会社の成長につながります。品格を大切にしながら、共に信用を積み重ねていける仲間を待っています。",
  },
  {
    slug: "construction-manager",
    name: "山住 豪志",
    photoSrc: "/images/people/construction-manager.jpg",
    departmentId: "construction",
    role: "建設事業部 部長",
    joinYear: "20XX年入社",
    quote: "（サンプル）未経験からでも、着実に技術を身につけられる環境を整えています。",
    isSample: true,
    isLeadership: true,
    currentWork: "（サンプル）建設事業部全体のマネジメント、現場の品質・安全管理の統括を担当しています。",
    teamAtmosphere: "（サンプル）現場発の意見を大切にし、若手にも早くから裁量を渡すチームです。",
    messageToApplicants:
      "（サンプル）未経験からでも、着実に技術を身につけられる環境を整えています。現場でのやりがいを、ぜひ一緒に感じてほしいです。",
  },
  {
    slug: "sales-manager",
    name: "安部 真成",
    photoSrc: "/images/people/sales-1-manager.jpg",
    departmentId: "sales",
    role: "第一営業部 部長",
    joinYear: "20XX年入社",
    quote: "（サンプル）成果がそのまま評価につながる環境です。",
    isSample: true,
    isLeadership: true,
    currentWork: "（サンプル）営業部全体のマネジメント、目標設計とメンバーの育成を担当しています。",
    growthMoment: "（サンプル）メンバーが自ら考えて動けるチームに育ってきたことです。",
    messageToApplicants: "（サンプル）成果がそのまま評価につながる環境です。若手にも積極的に裁量を渡しています。",
  },
  {
    // 以下3名は取材前のため、本文はすべてサンプル。氏名・役職・写真のみ確定情報。
    slug: "sales-2-manager",
    name: "大塚 力哉",
    photoSrc: "/images/people/sales-2-manager.jpg",
    departmentId: "sales",
    role: "第二営業部 部長",
    joinYear: "20XX年入社",
    quote: "（サンプル）一人ひとりの挑戦を、チームで後押しする営業部です。",
    isSample: true,
    isLeadership: true,
    currentWork: "（サンプル）第二営業部のマネジメント、メンバーの同行・育成を担当しています。",
    messageToApplicants: "（サンプル）取材前のため、メッセージは後日掲載いたします。",
  },
  {
    slug: "demolition-manager",
    name: "石井 克樹",
    departmentId: "demolition",
    role: "解体施工部 部長",
    joinYear: "20XX年入社",
    quote: "（サンプル）安全第一で、確実に現場を進めることを大切にしています。",
    isSample: true,
    isLeadership: true,
    currentWork: "（サンプル）解体施工部のマネジメント、現場の安全管理を担当しています。",
    messageToApplicants: "（サンプル）取材前のため、メッセージは後日掲載いたします。",
  },
  {
    slug: "finance-admin-manager",
    name: "立石 裕也",
    departmentId: "finance",
    role: "財務戦略部・管理部 部長",
    joinYear: "20XX年入社",
    quote: "（サンプル）数字と仕組みの面から、現場が動きやすい会社をつくります。",
    isSample: true,
    isLeadership: true,
    currentWork: "（サンプル）財務戦略部・管理部のマネジメントを担当しています。",
    messageToApplicants: "（サンプル）取材前のため、メッセージは後日掲載いたします。",
  },
  {
    // 以下3名は写真・氏名・所属のみ共有済み。本文は取材前のため作成しない（interviewPending）。
    slug: "tome-yuki",
    name: "當銘 祐樹",
    departmentId: "construction",
    role: "建設事業部 主任",
    joinYear: "",
    quote: "",
    photoSrc: "/images/people/tome-yuki.jpg",
    // 横位置の写真のため、顔が中心に来るよう右寄りで切り抜く。
    photoPosition: "55% center",
    interviewPending: true,
  },
  {
    slug: "hanayama-hikaru",
    name: "花山 晃",
    kana: "ハナヤマ ヒカル",
    departmentId: "sales",
    role: "第二営業部 主任",
    joinYear: "",
    quote: "",
    photoSrc: "/images/people/hanayama-hikaru.jpg",
    photoPosition: "60% center",
    interviewPending: true,
  },
  {
    slug: "nagato-ryosei",
    name: "長戸 涼星",
    kana: "ナガト リョウセイ",
    departmentId: "sales",
    role: "第二営業部 主任",
    joinYear: "",
    quote: "",
    photoSrc: "/images/people/nagato-ryosei.jpg",
    // 縦位置の写真のため、頭が切れないよう上寄りで切り抜く。
    photoPosition: "center 25%",
    interviewPending: true,
  },
  {
    slug: "sample-sales-01",
    name: "社員名（仮）",
    departmentId: "sales",
    role: "営業部",
    joinYear: "20XX年入社",
    quote: "（サンプル）挑戦した分だけ、ちゃんと評価される。それが一番のやりがいです。",
    isSample: true,
    previousCareer: "（サンプル）異業種の営業職を経験",
    howFoundCompany: "（サンプル）求人サイトで、複数事業を連携させている点に興味を持ちました。",
    reasonForJoining: "（サンプル）若いうちから裁量を持って働ける環境に惹かれて入社しました。",
    concernBeforeJoining: "（サンプル）不動産業界が未経験だったため、知識面での不安がありました。",
    impressionChange: "（サンプル）研修とOJTのおかげで、思っていたよりも早く実務に慣れることができました。",
    currentWork: "（サンプル）新規顧客への提案から契約後のフォローまで幅広く担当しています。",
    rewardingMoment: "（サンプル）お客様から「あなたに任せてよかった」と言っていただけた瞬間です。",
    futureChallenge: "（サンプル）チームを率いる立場として、後輩の育成にも力を入れたいです。",
    beforeAfter: {
      before: "（サンプル）異業種で営業をしていたが、成果が評価に直結する環境を探していた。",
      after: "（サンプル）自分から提案する機会が増え、成果が数字として見えるようになった。",
    },
    dailySchedule: [
      { time: "9:00", activity: "出社・朝礼" },
      { time: "10:00", activity: "顧客対応・提案準備" },
      { time: "13:00", activity: "現地訪問" },
      { time: "16:00", activity: "社内調整・書類作成" },
      { time: "18:00", activity: "退社" },
    ],
  },
  {
    slug: "sample-construction-01",
    name: "社員名（仮）",
    departmentId: "construction",
    role: "建設事業部",
    joinYear: "20XX年入社",
    quote: "（サンプル）自分が関わった建物が形になっていく瞬間が、何度経験しても嬉しいです。",
    isSample: true,
    previousCareer: "（サンプル）未経験からのスタート",
    reasonForJoining: "（サンプル）研修体制が整っており、未経験でも挑戦できると感じたためです。",
    currentWork: "（サンプル）現場の施工管理、協力会社との調整を担当しています。",
    rewardingMoment: "（サンプル）担当した建物が完成し、お客様に引き渡す瞬間です。",
    futureChallenge: "（サンプル）資格を取得し、より大きな案件を任せてもらえるようになりたいです。",
    beforeAfter: {
      before: "（サンプル）建設業は未経験で、右も左も分からない状態だった。",
      after: "（サンプル）現場を任されることが増え、責任と同時にやりがいを感じている。",
    },
    dailySchedule: [
      { time: "8:00", activity: "現場入り" },
      { time: "9:00", activity: "朝礼・安全確認" },
      { time: "12:00", activity: "昼休憩" },
      { time: "15:00", activity: "工程確認・協力会社と調整" },
      { time: "17:30", activity: "退社" },
    ],
  },
  {
    slug: "sample-admin-01",
    name: "社員名（仮）",
    departmentId: "admin",
    role: "管理部",
    joinYear: "20XX年入社",
    quote: "（サンプル）会社全体を支えている実感があるから、地味な業務にも誇りを持てます。",
    isSample: true,
    previousCareer: "（サンプル）未経験からのスタート",
    reasonForJoining: "（サンプル）安心して長く働ける環境を探していて出会いました。",
    currentWork: "（サンプル）契約書類の管理や各部署のサポート業務を担当しています。",
    idealColleague: "（サンプル）お互いに助け合える、コミュニケーションを大切にする方です。",
    futureChallenge: "（サンプル）業務の効率化を提案できるような存在になりたいです。",
    beforeAfter: {
      before: "（サンプル）事務職は未経験で、長く働ける環境を探していた。",
      after: "（サンプル）幅広い業務を通じて、会社全体の動きが見えるようになった。",
    },
    dailySchedule: [
      { time: "9:00", activity: "出社・メール確認" },
      { time: "10:00", activity: "書類作成・管理" },
      { time: "13:00", activity: "各部署との調整" },
      { time: "16:00", activity: "翌日準備" },
      { time: "18:00", activity: "退社" },
    ],
  },
];

export function getPersonBySlug(slug: string): Person | undefined {
  return people.find((p) => p.slug === slug);
}
