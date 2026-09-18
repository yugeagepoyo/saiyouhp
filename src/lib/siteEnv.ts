/**
 * 検索エンジンへのインデックスを許可するかどうか。
 *
 * まだ仮データ・サンプルを含むため、既定では常に noindex とする。
 * 本番公開の準備が整った時点で、環境変数 NEXT_PUBLIC_ALLOW_INDEXING=true を
 * 明示的に設定したときだけインデックスを許可する。
 * （VERCEL_ENV での判定にすると `vercel --prod` を1回実行しただけで
 *   共有用URLが検索対象になってしまうため、明示的なオプトイン方式にしている）
 */
export const ALLOW_INDEXING = process.env.NEXT_PUBLIC_ALLOW_INDEXING === "true";
