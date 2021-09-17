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
  selectFormControl = new FormControl('');

  selectable = true;
  removable = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];

  strLabels = ["label", "description", "placeholder", "id"];
  optLabels = ["type", "options", "pattern", "attributes"];


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
  
  strLab = new BehaviorSubject(this.state.label.label);
  strPlace = new BehaviorSubject(this.state.label.placeholder);
  strDesc = new BehaviorSubject(this.state.label.description);
  strId = new BehaviorSubject(this.state.label.label);
  
  


  filteredTypes: Observable<string[]>;
  type = 'input';
  allTypes: string[] = [
    'input',
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

  

  @ViewChild('typeInput') typeInput!: ElementRef<HTMLInputElement>;
  @ViewChild('labelInput') labelInput!: ElementRef<HTMLInputElement>;
  @ViewChild('descInput') descInput!: ElementRef<HTMLInputElement>;
  @ViewChild('placeInput') placeInput!: ElementRef<HTMLInputElement>;

  constructor(private changes: DashChangesService, private graf: GrafStore) {
    
    this.filteredTypes = this.typeCtrl.valueChanges.pipe(
      startWith(null),
      map((type: string | null) => type ? this._filter(type) : this.allTypes.slice())
    );
  }

  ngAfterViewInit(): void {
    this.changes.typeStrm.subscribe(t =>  this.type = t.value);
    this.changes.labelStrm.subscribe(t => this.state.label.value = t.value);
    this.changes.descStrm.subscribe(t => this.state.description.value = t.value);
    this.changes.placeStrm.subscribe(t => this.state.placeholder.value = t.value);
  }

  selectStrField(event: MatRadioChange) {
    this.state.current = event.source.value;
    switch (this.state.current) {
      case "label":
        this.strLab.next(this.state.label.label);
        this.strPlace.next(this.state.label.placeholder);
        this.strDesc.next(this.state.label.description);
        break;
      case "placeholder":
        this.strLab.next("Placeholder");
        this.strPlace.next("Eg: John Doe");
        this.strDesc.next("Simple example value");
        break;      
      case "description":
        this.strLab.next("Description");
        this.strPlace.next("Eg: Please fill in your first name");
        this.strDesc.next("Some hints about the field");
        break;
      case "id":
        this.strLab.next("Id");
        this.strPlace.next("Eg: 42");
        this.strDesc.next("A unique hidden id");
        break;
      default:
        break;
    }
    console.log("strfield click", event, event.source.value);
  }

  onLabelChange(label: string) {
    this.changes.label = label;
  };

  onTypeChange(type: string) {
    this.changes.type = type;
  };

  onDescChange(desc: string) {
    this.changes.description = desc;
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


// "text",
// "number",
// "email",
// "password",
// "time",
// "date",
// "tel",
// "url",
// "search",
// "datetime-local",
// "month",    
// "week",
// "color"