export const allTypes: string[] = [
  "input,text",
  "input,number",
  "input,email",
  "input,password",
  "input,time",
  "input,date",
  "input,tel",
  "input,url",
  "input,datetime-local",
  "input,month",
  "input,week",
  "input,color",
  'textarea',
  'checkbox',
  'radio',
  'select',
  'multi-select',
  'datepicker',
  'toggle',
  'slider',
  'autocomplete'
];

export const allPatterns: string[] = ["Pattern 1", "Pattern 2"];
export const allOptions: string[] = ["Option 1", "Option 2"];
export const allAttributes: string[] = ["Attribute 1", "Attribute 2"];

export const strLabels = ["label", "description", "placeholder", "id"];
export const optLabels = ["type", "pattern", "options", "attributes"];

export interface LPD {
  label: string;
  placeholder: string;
  description: string;
}

export interface  StrFields {
  label: LPD;
  placeholder: LPD;
  description: LPD;
  id: LPD;
}

export interface OptFields {
  type: LPD;
  options: LPD;
  pattern: LPD;
  attributes: LPD;
}

export interface StrFieldsState extends StrFields {
  current: keyof StrFields;
}

export interface OptFieldsState extends OptFields {
  current: keyof OptFields;
}

export const strState: StrFieldsState = {
  current: "label",
  label: {
    label: "Label",
    placeholder: "Eg: First Name",
    description: "Short Name of the Field",
  },
  placeholder: {
    label: "Placeholder",
    placeholder: "Eg: John Doe",
    description: "Simple example value",
  },
  description: {
    label: "Description",
    placeholder: "Eg: Please fill in your first name",
    description: "Some hints about the field",
  },
  id: {
    label: "Id",
    placeholder: "Eg: 42",
    description: "A unique hidden id",
  }
}

export const optState: OptFieldsState = {
  current: "type",
  type: {
    label: "Type",
    placeholder: "Input",
    description: "Type of the field",
  },
  options: {
    label: "Options",
    placeholder: "Select options",
    description: "Add options for the field",
  },
  pattern: {
    label: "Pattern",
    placeholder: "Regex",
    description: "Add a regex pattern",
  },
  attributes: {
    label: "Attributes",
    placeholder: "Special fields",
    description: "Special attributes go here",
  }
}
