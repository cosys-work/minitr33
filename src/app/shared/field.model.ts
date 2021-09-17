import { FormalField } from "./shared.model";

export interface FieldRefs {
  label: string;
  description: string;
  type: string;
  placeholder: string;
  traits: string;
  relations: string;
  min: string;
  max: string; 
}

export function fieldRefs(
  label: string,
  placeholder: string,
  description: string,
  type: string,
): FieldRefs {

  const traits = "";
  const relations = "";
  const min = "";
  const max = "";

  return ({
    label,
    placeholder,
    description,
    type,
    traits,
    relations,
    min, 
    max
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


export const emptyField = () => fieldMaker("key", "input", "label", "placeholder", "className");

export function refsToField(refs: Required<FieldRefs>): FormalField {  
  return fieldMaker(
    refs.label, refs.type, refs.description, refs.placeholder, 'flex-1');
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
  placeholder = "placeholder",
  id = "id",

  traits = "trait",
  relations = "relation",
  min = "min",
  max = "max"
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
