export type AlKeyAlNumValObj = { [key: string]: string | number; };

export interface FieldRefsAddons {
  requiredRule: string;
  disabledRule: string;
  hiddenRule: string;
  readonlyRule: string;

  maxRule: string;
  minRule: string;
  stepRule: string;
  tabindexRule: string;
}

export enum FieldId {
  label = "label",
  type = "type",
  description = "description",
  placeholder = "placeholder",
  id = "id",

  required = "required",
  disabled = "disabled",
  hidden = "hidden",
  readonly = "readonly",

  requiredRule = "requiredRule",
  disabledRule = "disabledRule",
  hiddenRule = "hiddenRule",
  readonlyRule = "readonlyRule",

  tabindex = "tabindex",
  step = "step",
  min = "min",
  max = "max",

  tabindexRule = "tabindexRule",
  stepRule = "stepRule",
  minRule = "minRule",
  maxRule = "maxRule",

  pattern = "pattern",
  options = "options",
  attributes = "attributes"
}

export type FieldValueType = string | RegExp | number | boolean | AlKeyAlNumValObj | any[] | undefined;

export const strFieldMapArr : [FieldId, string][] = [
  [FieldId.label, "Label_"],
  [FieldId.description, "Description_"],
  [FieldId.placeholder, "Placeholder_"],
  [FieldId.id, "0"],
];

export const booFieldMapArr : [FieldId, boolean][] = [
  [FieldId.required, false],
  [FieldId.disabled, false],
  [FieldId.hidden, false],
  [FieldId.readonly, false],
];

export const numFieldMapArr : [FieldId, number][] = [
  [FieldId.tabindex, 0],
  [FieldId.step, 1],
  [FieldId.min, 0],
  [FieldId.max, 100_000_000],
];

export const optFieldMapArr: [FieldId, string | RegExp | string[] | AlKeyAlNumValObj][] = [
  [FieldId.type, "input"],
  [FieldId.pattern, "\\w\\d"],
  [FieldId.options, [""]],
  [FieldId.attributes, {}]
];

export const ruleFieldMapArr: [FieldId, string][] = [
  [FieldId.requiredRule, ""],
  [FieldId.disabledRule, ""],
  [FieldId.hiddenRule, ""],
  [FieldId.readonlyRule, ""],

  [FieldId.tabindexRule, ""],
  [FieldId.stepRule, ""],
  [FieldId.minRule, ""],
  [FieldId.maxRule, ""],
];

export const fieldMap = new Map<FieldId, FieldValueType >([
    ...strFieldMapArr,
    ...booFieldMapArr,
    ...numFieldMapArr,
    ...optFieldMapArr
  ]
);

