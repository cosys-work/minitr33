import { FormalField, TemplateOptions } from "./shared.model";

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

export type FieldReffs = Omit<
  TemplateOptions,
  'minLength' | 'maxLength' | 'rows' | 'cols'
  >

export function fieldRefs(
  label: string,
  placeholder: string,
  description: string,
  type: string,
  pattern: string | RegExp,
  options: string[],
  attributes: { [key: string]: string | number; },
  tabindex: number,
  required?: boolean,
  disabled?: boolean,
  hidden?: boolean,
  readonly?: boolean,
  maximum?: number,
  minimum?: number,
  step?: number,
  id: string = "",
): FieldRefs {

  return ({
    label,
    placeholder,
    description,
    type,
    min: minimum,
    max: maximum,
    id,
    pattern,
    options,
    attributes,
    required,
    disabled,
    hidden,
    readonly,
    tabindex,
    step
  });
}

export function fieldMaker(
    key: string,
    type: string,
    label: string,
    placeholder: string,
    className: string,
    description: string,
    id: string,
    pattern: string | RegExp,
    options: string[],
    attributes: { [key: string]: string | number; },
    tabindex: number,
    required?: boolean,
    disabled?: boolean,
    hidden?: boolean,
    readonly?: boolean,
    max?: number,
    min?: number,
    step: number = 1,
): Omit<FormalField, "jump"> {
    const [_, typeAA] = type.split(",");
    const [minLength, maxLength, rows, cols] = [min, max, 0, 0];
    const templateOptions: TemplateOptions = {
      type: typeAA ?? "text",
      label,
      placeholder,
      pattern,
      options,
      attributes,
      required,
      disabled,
      hidden,
      readonly,
      tabindex,
      max,
      min,
      step,
      minLength,
      maxLength,
      rows,
      cols,
      description
    };

    const validation = {};

    return ({
      key,
      type,
      className,
      templateOptions,
      id,
      validation
    });

}


export function refsToField(refs: FieldRefs): FormalField {
  return fieldMaker(
    refs.label,
    refs.type,
    refs.description,
    refs.placeholder,
    'flex-1',
    refs.description,
    refs.id,
    refs.pattern,
    refs.options,
    refs.attributes,
    refs.tabindex,
    refs.required,
    refs.disabled,
    refs.hidden,
    refs.readonly,
    refs.max,
    refs.min,
    refs.step
  );
}

export function makeFormalField(
  label: string,
  placeholder: string,
  description: string,
  tabindex: number,
  type: string = "input",
  pattern: string = "",
  options: string[] = [],
  attributes: { [key: string]: string | number; } = {},
  required?: boolean,
  disabled?: boolean,
  hidden?: boolean,
  readonly?: boolean,
  maximum?: number,
  minimum?: number,
  step?: number,
  id: string = "",
): FormalField {
  return refsToField(fieldRefs(
    label,
    placeholder,
    description,
    type,

    pattern,
    options,
    attributes,

    tabindex,

    required,
    disabled,
    hidden,
    readonly,

    maximum,
    minimum,
    step,
    id
  ));
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
