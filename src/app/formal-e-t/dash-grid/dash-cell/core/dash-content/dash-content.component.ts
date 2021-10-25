import {AfterContentInit, ChangeDetectionStrategy, Component, ElementRef, ViewChild} from '@angular/core';
import {FormControl} from '@angular/forms';
import {MatRadioChange} from '@angular/material/radio';
import {BehaviorSubject, Observable, takeUntil, zip} from 'rxjs';
import {map, startWith, take} from 'rxjs/operators';

import {FieldId} from "../../../../../shared/field.model";
import {
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
import {MatSelectChange} from "@angular/material/select";


@Component({
  selector: 'app-dash-content',
  templateUrl: './dash-content.component.html',
  styleUrls: ['./dash-content.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashContentComponent extends StatefulnessComponent implements AfterContentInit {

  allTypes = allTypes;
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
  optionsCtrl = new FormControl();
  filteredTypes: Observable<string[]>;
  curType = "input,text";

  @ViewChild('optionsInput') optionsInput!: ElementRef<HTMLInputElement>;
  @ViewChild('maInput') maInput!: ElementRef<HTMLInputElement>;

  constructor(private changes: DashChangesService, private grafStore: GrafStore) {
    super();
    this.updateFC();
    this.filteredTypes = this.typeCtrl.valueChanges.pipe(
      startWith(null),
      map((type: string | null) => type ? this._filterType(type) : this.allTypes.slice())
    );
  }

  ngAfterContentInit() {
    this.grafStore.current.pipe(takeUntil(this.onDestroy$))
      .subscribe(_ => this.updateFC());
  }

  private updateFC() {
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
        zip(
          this.changes.get.coreTypeStream,
          this.changes.get.typeStream
        ).pipe((take(1))).subscribe(([c, s]) => {
          this.curType = s ? `${c},${s}` : `${c}`;
          console.log("curTypes", this.curType);
          this.typeCtrl.setValue(this.curType)
        });
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
    this.optState.current = event.source.value;
    this.updateOptStrLPD();
    this.updateFCOpt(this.optState.current);
  }

  onStrFieldDataChange(changed: string) {
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

  typeChangeHandler(changed: string) {
    const [coreType, subType] = changed.split(",");
    this.curType = changed;
    this.typeCtrl.setValue(this.curType);
    this.changes.set.coreType = coreType;
    if (subType) this.changes.set.type = subType;
  }

  onTypeChange(changed: MatSelectChange) {
    this.typeChangeHandler(changed.value);
  };

  private _filterType(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.allTypes.filter(type => !type.toLowerCase().includes(filterValue));
  }
}
