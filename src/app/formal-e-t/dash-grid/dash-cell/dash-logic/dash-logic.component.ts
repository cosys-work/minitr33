import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {Component, ElementRef, ViewChild} from '@angular/core';
import {FormControl} from '@angular/forms';
import {MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';
import {MatChipInputEvent} from '@angular/material/chips';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';

@Component({
  selector: 'app-dash-logic',
  templateUrl: './dash-logic.component.html',
  styleUrls: ['./dash-logic.component.scss']
})
export class DashLogicComponent {

  selectable = true;
  removable = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];


  keyCtrl = new FormControl();
  filteredKeys!: Observable<string[]>;
  keys: string[] = ['Name'];
  allKeys: string[] = ['Name', 'Email', 'Phone', 'Count'];

  traitCtrl = new FormControl();
  filteredTraits!: Observable<string[]>;
  traits: string[] = ['Bounded'];
  allTraits: string[] = ['Disabled', 'Required', 'Hidden', 'Bounded'];

  @ViewChild('traitInput') traitInput!: ElementRef<HTMLInputElement>;

  @ViewChild('keyInput') keyInput!: ElementRef<HTMLInputElement>;

  constructor() {
    this.filteredTraits = this.traitCtrl.valueChanges.pipe(
        startWith(null),
        map((tr8: string | null) => tr8 ? this._filterTraits(tr8) : this.allTraits.slice()));

    this.filteredKeys = this.keyCtrl.valueChanges.pipe(
        startWith(null),
        map((key: string | null) => key ? this._filterKeys(key) : this.allKeys.slice()));
  }

  addTrait(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    if (value) {
      this.traits.push(value);
    }
    event.chipInput!.clear();
    this.traitCtrl.setValue(null);
  }

  removeTrait(tr8: string): void {
    const index = this.traits.indexOf(tr8);
    if (index >= 0) {
      this.traits.splice(index, 1);
    }
  }

  selectedTrait(event: MatAutocompleteSelectedEvent): void {
    this.traits.push(event.option.viewValue);
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
      this.keys.push(value);
    }
    event.chipInput!.clear();
    this.keyCtrl.setValue(null);
  }


  removeKey(keyWee: string): void {
    const index = this.keys.indexOf(keyWee);
    if (index >= 0) {
      this.keys.splice(index, 1);
    }
  }

  selectedKey(event: MatAutocompleteSelectedEvent): void {
    this.keys.push(event.option.viewValue);
    this.keyInput.nativeElement.value = '';
    this.keyCtrl.setValue(null);
  }



  private _filterKeys(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.allKeys.filter(key => key.toLowerCase().includes(filterValue));
  }
}
