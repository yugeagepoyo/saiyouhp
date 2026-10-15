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
  /** 所属の表示名（「第二営業部」など、部署データより細かい単位がある場合に使う） */
  unit?: string;
  /** 役職（共有済みの方のみ。未共有なら設定しない） */
  position?: string;
  /** 旧表記。代表・部門長など unit/position を使わない箇所の表示に使う。 */
  role: string;
  joinYear: string;
  /** インタビュー詳細ページ・カードに大きく掲載する一言キャッチコピー */
  quote: string;
  isSample?: boolean;
  /** 社長・部長メッセージ枠（LeadershipSlide）に表示する対象かどうか */
  isLeadership?: boolean;
  /** 氏名のフリガナ（共有済みの方のみ） */
  kana?: string;
  /** 氏名のローマ字表記（共有済みの読みから起こす。未共有なら未設定） */
  nameEn?: string;
  /** 共有済みの本人写真。未着の場合はプレースホルダーを表示する。 */
  photoSrc?: string;
  /** 顔が切れないよう調整する写真の表示位置（CSS object-position） */
  photoPosition?: string;
  /** 取材前で本文が未確定。カードに写真・氏名のみ出し、詳細ページは作らない。 */
  interviewPending?: boolean;

  // 基本質問（すべて任意。回答がある項目のみ詳細ページに表示する）
  /** 入社前 → 入社後の変化（文章で回答いただいた場合。段落は空行で区切る） */
  beforeAfterText?: string;
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
    kana: "トウメイ ユウキ",
    nameEn: "Toumei Yuki",
    departmentId: "construction",
    unit: "建設事業部",
    position: "主任",
    role: "建設事業部 主任",
    joinYear: "2020年",
    quote: "",
    photoSrc: "/images/people/tome-yuki.jpg",
    // 横位置の写真のため、顔が中心に来るよう右寄りで切り抜く。
    photoPosition: "55% center",
    // 現時点では短文での回答のみ。文章は補完せず、いただいたまま掲載する。
    beforeAfterText: "心境の変化",
    previousCareer: "鍼灸師",
    howFoundCompany: "紹介",
    reasonForJoining: "チャレンジ",
    concernBeforeJoining: "特に無し",
    impressionChange: "現場の厳しさ",
    currentWork: "施工管理",
    rewardingMoment: "完成して喜んでいただいた時",
    futureChallenge: "資格取得",
  },
  {
    // 氏名・所属・入社年のみ共有済み。役職・写真・本文は未指定のため設定しない。
    slug: "ozoe-yua",
    name: "尾添 柚有",
    kana: "オゾエ ユア",
    nameEn: "Ozoe Yua",
    departmentId: "construction",
    unit: "建設事業部",
    role: "",
    joinYear: "2024年",
    quote: "",
    photoSrc: "/images/people/ozoe-yua.jpg",
    photoPosition: "center 35%",
    beforeAfterText:
      "保育士から全く異なる建設業界へ転職し、最初は分からないことばかりでしたが、日々新しい知識や経験が増え、自分自身の成長を感じています。\n\nリフォーム工事に関する各種申請や近隣挨拶、業務効率化に向けた取り組みなど、幅広い仕事に挑戦できるようになりました。",
    previousCareer: "保育士として働いていました。",
    howFoundCompany: "求人サイトのIndeedでノーブデンスを知りました。",
    reasonForJoining: "髪色やネイルが自由で、自分らしく働ける環境に魅力を感じました。",
    concernBeforeJoining:
      "建設業界の知識が全くなかったため、仕事を覚えられるか不安でした。また、保育士から初めてのオフィスワークへの転職だったので、環境に馴染めるか心配でした。",
    impressionChange:
      "入社前はデスクワークが中心だと思っていましたが、実際には近隣挨拶や申請業務などで外出する機会もあり、想像していた以上に幅広い仕事に携われることが新鮮でした！\n車での移動がちょっとしたリフレッシュにもなっています！",
    currentWork:
      "建設事業部で、主にリフォーム工事に関する見積書や各種書類の作成、工事に必要な申請手続き、近隣住民の方へのご挨拶などを担当しています。\n\nまた、社内業務をより効率的に進められるよう、見積もりサイトの開発などにも取り組んでいます。\n\n事務作業だけでなく、工事がスムーズに進むようにさまざまな面からサポートする仕事をしています。",
    rewardingMoment:
      "最初は分からなかったことが少しずつ理解できるようになり、自分一人で対応できる仕事が増えたときに成長を感じます。\n\nまた、申請手続きや近隣対応など、自分が担当した業務が無事に完了し、工事を円滑に進めるための力になれたときにもやりがいを感じます。\n\n周りの方から仕事を任せてもらえたり、頼ってもらえたりすることも嬉しいです！",
    futureChallenge:
      "リフォームや建設業界に関する知識をさらに深め、今まで以上に幅広い業務に対応できるようになりたいです。\n\nまた、日々の業務の中で改善できることを自分から見つけ、業務効率化にも積極的に取り組んでいきたいと考えています。\n\n一つひとつの仕事の精度を高めながら、周りの方から安心して仕事を任せてもらえる存在を目指していきたいです！",
  },
  {
    slug: "sumizawa-tetsuya",
    name: "住澤 徹哉",
    kana: "スミザワ テツヤ",
    nameEn: "Sumizawa Tetsuya",
    departmentId: "demolition",
    unit: "解体施工部",
    role: "",
    joinYear: "2025年",
    quote: "",
    photoSrc: "/images/people/sumizawa-tetsuya.jpg",
    beforeAfterText:
      "入社前はのんびり個人事業主として働いてましたが、ノーブデンスに入社して忙しいけど仕事が楽しく充実してると心から思えました。",
    previousCareer: "パーソナルトレーナー、スポーツインストラクター、生命保険営業",
    howFoundCompany: "大塚、立石、畑野から話を聞きました。\n彼らは高校、地元の友達でした。",
    reasonForJoining: "大塚、立石、畑野が働いてる会社だから",
    concernBeforeJoining:
      "未経験で営業ができるのか。会社員という形態で仕事をするのが初めてに近かったのでついていけるか不安でした。",
    impressionChange:
      "ガチガチの精鋭集団でとっつきにくいイメージがありましたが、実際にはコミュニケーションも積極的に取っていただきスムーズに溶け込むことができる環境でした。",
    currentWork: "解体施工部の営業兼施工管理兼作業員です。",
    rewardingMoment:
      "仕事ぶりを評価していただき継続して案件を頂けること。無事に現場が終わったとき。トラブルがあっても早急に対応できて最小限の被害に抑えられた時。",
    futureChallenge:
      "解体施工部をさらに拡大するために、現在の案件の倍の仕事をもらえるようにする。\nまたその案件をこなすための体制整備。",
  },
  {
    // 本文はすべて共有いただいた原文のまま（要約・言い換えはしない）。
    slug: "ishigaki-misaki",
    name: "石垣 岬",
    kana: "イシガキ ミサキ",
    nameEn: "Ishigaki Misaki",
    departmentId: "admin",
    unit: "管理部",
    role: "",
    joinYear: "2024年",
    quote: "",
    // 元写真が寄り気味のため、左右に余白を足して4:5にした画像を使用している。
    photoSrc: "/images/people/ishigaki-misaki.jpg",
    beforeAfterText:
      "ただ間取りや賃貸サイトを見るのが好きという理由から未経験の不動産会社で働くことになり、最初はとても不安でした。\n\n入社後は総務ですが、幅広い業務にかかわり事務スキルだけでなく、マルチタスクに対応する力も身につきました。",
    previousCareer:
      "約2年半腕時計の販売の仕事をしておりました。\n\nその後、約4年半歯科医院で受付助手の業務に就いておりました。",
    howFoundCompany:
      "もともとSUUMOなどの賃貸サイトで間取り写真などを見るのが好きで、宅地建物取引士資格の勉強を初めました。\n\n勉強を通して不動産業に興味を持ち、不動産にかかわる仕事を探していたところノーブデンスと出会いました。",
    reasonForJoining:
      "従業員の幸福を第一に考え、社会に反映するというのをみて社員を大事にしてくれる会社に惹かれて入社を決めました。\n\n不動産にはめずらしい土日休みというのも決め手のひとつでした。",
    concernBeforeJoining:
      "事務職は未経験で、パソコンなどの知識もまったくなかったことです。\n\n不動産についても今までと全く違う職種だったので、不安だらけでした。",
    impressionChange:
      "パソコンや不動産の知識などを一から教えていただけたので、学べる環境が整っていると感じました。",
    currentWork:
      "管理部の総務として、バックオフィス業務を行っております。\n\n備品発注や、ブログの更新、社用車の管理などの他にその他部署のサポート業務などです。",
    rewardingMoment:
      "バックオフィス業務というと目立たないことも多いのですが、社員の方が働きやすいようにサポートしていることがやりがいになっています。\n\n総務業務だけでなく、他部署のサポートをする機会も多いので幅広いスキルが身につきます。",
    futureChallenge:
      "総務として、社員の方が働きやすいようさらに環境を整えていきたいです。\n\nまた、ブログなどを通してもっとノーブデンスのことを知ってもらえるようこれからも取り組んでいきます。",
  },
  {
    // 本文はすべて共有いただいた原文のまま（要約・言い換えはしない）。
    slug: "hanayama-hikaru",
    name: "花山 晃",
    kana: "ハナヤマ ヒカル",
    nameEn: "Hanayama Hikaru",
    departmentId: "sales",
    unit: "第二営業部",
    position: "主任",
    role: "第二営業部 主任",
    joinYear: "2024年",
    quote: "",
    photoSrc: "/images/people/hanayama-hikaru.jpg",
    photoPosition: "60% center",
    beforeAfterText:
      "飲食業界から未経験で不動産業界へ転職し、営業経験も知識もゼロからのスタートでした。\n\n入社後は、不動産の買取再販をはじめ、リフォームや解体など幅広い業務を経験し、2026年8月には主任へ昇進しました。\n\n現在は自身の営業成績だけでなく、部署全体の成果や後輩の成長にも責任を持つ立場となり、仕事に対する考え方や視野が大きく変わりました。",
    previousCareer:
      "株式会社JISにて飲食店のホールマネージャーとして、店舗運営、従業員管理、採用業務などに従事していました。\n\n全店舗のアルバイト管理長や新規事業担当も経験し、新規事業ではイベントを7回開催し、約750万円の売上高、約150万円の利益を達成しました。",
    howFoundCompany:
      "あるご縁をきっかけに山住社長と知り合い、直接会社についてお話を伺ったことがきっかけです。\n\n事業内容や会社の方向性、今後の展望などを聞く中で、ノーブデンスという会社に興味を持つようになりました。",
    reasonForJoining:
      "年齢や経験に関係なく、自分自身の努力と成果次第で成長できる環境に魅力を感じたからです。\n\nまた、純粋に「とにかく稼ぎたい」という強い思いがありました。自分の頑張りが成果や収入に直結する環境で、自分自身の可能性を試したいと考え、入社を決意しました。",
    concernBeforeJoining:
      "不動産業界の知識も営業経験もなかったため、自分が通用するのかという不安はありました。\n\n特に専門知識が必要な業界なので、一から学び、成果につなげられるかが不安でした。",
    impressionChange:
      "想像以上に仕事の幅が広く、不動産の知識だけでなく、建築、法律、金融など、さまざまな知識が必要になることです。\n\nまた、営業は個人の能力だけでなく、社内外の方々との信頼関係によって成り立っていることを実感しました。",
    currentWork:
      "第二営業部の主任として、不動産の買取・再販を中心に、売買仲介、リフォーム、解体、残置物撤去などの営業活動を行っています。\n\nまた、自身の営業活動に加え、部署全体の目標達成に向けた取り組みや、後輩社員の育成にも携わっています。",
    rewardingMoment:
      "規模の大きな案件や難易度の高い案件を任され、それを成約へと導いたときに大きな達成感を感じます。\n\nまた、会社から求められる成果を達成するだけでなく、その期待を超える結果を生み出すことにやりがいを感じています。\n\n常に期待以上の価値を提供し、自分自身の成長が会社の成長や信頼につながることが、仕事の大きな原動力になっています。",
    futureChallenge:
      "まずは主任として、自身の営業成績を安定して積み上げるとともに、後輩社員の育成や部署全体の目標達成に貢献していきたいと考えています。\n\nまた、宅地建物取引士資格の取得を通じて、不動産に関する専門知識をさらに深め、より高度で難易度の高い案件にも対応できる営業力を身につけたいと考えています。\n\nそして、次の目標である課長への昇進を実現し、個人の成果にとどまらず、組織全体の成長を牽引できる存在を目指していきます。",
  },
  {
    slug: "nagato-ryosei",
    name: "長戸 涼星",
    kana: "ナガト リョウセイ",
    nameEn: "Nagato Ryosei",
    departmentId: "sales",
    unit: "第二営業部",
    position: "主任",
    role: "第二営業部 主任",
    quote: "",
    joinYear: "2024年",
    photoSrc: "/images/people/nagato-ryosei.jpg",
    // 縦位置の写真のため、頭が切れないよう上寄りで切り抜く。
    photoPosition: "center 25%",
    beforeAfterText:
      "入社前：やる気はあるものの歩合も少なく未来への不安はありました。\n入社後：より一層仕事へのモチベーションも上がりかなり生活に余裕ができました！",
    previousCareer: "エンド向けの不動産営業",
    howFoundCompany: "知人の紹介",
    reasonForJoining: "今の上席みたいになりたい！人間性に憧れを抱きました！",
    concernBeforeJoining:
      "結果が出せるかの不安はありました、ですが自分ならいける！と根拠なき自信はありました。笑",
    impressionChange: "ON、OFFがしっかりされているもののかなり働きやすい、学びがある環境",
    currentWork: "営業全般",
    rewardingMoment:
      "数字がしっかりとお給料に反映される、成約をあげた時、自分含め大切な人が喜んでくれたり幸せにできた時",
    futureChallenge: "もっともっと貪欲に泥臭く稼ぎまくること",
  },
  {
    slug: "sample-sales-01",
    name: "社員名（仮）",
    departmentId: "sales",
    unit: "営業部",
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
    unit: "建設事業部",
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
    unit: "管理部",
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
  {
    // 本文はすべて共有いただいた原文のまま（要約・言い換えはしない）。写真は未指定のため未設定。
    slug: "yuasa-rina",
    name: "湯浅 梨奈",
    kana: "ユアサ リナ",
    nameEn: "Yuasa Rina",
    departmentId: "finance",
    unit: "財務戦略部",
    role: "",
    joinYear: "2024年",
    quote: "",
    photoSrc: "/images/people/yuasa-rina.jpg",
    photoPosition: "center 35%",
    beforeAfterText:
      "入社前は、まさか自分が不動産の財務・経理に携わるとは思っていませんでした。入社後は、数字を扱うだけでなく、資金繰りや融資など経営に近い仕事にも関わるようになり、視野が広がりました。今は、どうすれば会社に貢献できるかを考えながら仕事をするようになったと思います。",
    previousCareer:
      "約7年間鉄道関係の仕事をしていました。その後、美容外科の受付を経験し、ノーブデンスに入社しました。これまで異なる業界を経験してきたことが、今の仕事にも活きていると感じています。",
    howFoundCompany:
      "友人がノーブデンスで働いていたことがきっかけです。友人がとても働きやすそうで、生き生きとした表情で働いている姿が印象的でした。そんな姿を見て、私もここで働いてみたいと思い紹介してもらいました。",
    reasonForJoining:
      "これまで経験したことのない業界・職種に挑戦できることが大きかったです。新しいことを学びながら自分自身も成長し、会社に貢献できる人材になりたいと思い入社を決めました。",
    concernBeforeJoining:
      "不動産業界も財務・経理の仕事も未経験だったので、専門知識を身につけ、業務をきちんと理解できるか不安でした。最初は分からないことばかりでしたが、一つひとつ学びながら、できることを増やしていこうという気持ちで取り組んでいました。",
    impressionChange:
      "想像していた以上に、幅広い業務に携われることです。経理業務だけでなく、資金繰りや銀行への融資相談など、会社の経営に近い部分にも関われることに驚きました。自分の仕事が会社全体につながっていることを実感しています。",
    currentWork:
      "財務戦略部に所属し、不動産に関する経理・財務業務を担当しています。具体的には、請求書の処理や経費精算、資金繰りの管理、金融機関への融資相談、司法書士とのやり取り、税理士事務所との連携など、業務は多岐にわたります。幅広い業務に携わる中で、日々新しい知識を身につけながら、経験を積んでいます。",
    rewardingMoment:
      "自分が関わった仕事が、実際に会社の成果につながったときです。特に、銀行への融資相談など、会社の資金調達に関わる仕事は責任も大きいですが、その分やりがいを感じます。また、以前は分からなかったことが理解できるようになったり、任せてもらえる仕事が増えたりしたときにも、自分の成長を実感します。",
    futureChallenge:
      "財務・経理に関する専門知識をさらに深め、資金繰りや融資業務を通じて、これまで以上に会社に貢献していきたいです。\n\nまた、周囲から信頼され、安心して仕事を任せてもらえる存在を目指しています。",
  },
];

export function getPersonBySlug(slug: string): Person | undefined {
  return people.find((p) => p.slug === slug);
}
