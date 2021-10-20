import {Injectable} from '@angular/core';
import {FieldId, FieldRefsAddons, fieldType} from "../shared/field.model";
import {GrafStore} from "./graf-store.service";
import {map} from "rxjs/operators";
import {FormalField, TemplateOptions, Validation} from "../shared/shared.model";

@Injectable({
  providedIn: 'root'
})
export class ChangeSettersService {

  rxt = this.graf.rxtiv();

  fielder(tmpl: keyof FormalField) {
    return this.rxt.pipe(map(z => z.nodes[z.curNode].field[tmpl]));
  }

  valor(rule: keyof FieldRefsAddons) {
    return this.rxt.pipe(map(z => z.nodes[z.curNode].field.validation[rule]))
  }

  templar(opt: keyof TemplateOptions) {
    return this.rxt.pipe(map(z => z.nodes[z.curNode].field.templateOptions[opt]));
  }


  labelChanges = this.templar(FieldId.label);
  typeChanges = this.templar(FieldId.type);
  descriptionChanges = this.templar(FieldId.description);
  placeholderChanges = this.templar(FieldId.placeholder);

  idChanges = this.fielder(FieldId.id);
  optsChanges = this.templar(FieldId.options);
  attrsChanges = this.templar(FieldId.attributes);
  patternChanges = this.templar(FieldId.pattern);

  minChanges = this.templar(FieldId.min);
  maxChanges = this.templar(FieldId.max);
  tabindexChanges = this.templar(FieldId.tabindex);
  stepChanges = this.templar(FieldId.step);

  requiredChanges = this.templar(FieldId.required);
  disabledChanges = this.templar(FieldId.disabled);
  hiddenChanges = this.templar(FieldId.hidden);
  readonlyChanges = this.templar(FieldId.readonly);

  minRuleChanges = this.valor(FieldId.minRule);
  maxRuleChanges = this.valor(FieldId.maxRule);
  tabindexRuleChanges = this.valor(FieldId.tabindexRule);
  stepRuleChanges = this.valor(FieldId.stepRule);

  requiredRuleChanges = this.valor(FieldId.requiredRule);
  disabledRuleChanges = this.valor(FieldId.disabledRule);
  hiddenRuleChanges = this.valor(FieldId.hiddenRule);
  readonlyRuleChanges = this.valor(FieldId.readonlyRule);

  constructor(private graf: GrafStore) {}

  updateFieldTOpts(templateOptions: TemplateOptions) {
    const oldField: FormalField = this.graf.curField;
    const newField: FormalField = {...oldField, templateOptions};
    this.graf.updateNode(newField);
  }

  updateFieldVal(validation: Validation) {
    const oldField: FormalField = this.graf.curField;
    const newField: FormalField = {...oldField, validation};
    this.graf.updateNode(newField);
  }

  //1
  set max(max: number) {
    const oldTOpt: TemplateOptions = this.graf.curTemplateOptions;
    const templateOptions: TemplateOptions = { ...oldTOpt, max};
    this.updateFieldTOpts(templateOptions);
  }


  set maxRule(maxRule: string) {
    const oldV: Validation = this.graf.curValidation;
    const validation: Validation = {...oldV, maxRule};
    this.updateFieldVal(validation);
  }

  //2
  set min(min: number) {
    const oldTOpt: TemplateOptions = this.graf.curTemplateOptions;
    const templateOptions: TemplateOptions = {...oldTOpt, min};
    this.updateFieldTOpts(templateOptions);
  }

  set minRule(minRule: string) {
    const oldV: Validation = this.graf.curValidation;
    const validation: Validation = {...oldV, minRule};
    this.updateFieldVal(validation);
  }

  //3
  set label(label: string) {
    const oldTOpt: TemplateOptions = this.graf.curTemplateOptions;
    const templateOptions: TemplateOptions = {...oldTOpt, label};
    this.updateFieldTOpts(templateOptions);
  }

  //4
  set type(type: string) {
    const oldTOpt: TemplateOptions = this.graf.curTemplateOptions;
    const templateOptions: TemplateOptions = {...oldTOpt, type};
    this.updateFieldTOpts(templateOptions);
  }

  //5
  set id(id: string) {
    const idField = fieldType(FieldId.id, id);
    console.log(idField);
  }

  //6
  set description(description: string) {
    const oldTOpt: TemplateOptions = this.graf.curTemplateOptions;
    const templateOptions: TemplateOptions = {...oldTOpt, description};
    this.updateFieldTOpts(templateOptions);
  }

  //7
  set placeholder(placeholder: string) {
    const oldTOpt: TemplateOptions = this.graf.curTemplateOptions;
    const templateOptions: TemplateOptions = {...oldTOpt, placeholder};
    this.updateFieldTOpts(templateOptions);
  }

  //8
  set required(required: boolean) {
    const oldTOpt: TemplateOptions = this.graf.curTemplateOptions;
    const templateOptions: TemplateOptions = {...oldTOpt, required};
    this.updateFieldTOpts(templateOptions);
  }

  set requiredRule(requiredRule: string) {
    const oldV: Validation = this.graf.curValidation;
    const validation: Validation = {...oldV, requiredRule};
    this.updateFieldVal(validation);
  }

  //9
  set disabled(disabled: boolean) {
    const oldTOpt: TemplateOptions = this.graf.curTemplateOptions;
    const templateOptions: TemplateOptions = {...oldTOpt, disabled};
    this.updateFieldTOpts(templateOptions);
  }




  set disabledRule(disabled: string) {
    const disField = fieldType(FieldId.disabledRule, disabled);
    console.log(disField);
  }

  //10
  set hidden(hidden: boolean) {
    const hideField = fieldType(FieldId.hidden, hidden);
    console.log(hideField);
  }

  set hiddenRule(hidden: string) {
    const hideField = fieldType(FieldId.hiddenRule, hidden);
    console.log(hideField);
  }

  //11
  set readonly(readonly: boolean) {
    const readonlyField = fieldType(FieldId.readonly, readonly);
    console.log(readonlyField);
  }

  set readonlyRule(readonly: string) {
    const readonlyField = fieldType(FieldId.readonlyRule, readonly);
    console.log(readonlyField);
  }

  //12
  set tabindex(tabindex: number) {
    const tabindexField = fieldType(FieldId.tabindex, tabindex);
    console.log(tabindexField);
  }

  set tabindexRule(tabindex: string) {
    const tabindexField = fieldType(FieldId.tabindexRule, tabindex);
    console.log(tabindexField);
  }

  //13
  set step(step: number) {
    const stepField = fieldType(FieldId.step, step);
    console.log(stepField);
  }

  set stepRule(step: string) {
    const stepField = fieldType(FieldId.stepRule, step);
    console.log(stepField);
  }

  //14
  set pattern(pattern: string | RegExp) {
    const patField = fieldType(FieldId.pattern, pattern);
    console.log(patField);
  }

  //15
  set options(options: string[]) {
    const optField = fieldType(FieldId.options, options);
    console.log(optField);
  }


  //16
  set attributes(attributes: { [key: string]: string | number }) {
    const attrField = fieldType(FieldId.attributes, attributes);
    console.log(attrField);
  }
}
