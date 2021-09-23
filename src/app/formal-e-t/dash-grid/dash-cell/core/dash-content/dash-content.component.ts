import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {Component, ElementRef, ViewChild} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';
import {MatChipInputEvent} from '@angular/material/chips';
import {MatRadioChange} from '@angular/material/radio';
import {BehaviorSubject, Observable} from 'rxjs';
import {map, startWith, take} from 'rxjs/operators';
import {DashChangesService} from '../dash-changes.service';


@Component({
  selector: 'app-dash-content',
  templateUrl: './dash-content.component.html',
  styleUrls: ['./dash-content.component.scss']
})
export class DashContentComponent {
  inpControl = new FormControl('', Validators.required);
  // selectFormControl = new FormControl('');

  selectable = true;
  removable = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];

  allTypes: string[] = [
    "input,text",
    "input,number",
    "input,email",
    "input,password",
    "input,time",
    "input,date",
    "input,tel",
    "input,url",
    "input,datetime-local",
    "input,month",
    "input,week",
    "input,color",
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
  allPatterns: string[] = ["Pattern 1", "Pattern 2"];
  allOptions: string[] = ["Option 1", "Option 2"];
  allAttributes: string[] = ["Attribute 1", "Attribute 2"];

  strLabels = ["label", "description", "placeholder", "id"];
  optLabels = ["type", "options", "pattern", "attributes"];

  state = {
    current: "label",
    label: {
      label: "Label",
      placeholder: "Eg: First Name",
      description: "Short Name of the Field",
    },
    placeholder: {
      label: "Placeholder",
      placeholder: "Eg: John Doe",
      description: "Simple example value",
    },
    description: {
      label: "Description",
      placeholder: "Eg: Please fill in your first name",
      description: "Some hints about the field",
    },
    id: {
      label: "Id",
      placeholder: "Eg: 42",
      description: "A unique hidden id",
    }
  }
  optState = {
    current: "type",
    type: {
      label: "Type",
      placeholder: "Input",
      description: "Type of the field",
    },
    options: {
      label: "Options",
      placeholder: "Select options",
      description: "Add options for the field",
    },
    pattern: {
      label: "Pattern",
      placeholder: "Regex",
      description: "Add a regex pattern",
    },
    attributes: {
      label: "Attributes",
      placeholder: "Special fields",
      description: "Special attributes go here",
    }
  }

  strLab = new BehaviorSubject(this.state.label.label);
  strPlace = new BehaviorSubject(this.state.label.placeholder);
  strDesc = new BehaviorSubject(this.state.label.description);

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
  @ViewChild('patternInput') patternInput!: ElementRef<HTMLInputElement>;
  @ViewChild('attributesInput') attributesInput!: ElementRef<HTMLInputElement>;
  @ViewChild('maInput') maInput!: ElementRef<HTMLInputElement>;

  constructor(private changes: DashChangesService) {

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

  selectStrField(event: MatRadioChange) {
    this.state.current = event.source.value;
    switch (this.state.current) {
      case "label":
        this.strLab.next(this.state.label.label);
        this.strPlace.next(this.state.label.placeholder);
        this.strDesc.next(this.state.label.description);
        this.changes.get.labelStream.pipe(take(1)).subscribe(l => this.maInput.nativeElement.value = l.value);
        break;
      case "placeholder":
        this.strLab.next(this.state.placeholder.label);
        this.strPlace.next(this.state.placeholder.placeholder);
        this.strDesc.next(this.state.placeholder.description);
        this.changes.get.placeholderStream.pipe(take(1)).subscribe(p =>this.maInput.nativeElement.value = p.value);
        break;
      case "description":
        this.strLab.next(this.state.description.label);
        this.strPlace.next(this.state.description.placeholder);
        this.strDesc.next(this.state.description.description);
        this.changes.get.descriptionStream.pipe(take(1)).subscribe(d => this.maInput.nativeElement.value = d.value);
        break;
      case "id":
        this.strLab.next(this.state.id.label);
        this.strPlace.next(this.state.id.placeholder);
        this.strDesc.next(this.state.id.description);
        this.changes.get.idStream.pipe(take(1)).subscribe(i => this.maInput.nativeElement.value = i.value);
        break;
      default:
        break;
    }
  }

  selectOptField(event: MatRadioChange) {
    console.log("selected opt", event);
    this.optState.current = event.source.value;
    switch (this.optState.current) {
      case "type":
        this.oysterLab.next(this.optState.type.label);
        this.oysterPlace.next(this.optState.type.placeholder);
        this.oysterDesc.next(this.optState.type.description);
        // this.maInput.nativeElement.value = this.changes.label ?? "";
        break;
      case "options":
        this.oysterLab.next(this.optState.options.label);
        this.oysterPlace.next(this.optState.options.placeholder);
        this.oysterDesc.next(this.optState.options.description);
        // this.maInput.nativeElement.value = this.changes.placeholder ?? "";
        break;
      case "pattern":
        this.oysterLab.next(this.optState.pattern.label);
        this.oysterPlace.next(this.optState.pattern.placeholder);
        this.oysterDesc.next(this.optState.pattern.description);
        // this.maInput.nativeElement.value = this.changes.description ?? "";
        break;
      case "attributes":
        this.oysterLab.next(this.optState.attributes.label);
        this.oysterPlace.next(this.optState.attributes.placeholder);
        this.oysterDesc.next(this.optState.attributes.description);
        // this.maInput.nativeElement.value = this.changes.id ?? "";
        break;
      default:
        break;
    }
  }

  onStrFieldDataChange(changed: string) {
    console.log("changed str field data", changed);
    switch (this.state.current) {
      case "label":
        this.changes.set.label = changed;
        break;
      case "description":
        this.changes.set.description = changed;
        break;
      case "placeholder":
        this.changes.set.placeholder = changed;
        break;
      case "id":
        this.changes.set.id = changed;
        break;
      default:
        break;
    }
  };


  onTypeChange(changed: string) {
    console.log("changed type", changed);
    this.curType = changed;
    this.changes.set.type = changed.toLowerCase();
  };

  onPatternChange(changed: string) {
    console.log("changed pattern", changed);
  };

  onAttributeChange(changed: string) {
    console.log("changed attribute", changed);
  };

  onOptionChange(changed: string) {
    console.log("changed option", changed);
  };

  addType(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    if (value) {
      this.onTypeChange(value);
    }
    event.chipInput!.clear();
    this.typeCtrl.setValue(null);
  }

  removeType(): void {
    console.log("type removal triggered");
  }

  selectedType(event: MatAutocompleteSelectedEvent): void {
    this.onTypeChange(event.option.viewValue);
    this.typeInput.nativeElement.value = '';
    this.typeCtrl.setValue(null);
  }

  private _filterType(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.allTypes.filter(type => type.toLowerCase().includes(filterValue));
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
    this.patternInput.nativeElement.value = '';
    this.patternCtrl.setValue(null);
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
    this.attributesInput.nativeElement.value = '';
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
