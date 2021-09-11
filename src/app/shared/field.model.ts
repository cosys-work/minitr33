import { FormalField } from "./shared.model";

export interface FieldRefs {
  label: string;
  description: string;
  type: string;
  placeholder: string;
}

export const fieldRefs: (
  label: string,
  placeholder: string,
  description: string
) => FieldRefs 
= (label: string, placeholder: string, description: string) => ({
  label,
  placeholder,
  description,
  type: 'input',
});

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
  return fieldMaker(refs.label, refs.type, refs.label, refs.placeholder, 'flex-1');
}

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
