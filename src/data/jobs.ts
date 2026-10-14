/**
 * 求人データ。
 *
 * 公開するのは、勤務条件を共有いただいた職種のみ（conditions を持つもの）。
 * 条件が未登録の職種は推測で埋めず published: false とし、
 * 一覧・部署詳細では「現在募集はありません」と表示する。
 *
 * published: true の職種（2026年10月時点）
 * - sales                営業職（未経験者／経験者を1ページで切り替え）
 * - construction-management 建設事業部 施工管理
 * - administration       事務職
 */

export type JobCategory = "mid-career" | "new-grad";
/** 「仕事を知る」ページの職種タブ用の大分類（募集区分＝新卒/中途とは別軸） */
export type JobGroup = "general" | "office";

export interface ScheduleItem {
  time: string;
  activity: string;
}

export interface IncomeModelStep {
  years: string;
  income: string;
}

/**
 * 1つの募集職種の中で切り替える区分（営業職の 未経験者 / 経験者 など）。
 * 給与と求める人物像だけが区分ごとに異なり、
 * 休日・休暇・保険などの共通条件は job.conditions 側にまとめる。
 */
export interface JobVariant {
  id: string;
  label: string;
  /** 大きく見せる給与の要点。notes はその項目に付く補足。 */
  salary: { label: string; value: string; note?: string; notes?: string[] }[];
  /** どの項目にも紐づかない給与の補足 */
  salaryNotes: string[];
  idealCandidateLead?: string;
  idealCandidate?: string[];
  successTraits?: string[];
  requiredExperience: string;
  requiredQualifications: string;
  educationRequirement: string;
}

/**
 * 勤務条件の1グループ（給与／賞与／休日 など）。
 * 共有いただいた条件をそのまま項目ごとに保持する。
 * このデータが無い職種は条件を推測せず、募集を公開しない（published: false）。
 */
export interface JobConditionGroup {
  label: string;
  items: string[];
}

/**
 * 募集要項の共通項目。
 * 給与・勤務時間・休日などの詳細は conditions 側へ移したため、
 * conditions を持つ職種ではこれらのフィールドは使用しない。
 */
export interface JobRequirements {
  employmentType: string;
  workLocation: string;
  smokingMeasures: string;
  jobDescription: string;
  applicationRequirements?: string;
  selectionFlow: string[];
  trialPeriod?: string;
  salary?: string;
  workHours?: string;
  holidays?: string;
  benefits?: string;
  socialInsurance?: string;
}

export interface Job {
  slug: string;
  title: string;
  category: JobCategory;
  /** 「仕事を知る」タブ表示用の大分類（総合職／事務職） */
  jobGroup: JobGroup;
  employmentType: string;
  location: string;
  summary: string;
  salaryRange: string;
  departmentId: string;
  published: boolean;
  /** レイアウト確認用のダミー求人（実在しない） */
  isSample?: boolean;
  /** 実在する募集職種だが、詳細（給与等）が確定前 */
  isProvisional?: boolean;

  // 詳細ページ用
  workDetails?: string;
  dailySchedule?: ScheduleItem[];
  firstYearIncome?: string;
  incomeModel?: IncomeModelStep[];
  careerSteps?: string[];
  idealCandidate?: string[];
  requiredExperience?: string;
  requiredQualifications?: string;
  educationRequirement?: string;
  successTraits?: string[];
  /** 求める人物像の導入文 */
  idealCandidateLead?: string;
  /** 求める人物像：行動特性 */
  behaviorTraits?: string[];
  /** 求める人物像：思考性 */
  mindsetTraits?: string[];
  relatedPeopleSlugs?: string[];
  requirements?: JobRequirements;
  /** 勤務条件。未登録の職種は募集を公開しない。 */
  conditions?: JobConditionGroup[];
  /** 区分切り替え（未経験者／経験者など）。給与と求める人物像を区分ごとに出し分ける。 */
  variants?: JobVariant[];
  /** 区分によらず共通の給与条件（支払いサイクルなど） */
  salaryCommonNotes?: string[];
}

