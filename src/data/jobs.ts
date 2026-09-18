/**
 * 求人データ。
 *
 * 営業職（未経験）は共有いただいた実データを反映済み（isProvisional/isSampleなし）。
 * それ以外の中途採用4職種（営業職経験者・建設施工管理・解体産廃作業員施工管理・事務）は
 * 実在する募集職種だが、給与等の詳細は確定前のため isProvisional: true とし、
 * 一覧・詳細ページに「仮」バッジを表示する。実データが届き次第、isProvisional を外して更新する。
 *
 * 新卒総合職（sample-new-grad-general）は引き続きレイアウト確認用のサンプル（isSample: true）。
 *
 * published: false の求人は一覧に表示しない（非公開化の仕組み）。
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

/** 募集要項の共通項目 */
export interface JobRequirements {
  employmentType: string;
  trialPeriod: string;
  salary: string;
  workLocation: string;
  workHours: string;
  holidays: string;
  benefits: string;
  socialInsurance: string;
  smokingMeasures: string;
  jobDescription: string;
  applicationRequirements: string;
  selectionFlow: string[];
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
  relatedPeopleSlugs?: string[];
  requirements?: JobRequirements;
}

/** 全職種共通の選考フロー */
const SELECTION_FLOW = ["企業説明会", "書類選考", "一次面接", "二次面接", "最終面接", "内定", "入社"];

