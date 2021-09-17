import { FormlyFieldConfig } from "@ngx-formly/core";
import { Observable } from "rxjs";

export interface TemplateOptions {
    type: string;
    label: string;
    placeholder: string;
    disabled: boolean;
    options: any[];
    rows: number;
    cols: number;
    description: string;
    hidden: boolean;
    max: number;
    min: number;
    minLength: number;
    maxLength: number;
    pattern: string | RegExp;
    required: boolean;
    tabindex: number;
    readonly: boolean;
    attributes: {
        [key: string]: string | number;
    };
    step: number;
}

export interface ValidationMessageOption {
    name: string;
    message: string | ((error: any, field: FormlyFieldConfig) => string | Observable<string>);
}

export interface FormalField {
    key: string,
    type: string,
    className: string,
    id: string,
    templateOptions: TemplateOptions;
    validation?: {
        messages?: {
            [messageProperties: string]: ValidationMessageOption['message'];
        };
        show?: boolean;
        [additionalProperties: string]: any;
    };
    jump?: FormalField | FormalField[];
}