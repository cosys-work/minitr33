import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatRadioChange } from '@angular/material/radio';
import { MatSelectChange } from '@angular/material/select';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { FormCursorStoreService } from 'src/app/store/form-cursor-store.service';
import { DashChangesService } from '../dash-changes.service';

@Component({
  selector: 'app-dash-logic',
  templateUrl: './dash-logic.component.html',
  styleUrls: ['./dash-logic.component.scss']
})
export class DashLogicComponent implements AfterViewInit {

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

  state = {
    current: "tabindex",
    tabindex: {
      label: "Tabindex",
      placeholder: "0",
      description: "The position of the field in the form.",
      value: ""
    },
    maximum: {
      label: "Maximum",
      placeholder: "1000",
      description: "The maximum allowed number or size.",
      value: ""
    },
    minimum: {
      label: "Minimum",
      placeholder: "0",
      description: "The minimum allowed number or size.",
      value: ""
    },
    step: {
      label: "Step",
      placeholder: "0",
      description: "The number to change the numeric value.",
      value: ""
    }
  };

  boostate = {
    current: "required",
    required: {
      label: "Required",
      placeholder: "false",
      description: "Is this a required field?",
      value: ""
    },
    disabled: {
      label: "Disabled",
      placeholder: "false",
      description: "Is this a disabled field?",
      value: ""
    },
    hidden: {
      label: "Hidden",
      placeholder: "false",
      description: "Is this a hidden field?",
      value: ""
    },
    readonly: {
      label: "Readonly",
      placeholder: "false",
      description: "Is this a readonly field?",
      value: ""
    }
  }

  traitCtrl = new FormControl();
  filteredTraits!: Observable<string[]>;
  traits: string = 'false';
  numTraits!: number[];
  allTraits: string[] = ['true', 'false'];

  strLab = new BehaviorSubject(this.state.tabindex.label);
  strPlace = new BehaviorSubject(this.state.tabindex.placeholder);
  strDesc = new BehaviorSubject(this.state.tabindex.description);

  boostrLab = new BehaviorSubject(this.boostate.required.label);
  boostrPlace = new BehaviorSubject(this.boostate.required.placeholder);
  boostrDesc = new BehaviorSubject(this.boostate.required.description);

  @ViewChild('traitInput') traitInput!: ElementRef<HTMLInputElement>;
  @ViewChild('keyInput') keyInput!: ElementRef<HTMLInputElement>;
  @ViewChild('boolSelecta') boolSelecta!: ElementRef<HTMLSelectElement>;
  @ViewChild('maInput') maInput!: ElementRef<HTMLInputElement>;

  constructor(
    private changes: DashChangesService,
    private cursor: FormCursorStoreService
  ) {
    this.cursor.current.subscribe(c => {
      this.numTraits = [c];
    })
    this.filteredTraits = this.traitCtrl.valueChanges.pipe(
        startWith(null),
        map((tr8: string | null) => tr8 ? this._filterTraits(tr8) : this.allTraits.slice()));

    this.filteredKeys = this.keyCtrl.valueChanges.pipe(
        startWith(null),
        map((key: string | null) => key ? this._filterKeys(key) : this.allKeys.slice()));
  }

  ngAfterViewInit(): void {
    this.changes.requiredStrm.subscribe(t => this.boostate.required.value = t.value);
    this.changes.disabledStrm.subscribe(t => this.boostate.disabled.value = t.value);
    this.changes.hiddenStrm.subscribe(t => this.boostate.hidden.value = t.value);
    this.changes.readonlyStrm.subscribe(t => this.boostate.readonly.value = t.value);

    this.changes.tabindexStrm.subscribe(t => this.state.tabindex.value = t.value);
    this.changes.minStrm.subscribe(t => this.state.minimum.value = t.value);
    this.changes.maxStrm.subscribe(t => this.state.maximum.value = t.value);
    this.changes.stepStrm.subscribe(t => this.state.step.value = t.value);
  }

  addTrait(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    if (value) {
      this.traits = value;
    }
    event.chipInput!.clear();
    this.traitCtrl.setValue(null);
  }

  selectBoolField(event: MatRadioChange) {
    this.boostate.current = event.source.value;
    this.onBoolFieldSelect(event.source.value);
  }

