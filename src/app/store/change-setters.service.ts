import {Injectable} from '@angular/core';
import {FieldId, FieldRefsAddons} from "../shared/field.model";
import {GrafStore} from "./graf-store.service";
import {map} from "rxjs/operators";
import {FormalField, TemplateOptions, Validation} from "../shared/shared.model";

@Injectable({
  providedIn: 'root'
})
export class ChangeSettersService {

  rxt = this.graf.stateChanged;

  fielder(tmpl: keyof FormalField) {
    return this.rxt.pipe(map(z => z.nodes[z.curNode].field[tmpl]));
  }

  valor(rule: keyof FieldRefsAddons) {
    return this.rxt.pipe(map(z => z.nodes[z.curNode].field.validation[rule]))
  }

  templar(opt: keyof TemplateOptions) {
    return this.rxt.pipe(map(z => z.nodes[z.curNode].field.templateOptions[opt]));
  }

  nameChanges = this.rxt.pipe(map(z => z.curName));

  labelChanges = this.templar(FieldId.label);
  descriptionChanges = this.templar(FieldId.description);
  placeholderChanges = this.templar(FieldId.placeholder);

  coreTypeChanges = this.fielder(FieldId.type);
  typeChanges = this.templar(FieldId.type);

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

  private updateFieldTOpts(templateOptions: TemplateOptions) {
    const oldField: FormalField = this.graf.curField;
    const newField: FormalField = {...oldField, templateOptions};
    this.graf.updateNode(newField);
  }

  private updateFieldVal(validation: Validation) {
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

  set coreType(type: string) {
    const oldField: FormalField = this.graf.curField;
    const newField: FormalField = {...oldField, type};
    this.graf.updateNode(newField);
  }

  //5
  set id(id: string) {
    const oldField: FormalField = this.graf.curField;
    const newField: FormalField = {...oldField, id};
    this.graf.updateNode(newField);
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

  set disabledRule(disabledRule: string) {
    const oldV: Validation = this.graf.curValidation;
    const validation: Validation = {...oldV, disabledRule};
    this.updateFieldVal(validation);
  }

  //10
  set hidden(hidden: boolean) {
    const oldTOpt: TemplateOptions = this.graf.curTemplateOptions;
    const templateOptions: TemplateOptions = {...oldTOpt, hidden};
    this.updateFieldTOpts(templateOptions);
  }

  set hiddenRule(hiddenRule: string) {
    const oldV: Validation = this.graf.curValidation;
    const validation: Validation = {...oldV, hiddenRule};
    this.updateFieldVal(validation);
  }

  //11
  set readonly(readonly: boolean) {
    const oldTOpt: TemplateOptions = this.graf.curTemplateOptions;
    const templateOptions: TemplateOptions = {...oldTOpt, readonly};
    this.updateFieldTOpts(templateOptions);
  }

  set readonlyRule(readonlyRule: string) {
    const oldV: Validation = this.graf.curValidation;
    const validation: Validation = {...oldV, readonlyRule};
    this.updateFieldVal(validation);
  }

  //12
  set tabindex(tabindex: number) {
    const oldTOpt: TemplateOptions = this.graf.curTemplateOptions;
    const templateOptions: TemplateOptions = {...oldTOpt, tabindex};
    this.updateFieldTOpts(templateOptions);
  }

  set tabindexRule(tabindexRule: string) {
    const oldV: Validation = this.graf.curValidation;
    const validation: Validation = {...oldV, tabindexRule};
    this.updateFieldVal(validation);
  }

  //13
  set step(step: number) {
    const oldTOpt: TemplateOptions = this.graf.curTemplateOptions;
    const templateOptions: TemplateOptions = {...oldTOpt, step};
    this.updateFieldTOpts(templateOptions);
  }

  set stepRule(stepRule: string) {
    const oldV: Validation = this.graf.curValidation;
    const validation: Validation = {...oldV, stepRule};
    this.updateFieldVal(validation);
  }

  //14
  set pattern(pattern: string | RegExp) {
    const oldTOpt: TemplateOptions = this.graf.curTemplateOptions;
    const templateOptions: TemplateOptions = {...oldTOpt, pattern};
    this.updateFieldTOpts(templateOptions);
  }

  //15
  set options(options: string[]) {
    const oldTOpt: TemplateOptions = this.graf.curTemplateOptions;
    const templateOptions: TemplateOptions = {...oldTOpt, options};
    this.updateFieldTOpts(templateOptions);
  }


  //16
  set attributes(attributes: { [key: string]: string | number }) {
    const oldTOpt: TemplateOptions = this.graf.curTemplateOptions;
    const templateOptions: TemplateOptions = {...oldTOpt, attributes};
    this.updateFieldTOpts(templateOptions);
  }
}
