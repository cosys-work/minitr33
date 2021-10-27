import {FieldId, fieldMap, FieldValueType, ruleFieldMapArr} from "../shared/field.model";
import {FormalField, TemplateOptions, Validation} from "../shared/shared.model";

function makeDescriptor(value: FieldValueType): PropertyDescriptor {
  const enumerable = true;
  const writable = true;
  return {
    value,
    writable,
    enumerable
  }
}

export function seedAField(label: string, placeholder: string, description: string, id: number): FormalField {
  const defaultField = fieldMap;

  defaultField.set(FieldId.label, label);
  defaultField.set(FieldId.placeholder, placeholder);
  defaultField.set(FieldId.description, description);
  defaultField.set(FieldId.id, id);
  defaultField.set(FieldId.tabindex, id);

  const tempOpt = {};
  [...defaultField.entries()].forEach(([k, v]) => {
    Object.defineProperty(tempOpt, k, makeDescriptor(v));
  });
  const templateOptions: TemplateOptions = tempOpt as TemplateOptions;
  templateOptions.type = (fieldMap.get(FieldId.type)! as string).split(",")[1] ?? "text";

  const defaultRules = ruleFieldMapArr;
  const valTemp = {};
  defaultRules.forEach(([k, v]) => {
    Object.defineProperty(valTemp, k, makeDescriptor(v));
  });
  const validation: Validation = valTemp as Validation;

  return  {
    key: fieldMap.get(FieldId.id) as string,
    type: (fieldMap.get(FieldId.type)! as string).split(",")[0] ?? "input",
    className: 'flex-1',
    id: Math.random().toString(36).substr(2) + "_" + Date.now(),
    templateOptions,
    validation
  } as FormalField;

}
