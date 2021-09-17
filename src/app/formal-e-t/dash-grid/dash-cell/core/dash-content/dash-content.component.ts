import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatRadioChange } from '@angular/material/radio';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { GrafStore } from 'src/app/store/graf-store.service';
import { DashChangesService } from '../dash-changes.service';


@Component({
  selector: 'app-dash-content',
  templateUrl: './dash-content.component.html',
  styleUrls: ['./dash-content.component.scss']
})
export class DashContentComponent implements AfterViewInit {
  inpControl = new FormControl('', Validators.required);
  // selectFormControl = new FormControl('');

  selectable = true;
  removable = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];

  allTypes: string[] = [
    "input:text",
    "input:number",
    "input:email",
    "input:password",
    "input:time",
    "input:date",
    "input:tel",
    "input:url",
    "input:datetime-local",
    "input:month",    
    "input:week",
    "input:color",
    'textarea',
    'checkbox',
    'radio',
    'select',
    'multi-select',
    'datepicker',
    'toggle',
    'slider',
    'autocomplete'
  ];

  strLabels = ["label", "description", "placeholder", "id"];
  curStrVal = this.strLabels[0];
  optLabels = ["type", "options", "pattern", "attributes"];
  curOptVal = this.optLabels[0];

  typeCtrl = new FormControl();
  inpCtrl = new FormControl();

  state = {
    current: "label",
    label: {
      label: "Label",
      placeholder: "Eg: First Name",
      description: "Short Name of the Field",
      value: ""
    },
    placeholder: {
      label: "Placeholder",
      placeholder: "Eg: John Doe",
      description: "Simple example value",
      value: ""
    },
    description: {
      label: "Description",
      placeholder: "Eg: Please fill in your first name",
      description: "Some hints about the field",
      value: ""
    },
    id: {
      label: "Id",
      placeholder: "Eg: 42",
      description: "A unique hidden id",
      value: ""
    }
  }

  optState = {
    current: "type",
    type: {
      label: "Type",
      placeholder: "Input",
      description: "Type of the field",
      value: ""
    },
    options: {
      label: "Options",
      placeholder: "Select options",
      description: "Add options for the field",
      value: ""
    },
    pattern: {
      label: "Pattern",
      placeholder: "Regex",
      description: "Add a regex pattern",
      value: ""
    },
    attributes: {
      label: "Attributes",
      placeholder: "Special fields",
      description: "Special attributes go here",
      value: ""
    }
  }
  
  strLab = new BehaviorSubject(this.state.label.label);
  strPlace = new BehaviorSubject(this.state.label.placeholder);
  strDesc = new BehaviorSubject(this.state.label.description);
  strId = new BehaviorSubject(this.state.label.label);
  
  


  filteredTypes: Observable<string[]>;
  type = 'input';

  

  @ViewChild('typeInput') typeInput!: ElementRef<HTMLInputElement>;
  @ViewChild('labelInput') labelInput!: ElementRef<HTMLInputElement>;
  @ViewChild('descInput') descInput!: ElementRef<HTMLInputElement>;
  @ViewChild('maInput') maInput!: ElementRef<HTMLInputElement>;

  constructor(private changes: DashChangesService, private graf: GrafStore) {
    
    this.filteredTypes = this.typeCtrl.valueChanges.pipe(
      startWith(null),
      map((type: string | null) => type ? this._filter(type) : this.allTypes.slice())
    );
  }

  ngAfterViewInit(): void {
    this.changes.labelStrm.subscribe(t => this.state.label.value = t.value);
    this.changes.descStrm.subscribe(t => this.state.description.value = t.value);
    this.changes.placeStrm.subscribe(t => this.state.placeholder.value = t.value);
    this.changes.idStrm.subscribe(t =>  this.state.id.value = t.value);
    
    this.changes.typeStrm.subscribe(t =>  this.optState.type.value = t.value);
    this.changes.optionsStrm.subscribe(t => this.optState.options.value = t.value);
    this.changes.patternStrm.subscribe(t => this.optState.pattern.value = t.value);
    this.changes.attributesStrm.subscribe(t => this.optState.attributes.value = t.value);
  }

  selectStrField(event: MatRadioChange) {
    this.state.current = event.source.value;
    switch (this.state.current) {
      case "label":
        this.strLab.next(this.state.label.label);
        this.strPlace.next(this.state.label.placeholder);
        this.strDesc.next(this.state.label.description);
        this.maInput.nativeElement.value = this.changes.label ?? "";
        break;
      case "placeholder":
        this.strLab.next(this.state.placeholder.label);
        this.strPlace.next(this.state.placeholder.placeholder);
        this.strDesc.next(this.state.placeholder.description);
        this.maInput.nativeElement.value = this.changes.placeholder ?? "";
        break;      
      case "description":
        this.strLab.next(this.state.description.label);
        this.strPlace.next(this.state.description.placeholder);
        this.strDesc.next(this.state.description.description);
        this.maInput.nativeElement.value = this.changes.description ?? "";
        break;
      case "id":
        this.strLab.next(this.state.id.label);
        this.strPlace.next(this.state.id.placeholder);
        this.strDesc.next(this.state.id.description);
        this.maInput.nativeElement.value = this.changes.id ?? "";
        break;
      default:
        break;
    }
    console.log("strfield click", event, event.source.value);
  }

  onTypeChange(changed: string) {
    switch (this.state.current) {
      case "type":
        this.changes.label = changed;
        break;
      case "options":
        this.changes.options = changed.split(",");
        break;      
      case "pattern":
        this.changes.pattern = changed;
        break;
      case "attributes":
        const [key, val] = changed.split(":");
        this.changes.attributes = { [key]: val};
        break;
      default:
        break;
    }
    console.log("changed", changed);
  };

  onInpChange(changed: string) {
    switch (this.state.current) {
      case "label":
        this.changes.label = changed;
        break;
      case "placeholder":
        this.changes.placeholder = changed;
        break;      
      case "description":
        this.changes.description = changed;
        break;
      case "id":
        this.changes.id = changed;
        break;
      default:
        break;
    }
    console.log("changed", changed);
  };

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    if (value) {
      this.type = value;
      this.onTypeChange(value);
    }
    event.chipInput!.clear();
    this.typeCtrl.setValue(null);
  }

  remove(): void {
    this.type = "input";
    this.onTypeChange(this.type);
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.type = event.option.viewValue;
    this.onTypeChange(event.option.viewValue);
    this.typeInput.nativeElement.value = '';
    this.typeCtrl.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.allTypes.filter(type => type.toLowerCase().includes(filterValue));
  }
}