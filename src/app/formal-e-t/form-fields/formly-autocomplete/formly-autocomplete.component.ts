import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteTrigger } from '@angular/material/autocomplete';
import { MatInput } from '@angular/material/input';
import { FieldType } from '@ngx-formly/material';
import { Observable } from 'rxjs';
import { startWith, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-formly-autocomplete',
  templateUrl: './formly-autocomplete.component.html',
  styleUrls: ['./formly-autocomplete.component.scss']
})
export class FormlyAutocompleteComponent extends FieldType implements OnInit, AfterViewInit {

  @ViewChild(MatInput) formFieldControl!: MatInput;
  @ViewChild(MatAutocompleteTrigger) autocomplete!: MatAutocompleteTrigger;

  filter!: Observable<any>;

  ngOnInit() {
    super.ngOnInit();
    this.filter = this.formControl.valueChanges
      .pipe(
        startWith(''),
        switchMap(term => this.to.filter(term)),
      );
  }

  ngAfterViewInit() {
    super.ngAfterViewInit();
    // temporary fix for https://github.com/angular/material2/issues/6728
    (<any> this.autocomplete)._formField = this.formField;
  }
}
