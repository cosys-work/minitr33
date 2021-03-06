export const booLabels = ["required", "disabled", "hidden", "readonly"];
export const numLabels: string[] = ["tabindex", "max", "min", "step"];
export const strLabels = ["label", "description", "placeholder", "id"];
export const optLabels = ["type", "pattern", "options", "attributes"];

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

export interface LPD {
  label: string;
  placeholder: string;
  description: string;
}

export interface StrFields {
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

export interface BooTypeField {
  required: LPD;
  disabled: LPD;
  hidden: LPD;
  readonly: LPD;
}

export interface NumTypeField {
  tabindex: LPD;
  max: LPD;
  min: LPD;
  step: LPD;
}

export interface StrFieldsState extends StrFields {
  current: keyof StrFields;
}

export interface OptFieldsState extends OptFields {
  current: keyof OptFields;
}

export interface BooTyper extends BooTypeField {
  current: keyof BooTypeField;
}


export interface NumTyper extends NumTypeField {
  current: keyof NumTypeField;
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


export const numState: NumTyper = {
  current: "tabindex",
  tabindex: {
    label: "Index",
    placeholder: "0",
    description: "Position",
  },
  max: {
    label: "Max",
    placeholder: "Eg: 1000",
    description: "Max value",
  },
  min: {
    label: "Min",
    placeholder: "0",
    description: "Min value",
  },
  step: {
    label: "Step",
    placeholder: "0",
    description: "Increment",
  }
};

export const booState: BooTyper = {
  current: "required",
  required: {
    label: "Rule for 'Required'",
    placeholder: "false",
    description: "When is this a required field?",
  },
  disabled: {
    label: "Rule for 'Disabled'",
    placeholder: "false",
    description: "When is this a disabled field?",
  },
  hidden: {
    label: "Rule for 'Hidden'",
    placeholder: "false",
    description: "When is this a hidden field?",
  },
  readonly: {
    label: "Rule for 'Readonly'",
    placeholder: "false",
    description: "When is this a readonly field?",
  }
}

export type BooTyped = keyof BooTypeField;

export type NumTyped = keyof NumTypeField;

// export function isNumTyped(a: string): a is NumTyped {
//   return numLabels.includes(a);
// }

// export function isBooTyped(a: string): a is BooTyped {
//   return booLabels.includes(a);
// }


