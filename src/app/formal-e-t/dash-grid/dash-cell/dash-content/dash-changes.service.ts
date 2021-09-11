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

  constructor(
    private fieldRefsStore: FieldRefsStoreService,
    private cursorStore: FormCursorStoreService
  ) {
    this.cursorStore.current.subscribe(cursor => {
      const refs: FieldRefs = this.fieldRefsStore.state[cursor];
      this.label = refs.label;
      this.type = refs.type;
      this.description = refs.description;
      this.placeholder = refs.placeholder;
    })
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

  get stream(): Observable<FieldType> {
    return merge(this.labelStrm, this.descStrm, this.typeStrm, this.placeStrm);
  }

}
