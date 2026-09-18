import type { ZodError } from "zod";

export type FieldErrors = Record<string, string[]>;

export interface ActionState {
  status: "idle" | "error" | "success";
  errors?: FieldErrors;
  message?: string;
}

export const initialActionState: ActionState = { status: "idle" };

/** ZodのバージョンやAPI変更に依存しないよう、issuesから直接フィールドエラーを組み立てる */
export function zodErrorToFieldErrors(error: ZodError): FieldErrors {
  const fieldErrors: FieldErrors = {};
  for (const issue of error.issues) {
    const key = issue.path.length > 0 ? issue.path.join(".") : "_form";
    if (!fieldErrors[key]) fieldErrors[key] = [];
    fieldErrors[key].push(issue.message);
  }
  return fieldErrors;
}
