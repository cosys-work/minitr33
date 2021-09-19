import {FieldRefs, FullFieldRefs} from "../shared/field.model";
import {FormalField, TemplateOptions} from "../shared/shared.model";

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
  tabindexRule: string = "",
  requiredRule: string = "",
  disabledRule: string = "",
  hiddenRule: string = "",
  readonlyRule: string = "",
  maxRule: string = "",
  minRule: string = "",
  stepRule: string = "",
): FullFieldRefs {

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
    step,
    tabindexRule,
    requiredRule,
    disabledRule,
    hiddenRule,
    readonlyRule,
    maxRule,
    minRule,
    stepRule,
  });
}


export function refsToFieldHelper(
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
  tabindexRule: string = "",
  requiredRule: string = "",
  disabledRule: string = "",
  hiddenRule: string = "",
  readonlyRule: string = "",
  maxRule: string = "",
  minRule: string = "",
  stepRule: string = ""
): Omit<FormalField, "jump"> {
  const [_, typeAA] = type.split(",");
  const [minLength, maxLength, rows, cols] = [min, max, step, step];
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

  const validation = {
    tabindexRule,
    requiredRule,
    disabledRule,
    hiddenRule,
    readonlyRule,
    maxRule,
    minRule,
    stepRule
  };

  return ({
    key,
    type,
    className,
    templateOptions,
    id,
    validation
  });

}


export function seedFieldFromRefs(refs: FieldRefs): FormalField {
  return refsToFieldHelper(
    refs.label,
    refs.type,
    refs.label,
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


export function seedEmptyField(
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
  return seedFieldFromRefs(fieldRefs(
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