export const jobs: Job[] = [
  {
    slug: "sales-inexperienced",
    title: "営業職（未経験）",
    category: "mid-career",
    jobGroup: "general",
    employmentType: "正社員",
    location: "本社（詳細住所は共有後に反映）",
    summary: "不動産・建設・解体産廃、複数事業と連携しながら成長できる営業職です。未経験からでも挑戦できます。",
    salaryRange: "年収 360万円〜780万円（最低保証）※別途、営業成績によるインセンティブがあります",
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
    firstYearIncome:
      "想定年収：360万円〜780万円（最低保証）＋営業成績によるインセンティブ／想定月給：250,000円〜650,000円（固定残業手当76,900円〜166,600円を含む。超過分は別途支給）※金額は経験・能力・実績等により異なります",
    careerSteps: ["営業担当", "チームリーダー", "営業マネージャー"],
    idealCandidate: [
      "まずは行動してみる方",
      "周囲と一緒に考えながら進められる方",
      "変化を楽しめる方",
      "集中力がある方",
      "自身のステージをもっと上げたい方",
      "新しいことにチャレンジしたい方",
    ],
    requiredExperience: "不問（未経験の方も歓迎します）",
    requiredQualifications:
      "普通自動車運転免許（AT限定可。選考時は不要ですが、入社時までに取得必須）／宅地建物取引士（歓迎・必須ではありません）",
    educationRequirement: "大卒以上（経験により学歴不問）",
    successTraits: ["素直に行動へ移せる方", "お客様目線で物事を考えられる方"],
    relatedPeopleSlugs: ["sample-sales-01"],
    requirements: {
      employmentType: "正社員",
      trialPeriod: "6ヶ月（本採用後の労働条件の変更はありません）",
      salary:
        "月給制（20日締め・月末支払い、銀行振込）／想定年収：360万円〜780万円（最低保証）＋営業成績によるインセンティブ／想定月給：250,000円〜650,000円（固定残業手当76,900円〜166,600円を含む。超過分は別途支給）／賞与：年2回／通勤手当：月額30,000円まで／技能手当：一級建築士30,000円・二級建築士20,000円・一級建築施工管理技士15,000円・二級建築施工管理技士7,000円・宅地建物取引士20,000円（各月額）／昇給：年1回（4月。優秀な成果を上げた場合は年2回のチャンスあり）",
      workLocation: "本社（詳細住所は共有後に反映）",
      workHours:
        "変形労働時間制／平日9:00〜18:00（8時間/日）／休憩60分／平均残業時間20〜30時間",
      holidays:
        "完全週休2日制（土日祝、社内カレンダーに基づく）／年間休日125日＋有給休暇計画付与3日（実質年間128日）",
      benefits: "定年60歳／その他社内制度・福利厚生は福利厚生ページをご覧ください",
      socialInsurance: "健康保険・厚生年金・雇用保険・労災保険",
      smokingMeasures: "屋内禁煙（喫煙室設置予定）",
      jobDescription: "不動産営業全般（新規開拓〜契約後フォローまで）",
      applicationRequirements: "大卒以上（経験により学歴不問）。普通自動車運転免許（AT限定可、入社時までに取得）",
      selectionFlow: SELECTION_FLOW,
    },
  },
  {
    slug: "sales-experienced",
    title: "営業職（経験者）",
    category: "mid-career",
    jobGroup: "general",
    employmentType: "正社員",
    location: "本社（詳細住所は共有後に反映）",
    summary: "不動産・建設業界での営業経験を活かして活躍いただくポジションです。",
    salaryRange: "想定年収：応相談（確定次第更新）",
    departmentId: "sales",
    published: true,
    isProvisional: true,
    workDetails: "既存顧客のフォローから新規開拓まで、経験を活かして幅広く担当いただきます。詳細は確定次第更新します。",
    requiredExperience: "不動産・建設業界での営業経験",
    requiredQualifications: "普通自動車運転免許（AT限定可）",
    educationRequirement: "学歴不問",
    relatedPeopleSlugs: ["sample-sales-01"],
    requirements: {
      employmentType: "正社員",
      trialPeriod: "6ヶ月（本採用後の労働条件の変更はありません）",
      salary: "応相談（確定次第更新）",
      workLocation: "本社（詳細住所は共有後に反映）",
      workHours: "変形労働時間制／平日9:00〜18:00（8時間/日）／休憩60分",
      holidays: "完全週休2日制（土日祝、社内カレンダーに基づく）",
      benefits: "確定次第更新します",
      socialInsurance: "健康保険・厚生年金・雇用保険・労災保険",
      smokingMeasures: "屋内禁煙（喫煙室設置予定）",
      jobDescription: "不動産営業全般（経験者向け）",
      applicationRequirements: "不動産・建設業界での営業経験がある方",
      selectionFlow: SELECTION_FLOW,
    },
  },
  {
    slug: "construction-management",
    title: "建設事業部 施工管理",
    category: "mid-career",
    jobGroup: "general",
    employmentType: "正社員",
    location: "本社（詳細住所は共有後に反映）",
    summary: "確かな技術と品質管理で、物件の価値をかたちにする施工管理のポジションです。",
    salaryRange: "想定年収：応相談（確定次第更新）",
    departmentId: "construction",
    published: true,
    isProvisional: true,
    workDetails: "施工管理・工程管理、協力会社との調整、安全管理・品質管理を担当いただきます。詳細は確定次第更新します。",
    requiredExperience: "施工管理経験（経験により応相談）",
    requiredQualifications: "建築施工管理技士（歓迎）",
    educationRequirement: "学歴不問",
    requirements: {
      employmentType: "正社員",
      trialPeriod: "6ヶ月（本採用後の労働条件の変更はありません）",
      salary: "応相談（確定次第更新）",
      workLocation: "本社（詳細住所は共有後に反映）",
      workHours: "変形労働時間制／平日9:00〜18:00（8時間/日）／休憩60分",
      holidays: "完全週休2日制（土日祝、社内カレンダーに基づく）",
      benefits: "確定次第更新します",
      socialInsurance: "健康保険・厚生年金・雇用保険・労災保険",
      smokingMeasures: "屋内禁煙（喫煙室設置予定）",
      jobDescription: "建設現場の施工管理全般",
      applicationRequirements: "施工管理経験がある方（応相談）",
      selectionFlow: SELECTION_FLOW,
    },
  },
  {
    slug: "demolition-staff",
    title: "解体産廃事業部 作業員・施工管理",
    category: "mid-career",
    jobGroup: "general",
    employmentType: "正社員",
    location: "本社（詳細住所は共有後に反映）",
    summary: "安全第一で解体工事・産業廃棄物処理を担うポジションです。",
    salaryRange: "想定年収：応相談（確定次第更新）",
    departmentId: "demolition",
    published: true,
    isProvisional: true,
    workDetails: "解体工事の施工・管理、産業廃棄物の適正処理、安全管理を担当いただきます。詳細は確定次第更新します。",
    requiredExperience: "不問（未経験の方も歓迎）",
    requiredQualifications: "特になし（取得支援制度あり）",
    educationRequirement: "学歴不問",
    requirements: {
      employmentType: "正社員",
      trialPeriod: "6ヶ月（本採用後の労働条件の変更はありません）",
      salary: "応相談（確定次第更新）",
      workLocation: "本社（詳細住所は共有後に反映）",
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
    salaryRange: "想定年収：応相談（確定次第更新）",
    departmentId: "admin",
    published: true,
    isProvisional: true,
    workDetails: "契約書類・各種書類の作成管理、顧客対応のサポート、社内の情報整理・スケジュール管理を担当いただきます。詳細は確定次第更新します。",
    requiredExperience: "不問（未経験の方も歓迎）",
    requiredQualifications: "特になし",
    educationRequirement: "学歴不問",
    requirements: {
      employmentType: "正社員",
      trialPeriod: "6ヶ月（本採用後の労働条件の変更はありません）",
      salary: "応相談（確定次第更新）",
      workLocation: "本社（詳細住所は共有後に反映）",
      workHours: "平日9:00〜18:00（8時間/日）／休憩60分",
      holidays: "完全週休2日制（土日祝、社内カレンダーに基づく）",
      benefits: "確定次第更新します",
      socialInsurance: "健康保険・厚生年金・雇用保険・労災保険",
      smokingMeasures: "屋内禁煙（喫煙室設置予定）",
      jobDescription: "各種書類管理、顧客対応サポート、社内の情報整理",
      applicationRequirements: "不問（未経験歓迎）",
      selectionFlow: SELECTION_FLOW,
    },
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
    published: true,
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
      workLocation: "本社（詳細住所は共有後に反映）",
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
