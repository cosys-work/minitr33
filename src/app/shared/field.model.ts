import {TemplateOptions} from "./shared.model";

export interface FieldRefs {
  label: string; //1
  description: string; //2
  id: string; //3
  placeholder: string; //4
  type: string; //5
  pattern: string | RegExp; //6
  options: string[], //7
  attributes: { [key: string]: string | number; }, //8
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

export type FieldReffs = Omit<TemplateOptions,
  'minLength' | 'maxLength' | 'rows' | 'cols'>;

export type FullFieldRefs = FieldRefs & FieldRefsAddons;

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

export interface FieldType {
  id: FieldId;
  value: string | any;
}

export const fieldType: (id: FieldId, value: string | any) => FieldType
  = (id: FieldId, value: string) => ({id, value});