/** 全職種共通の選考フロー */
const SELECTION_FLOW = ["企業説明会", "書類選考", "一次面接", "二次面接", "最終面接", "内定", "入社"];

export const jobs: Job[] = [
  {
    slug: "sales",
    title: "営業職",
    category: "mid-career",
    jobGroup: "general",
    employmentType: "正社員",
    location: "本社（詳細住所は共有後に反映）",
    summary:
      "不動産・建設・解体産廃、複数事業と連携しながら成長できる営業職です。未経験からでも挑戦でき、業界での営業経験を活かして活躍いただくこともできます。",
    salaryRange: "想定年収：3,600,000円〜7,800,000円（最低保証）＋営業成績によるインセンティブ",
    departmentId: "sales",
    published: true,
    workDetails:
      "新規・既存のお客様への提案、物件・案件の発掘、契約に関する折衝まで一貫して担当します。営業活動を通じて、建設・解体産廃など他事業部との連携も経験できます。",
    dailySchedule: [
      { time: "9:00", activity: "出社・朝礼" },
      { time: "10:00", activity: "顧客対応・提案準備" },
      { time: "13:00", activity: "現地訪問" },
      { time: "16:00", activity: "社内調整・書類作成" },
      { time: "18:00", activity: "退社" },
    ],
    careerSteps: ["営業担当", "チームリーダー", "営業マネージャー"],
    relatedPeopleSlugs: ["sample-sales-01"],
    salaryCommonNotes: ["月給制：20日締め月末払い（銀行振込）"],
    variants: [
      {
        id: "inexperienced",
        label: "未経験者",
        salary: [
          {
            label: "想定年収",
            value: "3,600,000円〜7,800,000円",
            note: "最低保証",
            notes: ["別途、営業成績によるインセンティブ有り"],
          },
          {
            label: "月給",
            value: "250,000円〜650,000円",
            notes: [
              "固定残業手当76,900円〜166,600円を上記給与に含む",
              "固定残業時間を超過した場合は別途支給",
            ],
          },
        ],
        salaryNotes: ["金額は経験・能力・実績等により異なります"],
        idealCandidate: [
          "まずは行動してみる方",
          "周囲と一緒に考えながら進められる方",
          "変化を楽しめる方",
          "集中力がある方",
          "自身のステージをもっと上げたい方",
          "新しいことにチャレンジしたい方",
        ],
        successTraits: ["素直に行動へ移せる方", "お客様目線で物事を考えられる方"],
        requiredExperience: "不問（未経験の方も歓迎します）",
        requiredQualifications:
          "普通自動車運転免許（AT限定可。選考時は不要ですが、入社時までに取得必須）／宅地建物取引士（歓迎・必須ではありません）",
        educationRequirement: "大卒以上（経験により学歴不問）",
      },
      {
        id: "experienced",
        label: "経験者",
        salary: [
          {
            label: "想定年収",
            value: "3,600,000円〜7,800,000円",
            note: "最低保証",
            notes: ["＋営業成績によるインセンティブ"],
          },
          {
            label: "月給",
            value: "300,000円〜650,000円",
            notes: [
              "固定残業手当：76,900円〜166,600円を上記給与に含む",
              "固定残業時間超過の場合は別途支給",
            ],
          },
        ],
        salaryNotes: [],
        requiredExperience: "不動産・建設業界での営業経験",
        requiredQualifications: "普通自動車運転免許（AT限定可）",
        educationRequirement: "学歴不問",
      },
    ],
    requirements: {
      employmentType: "正社員",
      workLocation: "大阪市北区豊崎三丁目２０番１０号",
      smokingMeasures: "屋内禁煙（喫煙室設置予定）",
      jobDescription: "不動産営業全般（新規開拓〜契約後フォローまで）",
      selectionFlow: SELECTION_FLOW,
    },
    conditions: [
      { label: "賞与", items: ["年2回"] },
      { label: "通勤手当", items: ["月額30,000円まで"] },
      {
        label: "技能手当",
        items: [
          "一級建築士：30,000円／月",
          "二級建築士：20,000円／月",
          "一級建築施工管理技士：15,000円／月",
          "二級建築施工管理技士：7,000円／月",
          "宅地建物取引士：20,000円／月",
        ],
      },
      { label: "昇給", items: ["年1回（4月）", "優秀な成果を上げた場合は年2回のチャンス有り"] },
      { label: "定年", items: ["有り（60歳）"] },
      { label: "試用期間", items: ["有り（6ヶ月）", "本採用後の労働条件の変更は無し"] },
      {
        label: "労働時間",
        items: [
          "変形労働時間制",
          "平日：9:00〜18:00（8時間／日）",
          "平均残業時間：20時間〜30時間",
          "休憩時間：60分",
        ],
      },
      {
        label: "休日",
        items: [
          "完全週休2日",
          "土日祝、社内カレンダーに基づく",
          "年間休日125日",
          "有給休暇計画付与3日",
          "実質年間128日",
        ],
      },
      { label: "保険", items: ["雇用保険", "健康保険", "厚生年金", "労災保険"] },
    ],
  },
  {
    slug: "construction-management",
    title: "建設事業部 施工管理",
    category: "mid-career",
    jobGroup: "general",
    employmentType: "正社員",
    location: "本社（詳細住所は共有後に反映）",
    summary: "確かな技術と品質管理で、物件の価値をかたちにする施工管理のポジションです。",
    salaryRange: "想定年収：5,000,000円〜",
    departmentId: "construction",
    published: true,
    workDetails: "施工管理・工程管理、協力会社との調整、安全管理・品質管理を担当いただきます。",
    firstYearIncome:
      "想定年収：5,000,000円〜／月給：350,000円（固定残業手当40時間相当分82,100円を含む。超過した場合は別途支給）",
    idealCandidateLead:
      "企業理念である「すべてに品格を、信頼の先の信用へ」に共感・興味をお持ちくださる方",
    behaviorTraits: ["まずは行動してみる", "周囲と一緒に考える", "変化を楽しむ", "集中力がある"],
    mindsetTraits: [
      "もの作りが好き",
      "周囲とのコミュニケーションを大切にできる",
      "感謝の気持ちを大切にする",
      "感謝されたい",
      "人と長く深く関わりたい",
      "誠実で責任感がある",
    ],
    requiredExperience: "施工管理経験（経験により応相談）",
    requiredQualifications: "建築施工管理技士（歓迎）",
    educationRequirement: "学歴不問",
    requirements: {
      employmentType: "正社員",
      workLocation: "大阪市北区豊崎三丁目２０番１０号",
      smokingMeasures: "屋内禁煙（喫煙室設置予定）",
      jobDescription: "建設現場の施工管理全般",
      applicationRequirements: "施工管理経験がある方（応相談）",
      selectionFlow: SELECTION_FLOW,
    },
    conditions: [
      {
        label: "給与",
        items: [
          "月給制：20日締め月末払い（銀行振込）",
          "想定年収：5,000,000円〜",
          "月給：350,000円",
          "固定残業手当40時間相当分：82,100円を上記給与に含む",
          "固定残業時間を超過した場合は別途支給",
        ],
      },
      { label: "賞与", items: ["年2回"] },
      { label: "通勤手当", items: ["月額30,000円まで"] },
      {
        label: "技能手当",
        items: [
          "一級建築士：30,000円／月",
          "二級建築士：20,000円／月",
          "一級建築施工管理技士：15,000円／月",
          "二級建築施工管理技士：7,000円／月",
        ],
      },
      { label: "昇給", items: ["年1回（4月）", "優秀な成果を上げた場合は年2回のチャンス有り"] },
      { label: "定年", items: ["有り（60歳）"] },
      { label: "試用期間", items: ["有り（6ヶ月）", "本採用後の労働条件の変更は無し"] },
      {
        label: "労働時間",
        items: [
          "変形労働時間制",
          "平日：9:00〜18:00（8時間／日）",
          "平均残業時間：20時間〜30時間",
          "休憩時間：60分",
        ],
      },
      {
        label: "休日",
        items: [
          "完全週休2日",
          "土日祝、社内カレンダーに基づく",
          "年間休日125日",
          "有給休暇計画付与3日",
          "実質年間128日",
        ],
      },
      {
        label: "休暇",
        items: [
          "年末年始",
          "GW休暇",
          "夏季休暇",
          "冬季休暇",
          "年次有給休暇",
          "慶弔休暇",
          "産前産後休暇",
          "育児休暇",
          "介護休暇",
          "子の看護休暇",
          "不妊治療休暇",
        ],
      },
      { label: "保険", items: ["雇用保険", "健康保険", "厚生年金", "労災保険"] },
    ],
  },
  {
    slug: "demolition-staff",
    title: "解体施工部 作業員・施工管理",
    category: "mid-career",
    jobGroup: "general",
    employmentType: "正社員",
    location: "本社（詳細住所は共有後に反映）",
    summary: "安全第一で解体工事・産業廃棄物処理を担うポジションです。",
    salaryRange: "想定年収：応相談（確定次第更新）",
    departmentId: "demolition",
    published: false,
    isProvisional: true,
    workDetails: "解体工事の施工・管理、産業廃棄物の適正処理、安全管理を担当いただきます。詳細は確定次第更新します。",
    requiredExperience: "不問（未経験の方も歓迎）",
    requiredQualifications: "特になし（取得支援制度あり）",
    educationRequirement: "学歴不問",
    requirements: {
      employmentType: "正社員",
      trialPeriod: "6ヶ月（本採用後の労働条件の変更はありません）",
      salary: "応相談（確定次第更新）",
      workLocation: "大阪市北区豊崎三丁目２０番１０号",
      workHours: "変形労働時間制／平日9:00〜18:00（8時間/日）／休憩60分",
      holidays: "完全週休2日制（土日祝、社内カレンダーに基づく）",
      benefits: "確定次第更新します",
      socialInsurance: "健康保険・厚生年金・雇用保険・労災保険",
      smokingMeasures: "屋内禁煙（喫煙室設置予定）",
      jobDescription: "解体工事・産業廃棄物処理の作業および施工管理",
      applicationRequirements: "不問（未経験歓迎）",
      selectionFlow: SELECTION_FLOW,
    },
  },
  {
    slug: "administration",
    title: "事務職",
    category: "mid-career",
    jobGroup: "office",
    employmentType: "正社員",
    location: "本社（詳細住所は共有後に反映）",
    summary: "各事業を裏方から支え、円滑な業務進行を支える事務ポジションです。",
    salaryRange: "想定年収：2,928,000円〜",
    departmentId: "admin",
    published: true,
    workDetails: "契約書類・各種書類の作成管理、顧客対応のサポート、社内の情報整理・スケジュール管理を担当いただきます。",
    firstYearIncome: "想定年収：2,928,000円〜／月給：224,000円〜（残業代は別途支給）",
    requiredExperience: "不問（未経験の方も歓迎）",
    requiredQualifications: "特になし",
    educationRequirement: "学歴不問",
    requirements: {
      employmentType: "正社員",
      workLocation: "大阪市北区豊崎三丁目２０番１０号",
      smokingMeasures: "屋内禁煙（喫煙室設置予定）",
      jobDescription: "各種書類管理、顧客対応サポート、社内の情報整理",
      applicationRequirements: "不問（未経験歓迎）",
      selectionFlow: SELECTION_FLOW,
    },
    conditions: [
      {
        label: "給与",
        items: [
          "月給制：20日締め月末払い（銀行振込）",
          "想定年収：2,928,000円〜",
          "月給：224,000円〜",
          "残業代は別途支給",
        ],
      },
      { label: "賞与", items: ["年2回"] },
      { label: "通勤手当", items: ["月額30,000円まで"] },
      {
        label: "技能手当",
        items: [
          "一級建築士：30,000円／月",
          "二級建築士：20,000円／月",
          "一級建築施工管理技士：15,000円／月",
          "二級建築施工管理技士：7,000円／月",
          "宅地建物取引士：20,000円／月",
        ],
      },
      { label: "昇給", items: ["年1回（4月）", "優秀な成果を上げた場合は年2回のチャンス有り"] },
      { label: "定年", items: ["有り（60歳）"] },
      { label: "試用期間", items: ["有り（6ヶ月）", "本採用後の労働条件の変更は無し"] },
      {
        label: "労働時間",
        items: ["平日：9:00〜18:00（8時間／日）", "平均残業時間：0時間〜10時間", "休憩時間：60分"],
      },
      {
        label: "休日",
        items: ["完全週休2日", "土日祝、社内カレンダーに基づく", "年間休日130日"],
      },
      {
        label: "休暇",
        items: [
          "年末年始",
          "GW休暇",
          "夏季休暇",
          "冬季休暇",
          "年次有給休暇",
          "慶弔休暇",
          "産前産後休暇",
          "育児休暇",
          "介護休暇",
          "子の看護休暇",
          "不妊治療休暇",
        ],
      },
      { label: "保険", items: ["雇用保険", "健康保険", "厚生年金", "労災保険"] },
    ],
  },
  {
    slug: "sample-new-grad-general",
    title: "（サンプル）総合職",
    category: "new-grad",
    jobGroup: "general",
    employmentType: "正社員",
    location: "本社（詳細住所は共有後に反映）",
    summary: "複数事業を横断的に経験しながらキャリアを築くポジションです。",
    salaryRange: "初任給例：応相談（実データ反映待ち）",
    departmentId: "admin",
    published: false,
    isSample: true,
    workDetails:
      "（サンプル）入社後は研修を通じて複数の事業部を経験し、適性を見ながら配属先を決定します。若手のうちから裁量を持って挑戦できる環境です。",
    dailySchedule: [
      { time: "9:00", activity: "出社・朝礼" },
      { time: "10:00", activity: "配属部署でのOJT" },
      { time: "13:00", activity: "業務対応" },
      { time: "16:00", activity: "振り返り・翌日準備" },
      { time: "18:00", activity: "退社" },
    ],
    firstYearIncome: "（サンプル）初任給：応相談（実データ反映待ち）",
    incomeModel: [
      { years: "1年目", income: "（サンプル）応相談" },
      { years: "3年目", income: "（サンプル）応相談" },
      { years: "5年目以降", income: "（サンプル）応相談" },
    ],
    careerSteps: ["（サンプル）配属部署でのOJT", "（サンプル）担当業務の独り立ち", "（サンプル）リーダー・専門職への成長"],
    idealCandidate: ["新しいことに挑戦したい方", "複数の事業を経験しながら適性を見つけたい方"],
    requiredExperience: "不問（新卒・第二新卒歓迎）",
    requiredQualifications: "特になし",
    educationRequirement: "学歴不問",
    successTraits: ["素直に学ぶ姿勢がある方", "周囲と協力しながら進められる方"],
    relatedPeopleSlugs: ["sample-admin-01"],
    requirements: {
      employmentType: "正社員",
      trialPeriod: "3ヶ月（待遇に変動なし）",
      salary: "月給制（詳細は面談時にご説明）",
      workLocation: "大阪市北区豊崎三丁目２０番１０号",
      workHours: "9:00〜18:00（休憩60分）",
      holidays: "完全週休2日制、年末年始、有給休暇",
      benefits: "社会保険完備、研修制度、資格取得支援 ほか",
      socialInsurance: "健康保険・厚生年金・雇用保険・労災保険",
      smokingMeasures: "屋内禁煙（喫煙室設置予定）",
      jobDescription: "複数事業部でのOJTを経て、適性に応じた配属先で従事",
      applicationRequirements: "学歴不問。新卒・第二新卒歓迎",
      selectionFlow: SELECTION_FLOW,
    },
  },
];

export function getPublishedJobs(category: JobCategory): Job[] {
  return jobs.filter((job) => job.published && job.category === category);
}

export function getJobBySlug(slug: string): Job | undefined {
  return jobs.find((job) => job.slug === slug);
}
