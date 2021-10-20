import {ChangeDetectionStrategy, Component, ElementRef, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {MatRadioChange} from '@angular/material/radio';
import {MatSlideToggleChange} from '@angular/material/slide-toggle';
import {BehaviorSubject, Observable} from 'rxjs';
import {take} from 'rxjs/operators';
import {DashChangesService} from '../dash-changes.service';
import {FieldId, FieldType} from "../../../../../shared/field.model";
import {
  booLabels,
  BooTyped,
  BooTyper,
  isNumTyped,
  numLabels,
  NumTyped,
  NumTyper
} from "../../../../../shared/logic.model";

@Component({
  selector: 'app-dash-logic',
  templateUrl: './dash-logic.component.html',
  styleUrls: ['./dash-logic.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashLogicComponent {

  keyCtrl = new FormControl();

  state: NumTyper = {
    current: "tabindex",
    tabindex: {
      label: "Index",
      placeholder: "0",
      description: "Position",
    },
    maximum: {
      label: "Max",
      placeholder: "Eg: 1000",
      description: "Max value",
    },
    minimum: {
      label: "Min",
      placeholder: "0",
      description: "Min value",
    },
    step: {
      label: "Step",
      placeholder: "0",
      description: "Increment",
    }
  };

  booState: BooTyper = {
    current: "required",
    required: {
      label: "Rule for 'Required'",
      placeholder: "false",
      description: "When is this a required field?",
    },
    disabled: {
      label: "Rule for 'Disabled'",
      placeholder: "false",
      description: "When is this a disabled field?",
    },
    hidden: {
      label: "Rule for 'Hidden'",
      placeholder: "false",
      description: "When is this a hidden field?",
    },
    readonly: {
      label: "Rule for 'Readonly'",
      placeholder: "false",
      description: "When is this a readonly field?",
    }
  }

  strLab = new BehaviorSubject(this.state.tabindex.label);
  strPlace = new BehaviorSubject(this.state.tabindex.placeholder);
  strDesc = new BehaviorSubject(this.state.tabindex.description);

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
    console.log("boolReqChanger", changed);
    this.changes.set.required = changed.checked;
  }

  onBoolDisChange(changed: MatSlideToggleChange) {
    console.log("boolDisChanger", changed);
    this.changes.set.disabled = changed.checked;
  }

  onBoolHidChange(changed: MatSlideToggleChange) {
    this.changes.set.hidden = changed.checked;
  }

  onBoolReadChange(changed: MatSlideToggleChange) {
    this.changes.set.readonly = changed.checked;
  }

  nextGet(selector: NumTyped | BooTyped, streams: Observable<FieldType>[]) {
    const elems = streams.length === 2 ? [this.numInput] : [];

    if (isNumTyped(selector)) {
      this.strLab.next(this.state[selector].label);
      this.strPlace.next(this.state[selector].placeholder);
      this.strDesc.next(this.state[selector].description);
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
          if (typeof s.value === "string") {
            elems[i].nativeElement.value = s.value;
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
    switch (this.state.current) {
      case FieldId.tabindex: //"tabindex":
        this.nextGet(FieldId.tabindex, [cg.tabindexStream, cg.tabindexRuleStream]);
        break;
      case "maximum": //maximum
        this.nextGet(FieldId.max, [cg.maxStream, cg.maxRuleStream]);
        break;
      case "minimum": //minimum
        this.nextGet(FieldId.max, [cg.minStream, cg.minRuleStream]);
        break;
      case "step": //step
        this.nextGet(FieldId.step, [cg.stepStream, cg.stepRuleStream]);
        break;
      default:
        break;
    }
  };

  onBooTextChange(changed: string) {
    console.log("conditional logic", changed);
  }

  onNumFieldChange(changed: string, unruly = true) {
    switch (this.state.current) {
      case "tabindex":
        unruly ?
          this.changes.set.tabindex = Number(changed) :
          this.changes.set.tabindexRule = changed;
        break;
      case "maximum":
        unruly ?
          this.changes.set.max = Number(changed) :
          this.changes.set.maxRule = changed;
        break;
      case "minimum":
        unruly ?
          this.changes.set.min = Number(changed) :
          this.changes.set.minRule = changed;
        break;
      case "step":
        unruly ?
          this.changes.set.step = Number(changed) :
          this.changes.set.stepRule = changed;
        break;
      default:
        break;
    }
  }

  selectNumField(event: MatRadioChange) {
    this.state.current = event.source.value;
    this.onNumFieldSelect(event.value);
  }

}
