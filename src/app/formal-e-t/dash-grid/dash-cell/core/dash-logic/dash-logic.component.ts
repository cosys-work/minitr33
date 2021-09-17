import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatRadioChange } from '@angular/material/radio';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { DashChangesService } from '../dash-changes.service';

@Component({
  selector: 'app-dash-logic',
  templateUrl: './dash-logic.component.html',
  styleUrls: ['./dash-logic.component.scss']
})
export class DashLogicComponent implements AfterViewInit {

  selectable = true;
  removable = false;
  separatorKeysCodes: number[] = [ENTER, COMMA];


  keyCtrl = new FormControl();
  filteredKeys!: Observable<string[]>;
  keys: string[] = ['Name'];
  allKeys: string[] = ['Name', 'Email', 'Phone', 'Count'];

  boolLabels = [ "required", "disabled", "hidden", "readonly",];
  numLabels = ["tabindex", "maximum", "minimum", "step"];

  traitCtrl = new FormControl();
  filteredTraits!: Observable<string[]>;
  traits: string[] = ['false'];
  numTraits: number[] = [0];
  allTraits: string[] = ['true', 'Required', 'Hidden', 'Bounded'];

  @ViewChild('traitInput') traitInput!: ElementRef<HTMLInputElement>;
  @ViewChild('keyInput') keyInput!: ElementRef<HTMLInputElement>;
  @ViewChild('minInput') minInput!: ElementRef<HTMLInputElement>;
  @ViewChild('maxInput') maxInput!: ElementRef<HTMLInputElement>;

  constructor(
    private changes: DashChangesService
  ) {
    this.filteredTraits = this.traitCtrl.valueChanges.pipe(
        startWith(null),
        map((tr8: string | null) => tr8 ? this._filterTraits(tr8) : this.allTraits.slice()));

    this.filteredKeys = this.keyCtrl.valueChanges.pipe(
        startWith(null),
        map((key: string | null) => key ? this._filterKeys(key) : this.allKeys.slice()));
  }

  ngAfterViewInit(): void {
    this.changes.tr8sStrm.subscribe(t =>  this.traits = [t.value]);
    this.changes.relsStrm.subscribe(t => this.keys = [t.value]);
    this.changes.minStrm.subscribe(t => this.minInput.nativeElement.value = t.value);
    this.changes.maxStrm.subscribe(t => this.maxInput.nativeElement.value = t.value);
  }

  addTrait(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    if (value) {
      this.traits.push(value);
    }
    event.chipInput!.clear();
    this.traitCtrl.setValue(null);
  }

  selectBoolField(event: MatRadioChange) {
    console.log("boolfield click", event);
  }

  selectNumField(event: MatRadioChange) {
    console.log("numfield click", event);
  }

  removeTrait(tr8: string): void {
    const index = this.traits.indexOf(tr8);
    if (index >= 0) {
      this.traits.slice(index, 1);
    }
  }

  selectedTrait(event: MatAutocompleteSelectedEvent): void {
    this.traits = [...this.traits, event.option.viewValue];
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
