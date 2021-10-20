import {TemplateOptions} from "./shared.model";

export type AlKeysAlNumVals = { [key: string]: string | number; };

export interface FieldRefs {

  label: string; //1
  description: string; //2
  id: string; //3
  placeholder: string; //4
  type: string; //5

  pattern: string | RegExp; //6
  options: string[], //7
  attributes: AlKeysAlNumVals, //8

  required?: boolean; //9
  disabled?: boolean; //10
  hidden?: boolean; //11
  readonly?: boolean; //12

  tabindex: number; //13
  max?: number; //14
  min?: number; //15
  step?: number; //16
}

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

export type FullFieldRefs = FieldRefs & FieldRefsAddons;

export type FullTemplate = TemplateOptions & FieldRefsAddons;

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
  min = "minimum",
  max = "maximum",

  tabindexRule = "tabindexRule",
  stepRule = "stepRule",
  minRule = "minRule",
  maxRule = "maxRule",

  pattern = "pattern",
  options = "options",
  attributes = "attributes"
}

export type FieldValueType = string | RegExp | number | boolean | AlKeysAlNumVals | any[] | undefined;

export const fieldMap = new Map<FieldId, FieldValueType >([
    [FieldId.label, FieldId.label],
    [FieldId.type, FieldId.type],
    [FieldId.description, FieldId.description],
    [FieldId.placeholder, FieldId.placeholder],
    [FieldId.id, FieldId.id],

    [FieldId.required, FieldId.required],
    [FieldId.disabled, FieldId.disabled],
    [FieldId.hidden, FieldId.hidden],
    [FieldId.readonly, FieldId.readonly],

    [FieldId.requiredRule, FieldId.requiredRule],
    [FieldId.disabledRule, FieldId.disabledRule],
    [FieldId.hiddenRule, FieldId.hiddenRule],
    [FieldId.readonlyRule, FieldId.readonlyRule],

    [FieldId.tabindex, FieldId.tabindex],
    [FieldId.step, FieldId.step],
    [FieldId.min, FieldId.min],
    [FieldId.max, FieldId.max],

    [FieldId.tabindexRule, FieldId.tabindexRule],
    [FieldId.stepRule, FieldId.stepRule],
    [FieldId.minRule, FieldId.minRule],
    [FieldId.maxRule, FieldId.maxRule],

    [FieldId.pattern, FieldId.pattern],
    [FieldId.options, FieldId.options],
    [FieldId.attributes, FieldId.attributes]
  ]
);

// export const fieldArray = Object.keys(FieldId)
//   .map(attribName => [attribName, FieldId[attribName]]);
//
// export const fieldMap: Map<string, string> = new Map(fieldArray);
//
// export const fieldTypeMap: Map<FieldId, string | any> = new Map(fieldMap);

export interface FieldType {
  id: FieldId;
  value: FieldValueType;
}

export const fieldType: (id: FieldId, value: string | any) => FieldType
  = (id: FieldId, value: string) => ({id, value});
