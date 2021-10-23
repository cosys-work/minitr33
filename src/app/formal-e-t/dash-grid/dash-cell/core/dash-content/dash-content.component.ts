import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {AfterContentInit, ChangeDetectionStrategy, Component, ElementRef, ViewChild} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';
import {MatChipInputEvent} from '@angular/material/chips';
import {MatRadioChange} from '@angular/material/radio';
import {BehaviorSubject, Observable, Subscription, takeUntil} from 'rxjs';
import {map, startWith, take} from 'rxjs/operators';

import {AlKeysAlNumVals, FieldId} from "../../../../../shared/field.model";
import {
  allAttributes,
  allOptions,
  allPatterns,
  allTypes,
  OptFields,
  optLabels,
  optState,
  StrFields,
  strLabels,
  strState
} from "../../../../../shared/fields.config";
import {DashChangesService} from "../../../../../store/dash-changes.service";
import {GrafStore} from "../../../../../store/graf-store.service";
import {StatefulnessComponent} from "../../../../../shared/statefulness/statefulness.component";
import {DebounceCandidate} from "../../../../../store/change-getters.service";


@Component({
  selector: 'app-dash-content',
  templateUrl: './dash-content.component.html',
  styleUrls: ['./dash-content.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashContentComponent extends StatefulnessComponent implements AfterContentInit {
  inpControl = new FormControl('', Validators.required);
  selectable = true;
  removable = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];

  allTypes = allTypes;
  allPatterns = allPatterns;
  allOptions = allOptions;
  allAttributes = allAttributes;
  strLabels = strLabels;
  optLabels = optLabels;

  strState = strState;
  strLab = new BehaviorSubject(this.strState.label.label);
  strPlace = new BehaviorSubject(this.strState.label.placeholder);
  strDesc = new BehaviorSubject(this.strState.label.description);

  optState = optState;
  oysterLab = new BehaviorSubject(this.optState.type.label);
  oysterPlace = new BehaviorSubject(this.optState.type.placeholder);
  oysterDesc = new BehaviorSubject(this.optState.type.description);

  typeCtrl = new FormControl();
  patternCtrl = new FormControl();
  optionsCtrl = new FormControl();
  attributesCtrl = new FormControl();

  filteredTypes: Observable<string[]>;
  filteredPatterns: Observable<string[]>;
  filteredOptions: Observable<string[]>;
  filteredAttributes: Observable<string[]>;

  curType = "input,text";
  curOptions = "Opt 1";
  curAttributes = "Attr 1";
  curPattern = "Pat 1";

  @ViewChild('typeInput') typeInput!: ElementRef<HTMLInputElement>;
  @ViewChild('optionsInput') optionsInput!: ElementRef<HTMLInputElement>;
  @ViewChild('maInput') maInput!: ElementRef<HTMLInputElement>;

  subs = new Subscription();

  constructor(private changes: DashChangesService, private grafStore: GrafStore) {
    super();
    this.updateFC();
    this.filteredTypes = this.typeCtrl.valueChanges.pipe(
      startWith(null),
      map((type: string | null) => type ? this._filterType(type) : this.allTypes.slice())
    );

    this.filteredPatterns = this.patternCtrl.valueChanges.pipe(
      startWith(null),
      map((pat: string | null) => pat ? this._filterPattern(pat) : this.allPatterns.slice())
    );

    this.filteredOptions = this.optionsCtrl.valueChanges.pipe(
      startWith(null),
      map((opt: string | null) => opt ? this._filterOptions(opt) : this.allOptions.slice())
    );

    this.filteredAttributes = this.attributesCtrl.valueChanges.pipe(
      startWith(null),
      map((attr: string | null) => attr ? this._filterAttributes(attr) : this.allAttributes.slice())
    );
  }

  ngAfterContentInit() {
    this.grafStore.current.pipe(takeUntil(this.onDestroy$))
      .subscribe(_ => this.updateFC());
  }

  private updateFC() {
    console.log("cursor update triggered");
    const sTurKey = this.strState.current;
    const opTKey = this.optState.current;
    this.updateFCStr(sTurKey);
    this.updateFCOpt(opTKey);
  }

  updateFCStr(current: keyof StrFields) {
    // TODO refactor redundancy
    switch (current) {
      case FieldId.label:
        this.changes.get.labelStream.pipe(take(1)).subscribe(l => {
          if (typeof l === "string") {
            this.maInput.nativeElement.value = l;
          }
        });
        break;
      case FieldId.placeholder:
        this.changes.get.placeholderStream.pipe(take(1)).subscribe(p => {
          if (typeof p === "string") {
            this.maInput.nativeElement.value = p;
          }
        });
        break;
      case FieldId.description:
        this.changes.get.descriptionStream.pipe(take(1)).subscribe(d => {
          if (typeof d === "string") {
            this.maInput.nativeElement.value = d;
          }
        });
        break;
      case FieldId.id:
        this.changes.get.idStream.pipe(take(1)).subscribe(i => {
          if (typeof i === "string") {
            this.maInput.nativeElement.value = i
          }
        });
        break;
      default:
        break;
    }
  }

  updateFCOpt(current: keyof OptFields) {
    const updateFromStream = (l: DebounceCandidate) => {
      if (typeof l === "string") {
        this.optionsInput.nativeElement.value = l;
      }
    }
    switch (current) {
      case FieldId.type:
        this.changes.get.typeStream.pipe((take(1))).subscribe(l =>
          this.typeCtrl.setValue(this.curType = l as string)
        );
        break;
      case FieldId.pattern:
        this.changes.get.patternStream.pipe(take(1)).subscribe(l =>
          updateFromStream(l)
        );
        break;
      case FieldId.options:
        this.changes.get.optionsStream.pipe(take(1)).subscribe(l =>
          updateFromStream(JSON.stringify(l))
        );
        break;
      case FieldId.attributes:
        this.changes.get.attributesStream.pipe(take(1)).subscribe(l =>
          updateFromStream(JSON.stringify(l))
        );
        break;
      default:
        break;
    }
  }

  updateStrLPD() {
    this.strLab.next(this.strState[this.strState.current].label);
    this.strPlace.next(this.strState[this.strState.current].placeholder);
    this.strDesc.next(this.strState[this.strState.current].description);
  }

  selectStrField(event: MatRadioChange) {
    console.log("selected str", event);
    this.strState.current = event.source.value;
    this.updateStrLPD();
    this.updateFCStr(this.strState.current);
  }

  updateOptStrLPD() {
    this.oysterLab.next(this.optState[this.optState.current].label);
    this.oysterPlace.next(this.optState[this.optState.current].placeholder);
    this.oysterDesc.next(this.optState[this.optState.current].description);
  }

  selectOptField(event: MatRadioChange) {
    console.log("selected opt", event);
    this.optState.current = event.source.value;
    this.updateOptStrLPD();
    this.updateFCOpt(this.optState.current);
  }

  onStrFieldDataChange(changed: string) {
    console.log("changed str field data", changed);
    switch (this.strState.current) {
      case FieldId.label:
        this.changes.set.label = changed;
        break;
      case FieldId.description:
        this.changes.set.description = changed;
        break;
      case FieldId.placeholder:
        this.changes.set.placeholder = changed;
        break;
      case FieldId.id:
        this.changes.set.id = changed;
        break;
      default:
        break;
    }
  };


  onTypeChange(changed: string) {
    console.log("changed type", changed);
    this.curType = changed;
    this.typeCtrl.setValue(this.curType);
    this.changes.set.type = changed.toLowerCase();
  };

  onPatternChange(changed: string) {
    this.curPattern = changed;
    this.changes.set.pattern = changed;
  };

  onAttributeChange(changed: string) {
    this.curAttributes = changed;
    const keyVals = changed.split(",").map(csv => csv.split(":"));
    const attrObj: AlKeysAlNumVals = {};
    keyVals.forEach(([k, v]) => attrObj[k] = v);
    this.changes.set.attributes = attrObj;
  };

  onOptionChange(changed: string) {
    this.curOptions = changed;
    this.changes.set.options = changed.split(",");
  };

  addType(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    if (value) {
      this.onTypeChange(value);
    }
    event.chipInput!.clear();
  }

  removeType(): void {
    console.log("type removal triggered");
  }

  selectedType(event: MatAutocompleteSelectedEvent): void {
    this.onTypeChange(event.option.viewValue);
    this.typeInput.nativeElement.value = '';
}

  private _filterType(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.allTypes.filter(type => !type.toLowerCase().includes(filterValue));
  }

  addPattern(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    if (value) {
      this.onPatternChange(value);
    }
    event.chipInput!.clear();
    this.patternCtrl.setValue(null);
  }

  removePattern(): void {
    console.log("pattern removal triggered");
  }

  selectedPattern(event: MatAutocompleteSelectedEvent): void {
    this.onPatternChange(event.option.viewValue);
    this.optionsInput.nativeElement.value = event.option.viewValue;
    this.patternCtrl.setValue(event.option.value);
  }

  private _filterPattern(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.allPatterns.filter(pat => pat.toLowerCase().includes(filterValue));
  }

  addAttributes(event: MatChipInputEvent): void {
    const value = event.value.trim() || '';
    if (value) {
      this.onAttributeChange(value);
    }
    event.chipInput!.clear();
    this.attributesCtrl.setValue(null);
  }

  removeAttributes(): void {
    console.log("attr removal triggered");
  }

  selectedAttributes(event: MatAutocompleteSelectedEvent): void {
    this.onAttributeChange(event.option.viewValue);
    this.optionsInput.nativeElement.value = '';
    this.attributesCtrl.setValue(null);
  }

  private _filterAttributes(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.allAttributes.filter(type => type.toLowerCase().includes(filterValue));
  }

  addOptions(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    if (value) {
      this.onOptionChange(value);
    }
    event.chipInput!.clear();
    this.optionsCtrl.setValue(null);
  }

  removeOptions(): void {
    console.log("options removal triggered");
  }

  selectedOptions(event: MatAutocompleteSelectedEvent): void {
    this.onOptionChange(event.option.viewValue);
    this.optionsInput.nativeElement.value = '';
    this.optionsCtrl.setValue(null);
  }

  private _filterOptions(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.allOptions.filter(opt => opt.toLowerCase().includes(filterValue));
  }
}
