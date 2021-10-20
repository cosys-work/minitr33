import {Injectable} from '@angular/core';
import {Observable, Subject} from "rxjs";
import {FieldValueType} from "../shared/field.model";
import {debounceTime, distinctUntilChanged, filter} from "rxjs/operators";
import {ChangeSettersService} from "./change-setters.service";
import {FormalField, TemplateOptions, Validation} from "../shared/shared.model";

export type DebounceCandidate = FieldValueType | TemplateOptions | Validation | FormalField | FormalField[];

export function debounceObs(bSub: Observable<DebounceCandidate>): Observable <DebounceCandidate > {
  const dummy = (new Subject<DebounceCandidate>()).asObservable;
  return bSub ? bSub.pipe(
    debounceTime(300),
    distinctUntilChanged(),
    filter(v => v !== undefined),
    filter(v => v !== ""),
  ) : dummy();
}

@Injectable({
  providedIn: 'root'
})
export class ChangeGettersService {

  constructor(private cs: ChangeSettersService) { }


  get labelStream() {
    return debounceObs(this.cs.labelChanges);
  }

  get typeStream() {
    return debounceObs(this.cs.typeChanges);
  }

  get descriptionStream() {
    return debounceObs(this.cs.descriptionChanges);
  }

  get placeholderStream() {
    return debounceObs(this.cs.placeholderChanges);
  }



  get idStream() {
    return debounceObs(this.cs.idChanges);
  }

  get optionsStream() {
    return debounceObs(this.cs.optsChanges);
  }

  get patternStream() {
    return debounceObs(this.cs.patternChanges);
  }

  get attributesStream() {
    return debounceObs(this.cs.attrsChanges);
  }



  get tabindexStream() {
    return debounceObs(this.cs.tabindexChanges);
  }

  get stepStream() {
    return debounceObs(this.cs.stepChanges);
  }

  get maxStream() {
    return debounceObs(this.cs.maxChanges);
  }

  get minStream() {
    return debounceObs(this.cs.minChanges);
  }



  get requiredStream() {
    return debounceObs(this.cs.requiredChanges);
  }

  get disabledStream() {
    return debounceObs(this.cs.disabledChanges);
  }

  get hiddenStream() {
    return debounceObs(this.cs.hiddenChanges);
  }

  get readonlyStream() {
    return debounceObs(this.cs.readonlyChanges);
  }


  get requiredRuleStream() {
    return debounceObs(this.cs.requiredRuleChanges);
  }

  get disabledRuleStream() {
    return debounceObs(this.cs.disabledRuleChanges);
  }

  get hiddenRuleStream() {
    return debounceObs(this.cs.hiddenRuleChanges);
  }

  get readonlyRuleStream() {
    return debounceObs(this.cs.readonlyRuleChanges);
  }


  get tabindexRuleStream() {
    return debounceObs(this.cs.tabindexRuleChanges);
  }

  get stepRuleStream() {
    return debounceObs(this.cs.stepRuleChanges);
  }

  get maxRuleStream() {
    return debounceObs(this.cs.maxRuleChanges);
  }

  get minRuleStream() {
    return debounceObs(this.cs.minRuleChanges);
  }
}
