import {ChangeDetectionStrategy, Component, ElementRef, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {MatRadioChange} from '@angular/material/radio';
import {MatSlideToggleChange} from '@angular/material/slide-toggle';
import {BehaviorSubject, Observable} from 'rxjs';
import {take} from 'rxjs/operators';

import {FieldId} from "../../../../../shared/field.model";
import {
  booLabels,
  booState,
  BooTyped,
  isNumTyped,
  numLabels,
  numState,
  NumTyped
} from "../../../../../shared/fields.config";
import {DashChangesService} from "../../../../../store/dash-changes.service";
import {DebounceCandidate} from "../../../../../store/change-getters.service";

@Component({
  selector: 'app-dash-logic',
  templateUrl: './dash-logic.component.html',
  styleUrls: ['./dash-logic.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashLogicComponent {

  keyCtrl = new FormControl();

  numState = numState;
  booState = booState;

  strLab = new BehaviorSubject(this.numState.tabindex.label);
  strPlace = new BehaviorSubject(this.numState.tabindex.placeholder);
  strDesc = new BehaviorSubject(this.numState.tabindex.description);

  booLabels = booLabels;
  numLabels = numLabels;

  booStrLab = new BehaviorSubject(this.booState.required.label);
  booStrPlace = new BehaviorSubject(this.booState.required.placeholder);
  booStrDesc = new BehaviorSubject(this.booState.required.description);

  formGroup!: FormGroup;

  @ViewChild('booInput') booInput!: ElementRef<HTMLInputElement>;
  @ViewChild('numInput') numInput!: ElementRef<HTMLInputElement>;
  @ViewChild('rulInput') rulInput!: ElementRef<HTMLInputElement>;

  constructor(
    public changes: DashChangesService,
    formBuilder: FormBuilder
  ) {
    this.formGroup = formBuilder.group({
      enableReq: '',
      enableHid: '',
      enableDis: '',
      enableRead: ''
    });
  }

  onFormSubmit() {
    console.log("submitted logic form", this.formGroup.value);
  }

  selectBoolField(event: MatRadioChange) {
    this.booState.current = event.source.value;
    this.onBoolFieldSelect(event.source.value);
  }

  onBoolReqChange(changed: MatSlideToggleChange) {
    this.changes.set.required = changed.checked;
  }

  onBoolDisChange(changed: MatSlideToggleChange) {
    this.changes.set.disabled = changed.checked;
  }

  onBoolHidChange(changed: MatSlideToggleChange) {
    this.changes.set.hidden = changed.checked;
  }

  onBoolReadChange(changed: MatSlideToggleChange) {
    this.changes.set.readonly = changed.checked;
  }

  nextGet(selector: NumTyped | BooTyped, streams: Observable<DebounceCandidate>[]) {
    const elems = streams.length === 2 ? [this.numInput] : [];

    if (isNumTyped(selector)) {
      this.strLab.next(this.numState[selector].label);
      this.strPlace.next(this.numState[selector].placeholder);
      this.strDesc.next(this.numState[selector].description);
      elems.push(this.rulInput);
    } else {
      this.booStrLab.next(this.booState[selector].label);
      this.booStrPlace.next(this.booState[selector].placeholder);
      this.booStrDesc.next(this.booState[selector].description);
      elems.push(this.booInput);
    }

    streams.forEach((s, i) => {
      s.pipe(take(1))
        .subscribe(s => {
          if (typeof s === "string") {
            elems[i].nativeElement.value = s;
          }
        });
    });
  }

  onBoolFieldSelect(_: string) {
    const cg = this.changes.get;
    switch (this.booState.current) {
      case FieldId.required:
        this.nextGet(FieldId.required, [cg.requiredRuleStream]);
        break;
      case FieldId.disabled:
        this.nextGet(FieldId.disabled, [cg.disabledRuleStream]);
        break;
      case FieldId.hidden:
        this.nextGet(FieldId.hidden, [cg.hiddenRuleStream]);
        break;
      case FieldId.readonly:
        this.nextGet(FieldId.readonly, [cg.readonlyRuleStream]);
        break;
      default:
        break;
    }

  };


  onNumFieldSelect(_: string) {
    const cg = this.changes.get;
    switch (this.numState.current) {
      case FieldId.tabindex:
        this.nextGet(FieldId.tabindex, [cg.tabindexStream, cg.tabindexRuleStream]);
        break;
      case FieldId.max:
        this.nextGet(FieldId.max, [cg.maxStream, cg.maxRuleStream]);
        break;
      case FieldId.min:
        this.nextGet(FieldId.max, [cg.minStream, cg.minRuleStream]);
        break;
      case FieldId.step:
        this.nextGet(FieldId.step, [cg.stepStream, cg.stepRuleStream]);
        break;
      default:
        break;
    }
  };

  onBooTextChange(changed: string) {
    switch (this.booState.current) {
      case FieldId.required:
        this.changes.set.tabindexRule = changed;
        break;
      case FieldId.disabled:
        this.changes.set.disabledRule = changed;
        break;
      case FieldId.hidden:
        this.changes.set.hiddenRule = changed;
        break;
      case FieldId.readonly:
        this.changes.set.readonlyRule = changed;
        break;
      default:
        break;
    }
  }

  onNumFieldChange(changed: string, unruly = true) {
    switch (this.numState.current) {
      case FieldId.tabindex:
        unruly ?
          this.changes.set.tabindex = Number(changed) :
          this.changes.set.tabindexRule = changed;
        break;
      case FieldId.max:
        unruly ?
          this.changes.set.max = Number(changed) :
          this.changes.set.maxRule = changed;
        break;
      case FieldId.min:
        unruly ?
          this.changes.set.min = Number(changed) :
          this.changes.set.minRule = changed;
        break;
      case FieldId.step:
        unruly ?
          this.changes.set.step = Number(changed) :
          this.changes.set.stepRule = changed;
        break;
      default:
        break;
    }
  }

  selectNumField(event: MatRadioChange) {
    this.numState.current = event.source.value;
    this.onNumFieldSelect(event.value);
  }

}
