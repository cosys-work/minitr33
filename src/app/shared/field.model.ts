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
  required: boolean; //9
  disabled: boolean; //10
  hidden: boolean; //11
  readonly: boolean; //12
  tabindex: number; //13
  maximum: number; //14
  minimum: number; //15
  step: number; //16
}

export function fieldRefs(
  label: string,
  placeholder: string,
  description: string,
  type: string,
  pattern: string | RegExp,
  options: string[],
  attributes: { [key: string]: string | number; },
  required: boolean,
  disabled: boolean,
  hidden: boolean,
  readonly: boolean,
  tabindex: number,
  maximum: number,
  minimum: number,
  step: number,
  id: string,
): Required<FieldRefs> {

  return ({
    label,
    placeholder,
    description,
    type,
    minimum, 
    maximum,
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
    required: boolean,
    disabled: boolean,
    hidden: boolean,
    readonly: boolean,
    tabindex: number,
    max: number,
    min: number,
    step: number,
): Omit<Required<FormalField>, "jump"> {
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

};


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
    refs.required, 
    refs.disabled,
    refs.hidden,
    refs.readonly,
    refs.tabindex,
    refs.maximum,
    refs.minimum,
    refs.step
  );
}

export function makeFormalField(
  label: string,
  placeholder: string,
  description: string,
  type: string = "input",
  pattern: string = "",
  options: string[] = [],
  attributes: { [key: string]: string | number; } = {},
  required: boolean = false,
  disabled: boolean = false,
  hidden: boolean = false,
  readonly: boolean = false,
  tabindex: number = 0,
  maximum: number = 0,
  minimum: number = 0,
  step: number = 0,
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
    
    required,
    disabled,
    hidden,
    readonly,

    tabindex,
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

export interface FieldType {
  id: FieldId;
  value: string | any;
}

export const fieldType: (id: FieldId, value: string | any) => FieldType 
  = (id: FieldId, value: string) => ({id, value});


