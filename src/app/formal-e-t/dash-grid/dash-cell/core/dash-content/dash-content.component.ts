import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { DashChangesService } from '../dash-changes.service';


@Component({
  selector: 'app-dash-content',
  templateUrl: './dash-content.component.html',
  styleUrls: ['./dash-content.component.scss']
})
export class DashContentComponent implements AfterViewInit {
  inpControl = new FormControl('', Validators.required);
  selectFormControl = new FormControl('', Validators.required);

  selectable = true;
  removable = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  
  typeCtrl = new FormControl();
  labelCtrl = new FormControl();
  descCtrl = new FormControl();
  placeCtrl = new FormControl();

  filteredTypes: Observable<string[]>;
  types!: string[];
  allTypes: string[] = [
    "text",
    "number",
    "email",
    "password",
    "time",
    "date",
    "tel",
    "url",
    "search",
    "datetime-local",
    "month",    
    "week",
    "color"
  ];

  @ViewChild('typeInput') typeInput!: ElementRef<HTMLInputElement>;
  @ViewChild('labelInput') labelInput!: ElementRef<HTMLInputElement>;
  @ViewChild('descInput') descInput!: ElementRef<HTMLInputElement>;
  @ViewChild('placeInput') placeInput!: ElementRef<HTMLInputElement>;

  constructor(private changes: DashChangesService) {
    this.filteredTypes = this.typeCtrl.valueChanges.pipe(
      startWith(null),
      map((type: string | null) => type ? this._filter(type) : this.allTypes.slice())
    );
  }

  ngAfterViewInit(): void {
    this.changes.typeStrm.subscribe(t =>  this.types = this.allTypes = [t.value]);
    this.changes.labelStrm.subscribe(t => this.labelInput.nativeElement.value = t.value);
    this.changes.descStrm.subscribe(t => this.descInput.nativeElement.value = t.value);
    this.changes.placeStrm.subscribe(t => this.placeInput.nativeElement.value = t.value);
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

  onPlaceChange(place: string) {
    this.changes.placeholder = place;
  };

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    if (value) {
      this.types.pop();
      this.types.push(value);
      this.onTypeChange(value);
    }
    event.chipInput!.clear();
    this.typeCtrl.setValue(null);
  }

  remove(type: string): void {
    const index = this.types.indexOf(type);
    if (index >= 0) {
      this.types.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.types.pop();
    this.types.push(event.option.viewValue);
    this.onTypeChange(event.option.viewValue);
    this.typeInput.nativeElement.value = '';
    this.typeCtrl.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allTypes.filter(type => type.toLowerCase().includes(filterValue));
  }
}


