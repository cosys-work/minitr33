import { Injectable } from '@angular/core';
import { BehaviorSubject, merge, Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter } from 'rxjs/operators';
import { FieldId, FieldRefs, fieldType, FieldType } from 'src/app/shared/field.model';
import { FieldRefsStoreService } from 'src/app/store/field-refs-store.service';
import { FormCursorStoreService } from 'src/app/store/form-cursor-store.service';

@Injectable({
  providedIn: 'root'
})
export class DashChangesService {

  private labelChanges!: BehaviorSubject<FieldType>;
  private typeChanges!: BehaviorSubject<FieldType>;
  private descChanges!: BehaviorSubject<FieldType>;
  private placeChanges!: BehaviorSubject<FieldType>;
  private idChanges!: BehaviorSubject<FieldType>;
  private optsChanges!: BehaviorSubject<FieldType>;
  private attrsChanges!: BehaviorSubject<FieldType>;
  private patternChanges!: BehaviorSubject<FieldType>;

  private minChanges!: BehaviorSubject<FieldType>;
  private maxChanges!: BehaviorSubject<FieldType>;
  private requiredChanges!: BehaviorSubject<FieldType>;
  private disabledChanges!: BehaviorSubject<FieldType>;
  private hiddenChanges!: BehaviorSubject<FieldType>;
  private readonlyChanges!: BehaviorSubject<FieldType>;
  private tabindexChanges!: BehaviorSubject<FieldType>;
  private stepChanges!: BehaviorSubject<FieldType>;

