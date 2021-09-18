import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, ReplaySubject, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter } from 'rxjs/operators';
import { FieldId, FieldRefs, fieldType, FieldType } from 'src/app/shared/field.model';
import { FieldRefsStoreService } from 'src/app/store/field-refs-store.service';
import { FormCursorStoreService } from 'src/app/store/form-cursor-store.service';

@Injectable({
  providedIn: 'root'
})
export class DashChangesService {

  private labelChanges = new ReplaySubject<FieldType>(1);
  private typeChanges = new ReplaySubject<FieldType>(1);
  private descChanges = new ReplaySubject<FieldType>(1);
  private placeChanges = new ReplaySubject<FieldType>(1);
  private idChanges = new ReplaySubject<FieldType>(1);
  private optsChanges = new ReplaySubject<FieldType>(1);
  private attrsChanges = new ReplaySubject<FieldType>(1);
  private patternChanges = new ReplaySubject<FieldType>(1);

  private minChanges = new ReplaySubject<FieldType>(1);
  private maxChanges = new ReplaySubject<FieldType>(1);
  private requiredChanges = new ReplaySubject<FieldType>(1);
  private disabledChanges = new ReplaySubject<FieldType>(1);
  private hiddenChanges = new ReplaySubject<FieldType>(1);
  private readonlyChanges = new ReplaySubject<FieldType>(1);
  private tabindexChanges = new ReplaySubject<FieldType>(1);
  private stepChanges = new ReplaySubject<FieldType>(1);

  private minRuleChanges = new ReplaySubject<FieldType>(1);
  private maxRuleChanges = new ReplaySubject<FieldType>(1);
  private requiredRuleChanges = new ReplaySubject<FieldType>(1);
  private disabledRuleChanges = new ReplaySubject<FieldType>(1);
  private hiddenRuleChanges = new ReplaySubject<FieldType>(1);
  private readonlyRuleChanges = new ReplaySubject<FieldType>(1);
  private tabindexRuleChanges = new ReplaySubject<FieldType>(1);
  private stepRuleChanges = new ReplaySubject<FieldType>(1);

  constructor(
    private fieldRefsStore: FieldRefsStoreService,
    private cursorStore: FormCursorStoreService
  ) {
    this.cursorStore.current.subscribe(cursor => {
      if (cursor >= 0 && cursor <= this.fieldRefsStore.state.length) {
        const refs: FieldRefs = this.fieldRefsStore.state[cursor];
        if (refs) {        
          this.label = refs.label;
          this.type = refs.type;
          this.description = refs.description;
          this.placeholder = refs.placeholder;
        
          this.id = refs.id;
          this.options = refs.options;
          this.attributes = refs.attributes;
          this.pattern  = refs.pattern;

          this.required = refs.required;
          this.disabled = refs.disabled;
          this.hidden = refs.hidden;
          this.readonly = refs.readonly;
          
          this.tabindex = refs.tabindex;
          this.max = refs.maximum;
          this.min = refs.minimum;
          this.step = refs.step;
        }
    }});
  }

  //1
  set max(max: number) {
    const maxField = fieldType(FieldId.max, max);
    this.maxChanges.next(maxField);
  }


  set maxRule(max: string) {
    const maxField = fieldType(FieldId.max, max);
    this.maxRuleChanges.next(maxField);
  }

  //2
  set min(min: number) {
    const minField = fieldType(FieldId.min, min);
    this.minChanges.next(minField);
  }

  set minRule(min: string) {
    const minField = fieldType(FieldId.min, min);
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
    const readonlyField = fieldType(FieldId.readonly, readonly);
    this.readonlyRuleChanges.next(readonlyField);
  }

  //12
  set tabindex(tabindex: number) {
    const tabindexField = fieldType(FieldId.tabindex, tabindex);
    this.tabindexChanges.next(tabindexField);
  }

  set tabindexRule(tabindex: string) {
    const tabindexField = fieldType(FieldId.tabindex, tabindex);
    this.tabindexRuleChanges.next(tabindexField);
  }

  //13
  set step(step: number) {
    const stepField = fieldType(FieldId.step, step);
    this.stepChanges.next(stepField);
  }

  set stepRule(step: string) {
    const stepField = fieldType(FieldId.step, step);
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
  set attributes(attributes:  { [key: string]: string | number }) {
    const attrField = fieldType(FieldId.options, attributes);
    this.optsChanges.next(attrField);
  }


  private debounceObs(bSub: Observable<FieldType>): Observable<FieldType> {
    const dummy = (new Subject<FieldType>()).asObservable;
    return bSub ? bSub.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      filter(v => v.value !== ""),
    ) : dummy();
  }

  get labelStrm() {
    return this.debounceObs(this.labelChanges);
  }

  get typeStrm() {
    return this.debounceObs(this.typeChanges);
  }

  get descStrm() {
    return this.debounceObs(this.descChanges);
  }

  get placeStrm() {
    return this.debounceObs(this.placeChanges);
  }

  get maxStrm() {
    return this.debounceObs(this.maxChanges.pipe(filter(v => v.value !== 0)));
  }

  get minStrm() {
    return this.debounceObs(this.minChanges.pipe(filter(v => v.value !== 0)));
  }

  get idStrm() {
    return this.debounceObs(this.idChanges);
  }

  get optionsStrm() {
    return this.debounceObs(this.optsChanges);
  }
  
  get patternStrm() {
    return this.debounceObs(this.patternChanges);
  }
  
  get attributesStrm() {
    return this.debounceObs(this.attrsChanges);
  }
  
  get requiredStrm() {
    return this.debounceObs(this.requiredChanges.pipe(filter(v => v.value == 'true' )));
  }

  get disabledStrm() {
    return this.debounceObs(this.disabledChanges.pipe(filter(v => v.value == 'true' )));
  }

  get hiddenStrm() {
    return this.debounceObs(this.hiddenChanges.pipe(filter(v => v.value == 'true' )));
  }
  
  get readonlyStrm() {
    return this.debounceObs(this.readonlyChanges.pipe(filter(v => v.value == 'true' )));
  }
  
  get tabindexStrm() {
    return this.debounceObs(this.tabindexChanges.pipe(filter(v => v.value !== 0)));
  }

  get stepStrm() {
    return this.debounceObs(this.stepChanges.pipe(filter(v => v.value !== 0)));
  }
}
