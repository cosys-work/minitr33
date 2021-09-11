import { FormalField } from "./shared.model";

export interface FieldRefs {
  label: string;
  description: string;
  type: string;
  placeholder: string;
}

export function fieldRefs(
  label: string,
  placeholder: string,
  description: string,
  type: string = 'input'
): FieldRefs {
  return ({
    label,
    placeholder,
    description,
    type,
  });
}

export function fieldMaker(
    key: string, 
    type: string, 
    label: string, 
    placeholder: string,
    className: string
): FormalField {

    const templateOptions = {
      label,
      placeholder
    };

    return ({
      key,
      type,
      className,
      templateOptions
    });

};


export const emptyField = () => fieldMaker("A", "input", "Label", "C", "D");

export function refsToField(refs: Required<FieldRefs>): FormalField {  
  return fieldMaker(refs.label, refs.type, refs.description, refs.placeholder, 'flex-1');
}

export function makeFormalField(
  label: string,
  placeholder: string,
  description: string,
  type: string = "input"
): FormalField {
  return refsToField(fieldRefs(label, placeholder, description, type));
}

export enum FieldId {
  label = "label",
  type = "type",
  description = "description",
  placeholder = "placeholder"
}

export interface FieldType {
  id: FieldId;
  value: string;
}

export const fieldType: (id: FieldId, value: string) => FieldType 
  = (id: FieldId, value: string) => ({id, value});



export const nameField: FormalField = {
  key: 'name',
  type: 'input',
  className: 'flex-2',
  templateOptions: {
    label: 'Name',
    placeholder: 'Enter name',
    required: true,
    minLength: 3,
    maxLength: 10,
  }
};

export const emailField: FormalField = {
  key: 'email',
  type: 'input',
  className: 'flex-2',
  templateOptions: {
    label: 'Email',
    placeholder: 'Enter email',
    required: false,
  }
}