  onBoolFieldChange(changed: MatSelectChange) {
    console.log("changing soon boofield", changed);
    switch (this.boostate.current) {
      case "required":
        this.changes.required = changed.value;
        break;
      case "disabled":
        this.changes.disabled = changed.value;
        break;      
      case "hidden":
        this.changes.hidden = changed.value;
        break;
      case "readonly":
        this.changes.readonly = changed.value;
        break;
      default:
        break;
    }
    console.log("changed boofield", changed);
  }

  onBoolFieldSelect(changed: string) {
    switch (this.boostate.current) {
      case this.boolLabels[0]: //"required":
        console.log("required ma", this.boolLabels[0]);
        this.boostrLab.next(this.boostate.required.label);
        this.boostrPlace.next(this.boostate.required.placeholder);
        this.boostrDesc.next(this.boostate.required.description);
        this.boolSelecta.nativeElement.value = String(this.changes.required) ?? "";
        break;
      case this.boolLabels[1]: //disabled
        console.log("disabled ma", this.boolLabels[0]);
        this.boostrLab.next(this.boostate.disabled.label);
        this.boostrPlace.next(this.boostate.disabled.placeholder);
        this.boostrDesc.next(this.boostate.disabled.description);
        this.boolSelecta.nativeElement.value = String(this.changes.disabled) ?? "";
        break;      
      case this.boolLabels[2]: //hidden
        this.boostrLab.next(this.boostate.hidden.label);
        this.boostrPlace.next(this.boostate.hidden.placeholder);
        this.boostrDesc.next(this.boostate.hidden.description);
        this.boolSelecta.nativeElement.value = String(this.changes.hidden) ?? "";
        break;
      case this.boolLabels[3]: //readonly
        this.boostrLab.next(this.boostate.readonly.label);
        this.boostrPlace.next(this.boostate.readonly.placeholder);
        this.boostrDesc.next(this.boostate.readonly.description);
        this.boolSelecta.nativeElement.value = String(this.changes.readonly) ?? "";
        break;
      default:
        break;
    }
    console.log("changed", changed);
  };


  onNumFieldSelect(changed: string) {
    switch (this.state.current) {
      case "tabindex": //"tabindex":
        console.log("tabindexma");
        this.strLab.next(this.state.tabindex.label);
        this.strPlace.next(this.state.tabindex.placeholder);
        this.strDesc.next(this.state.tabindex.description);
        this.maInput.nativeElement.value = this.changes.label;
        break;
      case "maximum": //maximum
      console.log("maxma");
        this.strLab.next(this.state.maximum.label);
        this.strPlace.next(this.state.maximum.placeholder);
        this.strDesc.next(this.state.maximum.description);
        break;      
      case "minimum": //minimum
      console.log("minma");
        this.strLab.next(this.state.minimum.label);
        this.strPlace.next(this.state.minimum.placeholder);
        this.strDesc.next(this.state.minimum.description);
        break;
      case "step": //step
        this.strLab.next(this.state.step.label);
        this.strPlace.next(this.state.step.placeholder);
        this.strDesc.next(this.state.step.description);
        break;
      default:
        break;
    }
    console.log("changed", changed);
  };

  onNumFieldChange(changed: string) {
    switch (this.boostate.current) {
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
    console.log("changed nufield", changed);
  }


  selectNumField(event: MatRadioChange) {
    this.state.current = event.source.value;
    this.onNumFieldSelect(event.value);
  }

  removeTrait(tr8: string): void {
    const index = this.traits.indexOf(tr8);
    if (index >= 0) {
      this.traits.slice(index, 1);
    }
  }

  selectedTrait(event: MatAutocompleteSelectedEvent): void {
    this.traits = event.option.viewValue;
    this.traitInput.nativeElement.value = '';
    this.traitCtrl.setValue(null);
  }

  private _filterTraits(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.allTraits.filter(tr8 => tr8.toLowerCase().includes(filterValue));
  }

  addKey(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    if (value) {
      this.keys = [...this.keys, value];
    }
    event.chipInput!.clear();
    this.keyCtrl.setValue(null);
  }


  removeKey(keyWee: string): void {
    const index = this.keys.indexOf(keyWee);
    if (index >= 0) {
      this.keys = [...this.keys.slice(0, index), ...this.keys.slice(index + 1)];
      console.log("keeWee", index, this.keys);
    }
  }

  selectedKey(event: MatAutocompleteSelectedEvent): void {
    this.keys = [...this.keys, event.option.viewValue];
    this.keyInput.nativeElement.value = '';
    this.keyCtrl.setValue(null);
  }

  private _filterKeys(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.allKeys.filter(key => key.toLowerCase().includes(filterValue));
  }
}
