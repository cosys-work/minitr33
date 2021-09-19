export type BooTyped = "required" | "disabled" | "hidden" | "readonly";

export type NumTyped = "tabindex" | "maximum" | "minimum" | "step";

export const booLabels = ["required", "disabled", "hidden", "readonly"];
export const numLabels = ["tabindex", "maximum", "minimum", "step"];

export function isNumTyped(a: string): a is NumTyped {
  return numLabels.includes(a);
}

export function isBooTyped(a: string): a is BooTyped {
  return booLabels.includes(a);
}

export interface FieldEssentials {
  label: string;
  placeholder: string;
  description: string;
}

export interface BooTyper {
  current: BooTyped;
  required: FieldEssentials;
  disabled: FieldEssentials;
  hidden: FieldEssentials;
  readonly: FieldEssentials;
}

export interface NumTyper {
  current: NumTyped;
  tabindex: FieldEssentials;
  maximum: FieldEssentials;
  minimum: FieldEssentials;
  step: FieldEssentials;
}
