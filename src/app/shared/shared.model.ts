import {FormlyFieldConfig} from '@ngx-formly/core';
import {Observable} from 'rxjs';

export interface TemplateOptions {
  type: string; //1
  label: string; //2
  placeholder: string; //3
  disabled: boolean | undefined; //4
  options: any[]; //5
  rows: number; //6
  cols: number; //7
  description: string; //8
  hidden: boolean | undefined; //9
  max: number | undefined; //10
  min: number | undefined; //11
  minLength: number | undefined; //12
  maxLength: number | undefined; //13
  pattern: string | RegExp; //14
  required: boolean | undefined; //15
  tabindex: number; //16
  readonly: boolean | undefined; //17
  attributes: { //18
    [key: string]: string | number;
  };
  step: number; //19
}

export interface ValidationMessageOption {
  name: string;
  message:
    | string
    | ((error: any, field: FormlyFieldConfig) => string | Observable<string>);
}

export interface FormalField {
  key: string;
  type: string;
  className: string;
  id: string;
  templateOptions: TemplateOptions;
  validation?: {
    messages?: {
      [messageProperties: string]: ValidationMessageOption['message'];
    };
    show?: boolean;

    hiddenRule: string;
    requiredRule: string;
    disabledRule: string;
    readonlyRule: string;

    minRule: string;
    maxRule: string;
    stepRule: string;
    tabindexRule: string;

    [additionalProperties: string]: any;
  };
  jump?: FormalField | FormalField[];
}
