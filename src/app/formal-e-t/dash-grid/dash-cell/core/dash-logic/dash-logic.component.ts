import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { AfterContentInit, ChangeDetectionStrategy, Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatRadioChange } from '@angular/material/radio';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { BehaviorSubject, Observable } from 'rxjs';
import { DashChangesService } from '../dash-changes.service';

export type BooTyped = "required" | "disabled" | "hidden" | "readonly";

export type NumTyped = "tabindex" | "maximum" | "minimum" | "step";

export interface FieldEssentials {
  label: string;
  placeholder: string;
  description: string;
}

export interface BooTyper {
  current: BooTyped;
  required: FieldEssentials;
  disabled: FieldEssentials;
  hidden: FieldEssentials;
  readonly: FieldEssentials;
}

export interface NumTyper {
  current: NumTyped;
  tabindex: FieldEssentials;
  maximum: FieldEssentials;
  minimum: FieldEssentials;
  step: FieldEssentials;
}

@Component({
  selector: 'app-dash-logic',
  templateUrl: './dash-logic.component.html',
  styleUrls: ['./dash-logic.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashLogicComponent implements AfterContentInit {

  selectable = true;
  removable = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];

  keyCtrl = new FormControl();
  filteredKeys!: Observable<string[]>;
  keys: string[] = ['Name'];
  allKeys: string[] = ['Name', 'Email', 'Phone', 'Count'];

  boolChoices = ["true", "false" ];
  boolLabels = [ "required", "disabled", "hidden", "readonly"];
  numLabels = ["tabindex", "maximum", "minimum", "step"];

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


  boostate: BooTyper = {
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

  boostrLab = new BehaviorSubject(this.boostate.required.label);
  boostrPlace = new BehaviorSubject(this.boostate.required.placeholder);
  boostrDesc = new BehaviorSubject(this.boostate.required.description);

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

  ngAfterContentInit(): void {
    this.changes.requiredStrm.subscribe(t => this.changes.required = t.value);
    this.changes.disabledStrm.subscribe(t => this.changes.disabled = t.value);
    this.changes.hiddenStrm.subscribe(t => this.changes.hidden = t.value);
    this.changes.readonlyStrm.subscribe(t => this.changes.readonly = t.value);

    this.changes.tabindexStrm.subscribe(t => this.changes.tabindex = t.value);
    this.changes.minStrm.subscribe(t => this.changes.min = t.value);
    this.changes.maxStrm.subscribe(t => this.changes.max = t.value);
    this.changes.stepStrm.subscribe(t => this.changes.step = t.value);
  }

  selectBoolField(event: MatRadioChange) {
    this.boostate.current = event.source.value;
    this.onBoolFieldSelect(event.source.value);
  }

  onBoolReqChange(changed: MatSlideToggleChange) {
    console.log("boolReqChanger",  changed);
    this.changes.required = changed.checked;
  }

  onBoolDisChange(changed: MatSlideToggleChange) {
    console.log("boolDisChanger", changed);
    this.changes.disabled = changed.checked;
  }

  onBoolHidChange(changed: MatSlideToggleChange) {
    this.changes.hidden = changed.checked;
  }

  onBoolReadChange(changed: MatSlideToggleChange) {
    this.changes.readonly = changed.checked;
  }

  onBoolFieldSelect(_: string) {
    switch (this.boostate.current) {
      case this.boolLabels[0]: //"required":
        this.boostrLab.next(this.boostate.required.label);
        this.boostrPlace.next(this.boostate.required.placeholder);
        this.boostrDesc.next(this.boostate.required.description);
        this.booInput.nativeElement.value = this.changes.requiredRule;
        break;
      case this.boolLabels[1]: //disabled
        this.boostrLab.next(this.boostate.disabled.label);
        this.boostrPlace.next(this.boostate.disabled.placeholder);
        this.boostrDesc.next(this.boostate.disabled.description);
        this.booInput.nativeElement.value = this.changes.disabledRule;
        break;    
      case this.boolLabels[2]: //hidden
        this.boostrLab.next(this.boostate.hidden.label);
        this.boostrPlace.next(this.boostate.hidden.placeholder);
        this.boostrDesc.next(this.boostate.hidden.description);
        this.booInput.nativeElement.value = this.changes.hiddenRule;
        break;
      case this.boolLabels[3]: //readonly
        this.boostrLab.next(this.boostate.readonly.label);
        this.boostrPlace.next(this.boostate.readonly.placeholder);
        this.boostrDesc.next(this.boostate.readonly.description);
        this.booInput.nativeElement.value = this.changes.readonlyRule;
        break;
      default:
        break;
    }
    
  };


  onNumFieldSelect(_: string) {
    switch (this.state.current) {
      case "tabindex": //"tabindex":
        this.strLab.next(this.state.tabindex.label);
        this.strPlace.next(this.state.tabindex.placeholder);
        this.strDesc.next(this.state.tabindex.description);
        this.numInput.nativeElement.value = String(this.changes.tabindex);
        this.rulInput.nativeElement.value = String(this.changes.tabindexRule);
        break;
      case "maximum": //maximum
        this.strLab.next(this.state.maximum.label);
        this.strPlace.next(this.state.maximum.placeholder);
        this.strDesc.next(this.state.maximum.description);
        this.numInput.nativeElement.value = String(this.changes.max);
        this.rulInput.nativeElement.value = String(this.changes.maxRule);
        break;      
      case "minimum": //minimum
        this.strLab.next(this.state.minimum.label);
        this.strPlace.next(this.state.minimum.placeholder);
        this.strDesc.next(this.state.minimum.description);
        this.numInput.nativeElement.value = String(this.changes.min);
        this.rulInput.nativeElement.value = String(this.changes.minRule);
        break;
      case "step": //step
        this.strLab.next(this.state.step.label);
        this.strPlace.next(this.state.step.placeholder);
        this.strDesc.next(this.state.step.description);
        this.numInput.nativeElement.value = String(this.changes.step);
        this.rulInput.nativeElement.value = String(this.changes.stepRule);
        break;
      default:
        break;
    }
  };

  onBooTextChange(changed: string) {
    console.log("conditional logic", changed);
  }

  onNumFieldChange(changed: string) {
    switch (this.state.current) {
      case "tabindex":
        this.changes.tabindex = Number(changed);
        break;
      case "maximum":
        this.changes.max = Number(changed);
        break;      
      case "minimum":
        this.changes.min = Number(changed);
        break;
      case "step":
        this.changes.step = Number(changed);
        break;
      default:
        break;
    }
  }

  onNumFieldRuleChange(changed: string) {
    switch (this.state.current) {
      case "tabindex":
        this.changes.tabindex = Number(changed);
        break;
      case "maximum":
        this.changes.max = Number(changed);
        break;      
      case "minimum":
        this.changes.min = Number(changed);
        break;
      case "step":
        this.changes.step = Number(changed);
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
