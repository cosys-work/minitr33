import {Injectable} from '@angular/core';
import {FieldId, FieldType, fieldType} from "../shared/field.model";
import {ReplaySubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ChangeSettersService {

  labelChanges = new ReplaySubject<FieldType>(1);
  typeChanges = new ReplaySubject<FieldType>(1);
  descChanges = new ReplaySubject<FieldType>(1);
  placeChanges = new ReplaySubject<FieldType>(1);

  idChanges = new ReplaySubject<FieldType>(1);
  optsChanges = new ReplaySubject<FieldType>(1);
  attrsChanges = new ReplaySubject<FieldType>(1);
  patternChanges = new ReplaySubject<FieldType>(1);

  minChanges = new ReplaySubject<FieldType>(1);
  maxChanges = new ReplaySubject<FieldType>(1);
  tabindexChanges = new ReplaySubject<FieldType>(1);
  stepChanges = new ReplaySubject<FieldType>(1);

  requiredChanges = new ReplaySubject<FieldType>(1);
  disabledChanges = new ReplaySubject<FieldType>(1);
  hiddenChanges = new ReplaySubject<FieldType>(1);
  readonlyChanges = new ReplaySubject<FieldType>(1);

  minRuleChanges = new ReplaySubject<FieldType>(1);
  maxRuleChanges = new ReplaySubject<FieldType>(1);
  tabindexRuleChanges = new ReplaySubject<FieldType>(1);
  stepRuleChanges = new ReplaySubject<FieldType>(1);

  requiredRuleChanges = new ReplaySubject<FieldType>(1);
  disabledRuleChanges = new ReplaySubject<FieldType>(1);
  hiddenRuleChanges = new ReplaySubject<FieldType>(1);
  readonlyRuleChanges = new ReplaySubject<FieldType>(1);

  //1
  set max(max: number) {
    const maxField = fieldType(FieldId.max, max);
    this.maxChanges.next(maxField);
  }


  set maxRule(max: string) {
    const maxField = fieldType(FieldId.maxRule, max);
    this.maxRuleChanges.next(maxField);
  }

  //2
  set min(min: number) {
    const minField = fieldType(FieldId.min, min);
    this.minChanges.next(minField);
  }

  set minRule(min: string) {
    const minField = fieldType(FieldId.minRule, min);
    this.minRuleChanges.next(minField);
  }

  //3
  set label(label: string) {
    console.log("label called", label);
    const labelField = fieldType(FieldId.label, label);
    this.labelChanges.next(labelField);
  }

  //4
  set type(type: string) {
    const typeField = fieldType(FieldId.type, type);
    this.typeChanges.next(typeField);
  }

  //5
  set id(id: string) {
    const idField = fieldType(FieldId.id, id);
    this.idChanges.next(idField);
  }

  //6
  set description(description: string) {
    const descField = fieldType(FieldId.description, description);
    this.descChanges.next(descField);
  }

  //7
  set placeholder(placeholder: string) {
    const placeField = fieldType(FieldId.placeholder, placeholder);
    this.placeChanges.next(placeField);
  }

  //8
  set required(required: boolean) {
    const requiredField = fieldType(FieldId.required, required);
    this.requiredChanges.next(requiredField);
  }

  set requiredRule(required: string) {
    const requiredField = fieldType(FieldId.requiredRule, required);
    this.requiredRuleChanges.next(requiredField);
  }

  //9
  set disabled(disabled: boolean) {
    const disField = fieldType(FieldId.disabled, disabled);
    this.disabledChanges.next(disField);
  }

  set disabledRule(disabled: string) {
    const disField = fieldType(FieldId.disabledRule, disabled);
    this.disabledRuleChanges.next(disField);
  }

  //10
  set hidden(hidden: boolean) {
    const hideField = fieldType(FieldId.hidden, hidden);
    this.hiddenChanges.next(hideField);
  }

  set hiddenRule(hidden: string) {
    const hideField = fieldType(FieldId.hiddenRule, hidden);
    this.hiddenRuleChanges.next(hideField);
  }

  //11
  set readonly(readonly: boolean) {
    const readonlyField = fieldType(FieldId.readonly, readonly);
    this.readonlyChanges.next(readonlyField);
  }

  set readonlyRule(readonly: string) {
    const readonlyField = fieldType(FieldId.readonlyRule, readonly);
    this.readonlyRuleChanges.next(readonlyField);
  }

  //12
  set tabindex(tabindex: number) {
    const tabindexField = fieldType(FieldId.tabindex, tabindex);
    this.tabindexChanges.next(tabindexField);
  }

  set tabindexRule(tabindex: string) {
    const tabindexField = fieldType(FieldId.tabindexRule, tabindex);
    this.tabindexRuleChanges.next(tabindexField);
  }

  //13
  set step(step: number) {
    const stepField = fieldType(FieldId.step, step);
    this.stepChanges.next(stepField);
  }

  set stepRule(step: string) {
    const stepField = fieldType(FieldId.stepRule, step);
    this.stepRuleChanges.next(stepField);
  }

  //14
  set pattern(pattern: string | RegExp) {
    const patField = fieldType(FieldId.pattern, pattern);
    this.patternChanges.next(patField);
  }

  //15
  set options(options: string[]) {
    const optField = fieldType(FieldId.options, options);
    this.optsChanges.next(optField);
  }


  //16
  set attributes(attributes: { [key: string]: string | number }) {
    const attrField = fieldType(FieldId.attributes, attributes);
    this.attrsChanges.next(attrField);
  }
}