  private minRuleChanges!: BehaviorSubject<FieldType>;
  private maxRuleChanges!: BehaviorSubject<FieldType>;
  private requiredRuleChanges!: BehaviorSubject<FieldType>;
  private disabledRuleChanges!: BehaviorSubject<FieldType>;
  private hiddenRuleChanges!: BehaviorSubject<FieldType>;
  private readonlyRuleChanges!: BehaviorSubject<FieldType>;
  private tabindexRuleChanges!: BehaviorSubject<FieldType>;
  private stepRuleChanges!: BehaviorSubject<FieldType>;

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
    this.maxChanges ? this.maxChanges.next(maxField): this.maxChanges = new BehaviorSubject(maxField);
  }

  get max(): number {
    return this.maxChanges.value.value;
  }

  set maxRule(max: string) {
    const maxField = fieldType(FieldId.max, max);
    this.maxRuleChanges ? this.maxRuleChanges.next(maxField): this.maxRuleChanges = new BehaviorSubject(maxField);
  }

  get maxRule(): string {
    return this.maxRuleChanges.value.value;
  }

  //2
  set min(min: number) {
    const minField = fieldType(FieldId.min, min);
    this.minChanges ? this.minChanges.next(minField): this.minChanges = new BehaviorSubject(minField);
  }

  get min(): number {
    return this.minChanges.value.value;
  }

  set minRule(min: string) {
    const minField = fieldType(FieldId.min, min);
    this.minRuleChanges ? this.minRuleChanges.next(minField): this.minRuleChanges = new BehaviorSubject(minField);
  }

  get minRule(): string {
    return this.minRuleChanges.value.value;
  }

  //3
  set label(label: string) {
    const labelField = fieldType(FieldId.label, label);
    this.labelChanges ? this.labelChanges.next(labelField) : this.labelChanges = new BehaviorSubject(labelField);
  }

  get label(): string {
    return this.labelChanges.value.value;
  }

  //4
  set type(type: string) {
    const typeField = fieldType(FieldId.type, type);
    this.typeChanges ? this.typeChanges.next(typeField) : this.typeChanges = new BehaviorSubject(typeField);
  }

  get type(): string {
    return this.typeChanges.value.value;
  }

  //5
  set id(id: string) {
    const idField = fieldType(FieldId.id, id);
    this.idChanges ? this.idChanges.next(idField) : this.idChanges = new BehaviorSubject(idField);
  }

  get id(): string {
    return this.idChanges.value.value.toString();
  }

  //6
  set description(description: string) {
    const descField = fieldType(FieldId.description, description);
    this.descChanges ? this.descChanges.next(descField) : this.descChanges = new BehaviorSubject(descField);
  }

  get description(): string {
    return this.descChanges.value.value;
  }

  //7
  set placeholder(placeholder: string) {
    const placeField = fieldType(FieldId.placeholder, placeholder);
    this.placeChanges ? this.placeChanges.next(placeField) : this.placeChanges = new BehaviorSubject(placeField);
  }

  get placeholder(): string {
    return this.placeChanges.value.value;
  }

  //8
  set required(required: boolean) {
    const requiredField = fieldType(FieldId.required, required);
    this.requiredChanges ? this.requiredChanges.next(requiredField): this.requiredChanges = new BehaviorSubject(requiredField);
  }

  get required(): boolean {
    return this.requiredChanges.value.value;
  }

  set requiredRule(required: string) {
    const requiredField = fieldType(FieldId.required, required);
    this.requiredRuleChanges ? this.requiredRuleChanges.next(requiredField): this.requiredRuleChanges = new BehaviorSubject(requiredField);
  }

  get requiredRule(): string {
    return this.requiredRuleChanges.value.value;
  }

  //9
  set disabled(disabled: boolean) {
    const disField = fieldType(FieldId.disabled, disabled);
    this.disabledChanges ? this.disabledChanges.next(disField): this.disabledChanges = new BehaviorSubject(disField);
  }

  get disabled(): boolean {
    return this.disabledChanges.value.value;
  }

  set disabledRule(disabled: string) {
    const disField = fieldType(FieldId.disabled, disabled);
    this.disabledRuleChanges ? this.disabledRuleChanges.next(disField): this.disabledRuleChanges = new BehaviorSubject(disField);
  }

  get disabledRule(): string {
    return this.disabledRuleChanges.value.value;
  }

  //10
  set hidden(hidden: boolean) {
    const hideField = fieldType(FieldId.max, hidden);
    this.hiddenChanges ? this.hiddenChanges.next(hideField): this.hiddenChanges = new BehaviorSubject(hideField);
  }

  get hidden(): boolean {
    return this.hiddenChanges.value.value;
  }

  set hiddenRule(hidden: string) {
    const hideField = fieldType(FieldId.max, hidden);
    this.hiddenRuleChanges ? this.hiddenRuleChanges.next(hideField): this.hiddenRuleChanges = new BehaviorSubject(hideField);
  }

  get hiddenRule(): string {
    return this.hiddenRuleChanges.value.value;
  }

  //11
  set readonly(readonly: boolean) {
    const readonlyField = fieldType(FieldId.readonly, readonly);
    this.readonlyChanges ? this.readonlyChanges.next(readonlyField): this.readonlyChanges = new BehaviorSubject(readonlyField);
  }

  get readonly(): boolean {
    return this.readonlyChanges.value.value;
  }

  set readonlyRule(readonly: string) {
    const readonlyField = fieldType(FieldId.readonly, readonly);
    this.readonlyRuleChanges ? this.readonlyRuleChanges.next(readonlyField): this.readonlyRuleChanges = new BehaviorSubject(readonlyField);
  }

  get readonlyRule(): string {
    return this.readonlyRuleChanges.value.value;
  }


  //12
  set tabindex(tabindex: number) {
    const tabindexField = fieldType(FieldId.tabindex, tabindex);
    this.tabindexChanges ? this.tabindexChanges.next(tabindexField): this.tabindexChanges = new BehaviorSubject(tabindexField);
  }

  get tabindex(): number {
    return this.tabindexChanges.value.value;
  }

  set tabindexRule(tabindex: string) {
    const tabindexField = fieldType(FieldId.tabindex, tabindex);
    this.tabindexRuleChanges ? this.tabindexRuleChanges.next(tabindexField): this.tabindexRuleChanges = new BehaviorSubject(tabindexField);
  }

  get tabindexRule(): string {
    return this.tabindexRuleChanges.value.value;
  }

  //13
  set step(step: number) {
    const stepField = fieldType(FieldId.step, step);
    this.stepChanges ? this.stepChanges.next(stepField): this.stepChanges = new BehaviorSubject(stepField);
  }

  get step(): number {
    return this.stepChanges.value.value;
  }

  set stepRule(step: string) {
    const stepField = fieldType(FieldId.step, step);
    this.stepRuleChanges ? this.stepRuleChanges.next(stepField): this.stepRuleChanges = new BehaviorSubject(stepField);
  }

  get stepRule(): string {
    return this.stepRuleChanges.value.value;
  }

  //14
  set pattern(pattern: string | RegExp) {
    const patField = fieldType(FieldId.pattern, pattern);
    this.patternChanges ? this.patternChanges.next(patField): this.patternChanges = new BehaviorSubject(patField);
  }

  get pattern() {
    return this.patternChanges.value.value;
  }

  //15
  set options(options: string[]) {
    const optField = fieldType(FieldId.options, options);
    this.optsChanges ? this.optsChanges.next(optField): this.optsChanges = new BehaviorSubject(optField);
  }

  get options() {
    return this.optsChanges.value.value;
  }

  //16 
  set attributes(attributes:  { [key: string]: string | number }) {
    const attrField = fieldType(FieldId.options, attributes);
    this.attrsChanges ? this.optsChanges.next(attrField): this.attrsChanges = new BehaviorSubject(attrField);
  }

  get attributes():  { [key: string]: string | number } {
    return this.attrsChanges.value.value;
  }


  private debounceObs(bSub: BehaviorSubject<FieldType>): Observable<FieldType> {
    const dummy = (new Subject<FieldType>()).asObservable;
    return bSub ? bSub.pipe(
      filter(v => v.value !== ""),
      debounceTime(300),
      distinctUntilChanged()
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
    return this.debounceObs(this.maxChanges);
  }

  get minStrm() {
    return this.debounceObs(this.minChanges);
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
    return this.debounceObs(this.requiredChanges);
  }

  get disabledStrm() {
    return this.debounceObs(this.disabledChanges);
  }

  get hiddenStrm() {
    return this.debounceObs(this.hiddenChanges);
  }
  
  get readonlyStrm() {
    return this.debounceObs(this.readonlyChanges);
  }
  
  get tabindexStrm() {
    return this.debounceObs(this.tabindexChanges);
  }

  get stepStrm() {
    return this.debounceObs(this.stepChanges);
  }

  get stream(): Observable<FieldType> {
    return merge(
      this.labelStrm, //1
      this.descStrm, //2
      this.typeStrm, //3
      this.placeStrm, //4
      this.maxStrm, //5
      this.minStrm, //6
      this.stepStrm, //7
      this.tabindexStrm, //8
      this.readonlyStrm, //9
      this.hiddenStrm, //10
      this.disabledStrm, //11
      this.requiredStrm, //12
      this.attributesStrm, //13
      this.patternStrm, //14
      this.optionsStrm, //15
      this.idStrm //16
    );
  }

}
