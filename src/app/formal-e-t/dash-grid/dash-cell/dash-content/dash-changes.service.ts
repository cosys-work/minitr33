import { Injectable } from '@angular/core';
import { BehaviorSubject, merge, Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter } from 'rxjs/operators';

export enum FieldId {
  label = "label",
  type = "type",
  description = "description",
  placeholder = "placeholder"
}

export interface FieldType {
  id: FieldId;
  value: string;
}

export const fieldType: (id: FieldId, value: string) => FieldType 
  = (id: FieldId, value: string) => ({id, value});

@Injectable({
  providedIn: 'root'
})
export class DashChangesService {

  private labelChanges = new BehaviorSubject<FieldType>(fieldType(FieldId.label, ""));
  private typeChanges = new BehaviorSubject<FieldType>(fieldType(FieldId.type, ""));
  private descChanges = new BehaviorSubject<FieldType>(fieldType(FieldId.description, ""));
  private placeChanges = new BehaviorSubject<FieldType>(fieldType(FieldId.placeholder, ""));

  set label(label: string) {
    this.labelChanges.next(fieldType(FieldId.label, label));
  }

  set type(type: string) {
    this.typeChanges.next(fieldType(FieldId.type, type));
  }

  set description(description: string) {
    this.descChanges.next(fieldType(FieldId.description, description));
  }

  set placeholder(placeholder: string) {
    this.placeChanges.next(fieldType(FieldId.placeholder, placeholder));
  }

  private debounceObs(bSub: BehaviorSubject<FieldType>): Observable<FieldType> {
    return bSub.pipe(
      filter(v => v.value !== ""),
      debounceTime(300),
      distinctUntilChanged()
    );
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

  get stream() {
    return merge(this.labelStrm, this.descStrm, this.typeStrm, this.placeStrm);
  }

}
