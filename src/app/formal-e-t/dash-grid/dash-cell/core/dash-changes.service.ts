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
  private idChanges!: BehaviorSubject<FieldType>

  private tr8Changes!: BehaviorSubject<FieldType>;
  private relChanges!: BehaviorSubject<FieldType>;
  private minChanges!: BehaviorSubject<FieldType>;
  private maxChanges!: BehaviorSubject<FieldType>;


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
        }
    }});
  }

  set traits(traits: string) {
    const traitField = fieldType(FieldId.traits, traits);
    this.tr8Changes ? this.tr8Changes.next(traitField) : this.tr8Changes = new BehaviorSubject(traitField);
  }

  get traits(): string {
    return this.labelChanges.value.value;
  }

  set relations(relations: string) {
    const relField = fieldType(FieldId.relations, relations);
    this.relChanges ? this.relChanges.next(relField) : this.relChanges = new BehaviorSubject(relField);
  }

  get relations(): string {
    return this.relChanges.value.value;
  }

  set max(max: string) {
    const maxField = fieldType(FieldId.max, max);
    this.maxChanges ? this.maxChanges.next(maxField): this.maxChanges = new BehaviorSubject(maxField);
  }

  get max(): string {
    return this.maxChanges.value.value;
  }

  set min(min: string) {
    const minField = fieldType(FieldId.min, min);
    this.minChanges ? this.minChanges.next(minField): this.minChanges = new BehaviorSubject(minField);
  }

  get min(): string {
    return this.minChanges.value.value;
  }

  set label(label: string) {
    const labelField = fieldType(FieldId.label, label);
    this.labelChanges ? this.labelChanges.next(labelField) : this.labelChanges = new BehaviorSubject(labelField);
  }

  get label(): string {
    return this.labelChanges.value.value;
  }

  set type(type: string) {
    const typeField = fieldType(FieldId.type, type);
    this.typeChanges ? this.typeChanges.next(typeField) : this.typeChanges = new BehaviorSubject(typeField);
  }

  get type(): string {
    return this.typeChanges.value.value;
  }

  get id(): string {
    return this.idChanges.value.value;
  }

  set id(id: string) {
    const idField = fieldType(FieldId.id, id);
    this.descChanges ? this.descChanges.next(idField) : this.descChanges = new BehaviorSubject(idField);
  }

  set description(description: string) {
    const descField = fieldType(FieldId.description, description);
    this.descChanges ? this.descChanges.next(descField) : this.descChanges = new BehaviorSubject(descField);
  }

  get description(): string {
    return this.descChanges.value.value;
  }

  set placeholder(placeholder: string) {
    const placeField = fieldType(FieldId.placeholder, placeholder);
    this.placeChanges ? this.placeChanges.next(placeField) : this.placeChanges = new BehaviorSubject(placeField);
  }

  get placeholder(): string {
    return this.placeChanges.value.value;
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

  get tr8sStrm() {
    return this.debounceObs(this.tr8Changes);
  }

  get relsStrm() {
    return this.debounceObs(this.relChanges);
  }

  get stream(): Observable<FieldType> {
    return merge(
      this.labelStrm, 
      this.descStrm, 
      this.typeStrm, 
      this.placeStrm,
      this.maxStrm,
      this.minStrm,
      this.tr8sStrm
    );
  }

}
