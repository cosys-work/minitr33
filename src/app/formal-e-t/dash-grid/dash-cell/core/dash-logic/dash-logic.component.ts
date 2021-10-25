import {AfterContentInit, ChangeDetectionStrategy, Component, ElementRef, ViewChild} from '@angular/core';
import {FormControl} from '@angular/forms';
import {MatRadioChange} from '@angular/material/radio';
import {MatSlideToggleChange} from '@angular/material/slide-toggle';
import {BehaviorSubject, Observable, takeUntil} from 'rxjs';
import {take} from 'rxjs/operators';

import {FieldId} from "../../../../../shared/field.model";
import {
  booLabels,
  booState,
  BooTypeField,
  numLabels,
  numState,
  NumTypeField
} from "../../../../../shared/fields.config";
import {DashChangesService} from "../../../../../store/dash-changes.service";
import {DebounceCandidate} from "../../../../../store/change-getters.service";
import {StatefulnessComponent} from "../../../../../shared/statefulness/statefulness.component";
import {GrafStore} from "../../../../../store/graf-store.service";

@Component({
  selector: 'app-dash-logic',
  templateUrl: './dash-logic.component.html',
  styleUrls: ['./dash-logic.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashLogicComponent extends StatefulnessComponent implements AfterContentInit {

  keyCtrl = new FormControl();

  booLabels = booLabels;
  numLabels = numLabels;

  numState = numState;
  numStrLab = new BehaviorSubject(this.numState.tabindex.label);
  numStrPlace = new BehaviorSubject(this.numState.tabindex.placeholder);
  numStrDesc = new BehaviorSubject(this.numState.tabindex.description);

  booState = booState;
  booStrLab = new BehaviorSubject(this.booState.required.label);
  booStrPlace = new BehaviorSubject(this.booState.required.placeholder);
  booStrDesc = new BehaviorSubject(this.booState.required.description);

  booBool = false;
  //@ViewChild('booToggle') booToggle!: ElementRef<HTMLInputElement>;
  @ViewChild('booInput') booInput!: ElementRef<HTMLInputElement>;
  @ViewChild('numInput') numInput!: ElementRef<HTMLInputElement>;
  @ViewChild('rulInput') rulInput!: ElementRef<HTMLInputElement>;

  constructor(
    private changes: DashChangesService,
    private grafStore: GrafStore,
  ) {
    super();
  }

  ngAfterContentInit() {
    this.grafStore.current.pipe(takeUntil(this.onDestroy$))
      .subscribe(_ => this.updateFL());
  }

  private updateFL() {
    this.updateFLBoo(this.booState.current);
    this.updateFLNum(this.numState.current);
  }

  private nextBooSet(booStream: Observable<DebounceCandidate>, ruStream: Observable<DebounceCandidate>) {
    booStream.pipe(take(1)).subscribe(l => {
      if (typeof l === "boolean") {
        this.booBool = l;
      }
    });
    ruStream.pipe(take(1)).subscribe(l => {
      if (typeof l === "string") {
        this.booInput.nativeElement.value = l;
      }
    });
  }

  private updateFLBoo(current: keyof BooTypeField) {
    switch (current) {
      case FieldId.required:
        this.nextBooSet(
          this.changes.get.requiredStream,
          this.changes.get.requiredRuleStream
        );
        break;
      case FieldId.disabled:
        this.nextBooSet(
          this.changes.get.disabledStream,
          this.changes.get.disabledRuleStream
        );
        break;
      case FieldId.hidden:
        this.nextBooSet(
          this.changes.get.hiddenStream,
          this.changes.get.hiddenRuleStream
        );
        break;
      case FieldId.readonly:
        this.nextBooSet(
          this.changes.get.readonlyStream,
          this.changes.get.readonlyRuleStream
        )
        break;
      default:
        break;
    }
  }

  private nextNumSet(nuStream: Observable<DebounceCandidate>, ruStream: Observable<DebounceCandidate>) {
    nuStream.pipe(take(1)).subscribe(l => {
      console.log("next num", l);
      if (typeof l === "number") {
        this.numInput.nativeElement.value = l.toString();
      }
    });
    ruStream.pipe(take(1)).subscribe(l => {
      console.log("next num rule", l);
      if (typeof l === "string") {
        this.rulInput.nativeElement.value = l;
      }
    });
  }

  private updateFLNum(current: keyof NumTypeField) {
    switch (current) {
      case FieldId.tabindex:
        this.nextNumSet(
          this.changes.get.tabindexStream,
          this.changes.get.tabindexRuleStream
        );
        break;
      case FieldId.max:
        this.nextNumSet(
          this.changes.get.maxStream,
          this.changes.get.maxRuleStream
        );
        break;
      case FieldId.min:
        this.nextNumSet(
          this.changes.get.minStream,
          this.changes.get.minRuleStream
        );
        break;
      case FieldId.step:
        this.nextNumSet(
          this.changes.get.stepStream,
          this.changes.get.stepRuleStream
        )
        break;
      default:
        break;
    }
  }

  updateBooStrLPD() {
    this.booStrLab.next(this.booState[this.booState.current].label);
    this.booStrPlace.next(this.booState[this.booState.current].placeholder);
    this.booStrDesc.next(this.booState[this.booState.current].description);
  }

  updateNumStrLPD() {
    this.numStrLab.next(this.numState[this.numState.current].label);
    this.numStrPlace.next(this.numState[this.numState.current].placeholder);
    this.numStrDesc.next(this.numState[this.numState.current].description);
  }

  selectBoolField(event: MatRadioChange) {
    this.booState.current = event.source.value;
    this.updateBooStrLPD();
    this.updateFLBoo(this.booState.current);
  }

  selectNumField(event: MatRadioChange) {
    this.numState.current = event.source.value;
    this.updateNumStrLPD();
    this.updateFLNum(this.numState.current);
  }

  onBooFieldChange(changed: MatSlideToggleChange) {
    switch (this.booState.current) {
      case FieldId.required:
        this.changes.set.required = changed.checked;
        break;
      case FieldId.disabled:
        this.changes.set.disabled = changed.checked;
        break;
      case FieldId.hidden:
        this.changes.set.hidden = changed.checked;
        break;
      case FieldId.readonly:
        this.changes.set.readonly = changed.checked;
        break;
      default:
        break;
    }
  }

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

  onNumFieldChange(changed: string) {
    switch (this.numState.current) {
      case FieldId.tabindex:
        this.changes.set.tabindex = Number(changed);
        break;
      case FieldId.max:
        this.changes.set.max = Number(changed);
        break;
      case FieldId.min:
        this.changes.set.min = Number(changed);
        break;
      case FieldId.step:
        this.changes.set.step = Number(changed);
        break;
      default:
        break;
    }
  }

  onNumFieldRuleChange(changed: string) {
    switch (this.numState.current) {
      case FieldId.tabindex:
        this.changes.set.tabindexRule = changed;
        break;
      case FieldId.max:
        this.changes.set.maxRule = changed;
        break;
      case FieldId.min:
        this.changes.set.minRule = changed;
        break;
      case FieldId.step:
        this.changes.set.stepRule = changed;
        break;
      default:
        break;
    }
  }

}
