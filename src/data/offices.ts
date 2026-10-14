/**
 * オフィス紹介。
 *
 * 写真は共有いただいた素材のみを使用し、未着の写真は推測で別画像を当てず
 * プレースホルダー（label のみ）を表示する。
 * 室内写真は共有済み（大阪は3枚）。
 */

export interface Office {
  id: string;
  name: string;
  address: string;
  exteriorSrc?: string;
  exteriorLabel: string;
  /** 室内写真（複数可）。未着の場合は未設定。 */
  interiorSrcs?: string[];
  interiorLabel: string;
}

export const offices: Office[] = [
  {
    id: "osaka",
    name: "大阪オフィス",
    address: "大阪市北区豊崎3丁目20番10号",
    exteriorSrc: "/images/office/osaka-exterior.jpg",
    exteriorLabel: "大阪オフィス 外観",
    interiorSrcs: [
      "/images/office/osaka-interior-1.jpg",
      "/images/office/osaka-interior-2.jpg",
      "/images/office/osaka-interior-3.jpg",
    ],
    interiorLabel: "大阪オフィス 室内",
  },
  {
    id: "tokyo",
    name: "東京オフィス",
    address: "東京都中央区日本橋3丁目6番11号6階",
    exteriorSrc: "/images/office/tokyo-exterior.jpg",
    exteriorLabel: "東京オフィス 外観",
    interiorSrcs: ["/images/office/tokyo-interior.jpg"],
    interiorLabel: "東京オフィス 室内",
  },
  {
    id: "hyogo",
    name: "兵庫オフィス",
    address: "尼崎市戸ノ内町4丁目3番1号3棟109",
    exteriorSrc: "/images/office/hyogo-exterior.jpg",
    exteriorLabel: "兵庫オフィス 外観",
    interiorSrcs: ["/images/office/hyogo-interior.jpg"],
    interiorLabel: "兵庫オフィス 室内",
  },
];
