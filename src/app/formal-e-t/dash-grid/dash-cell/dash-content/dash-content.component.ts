import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';

@Component({
  selector: 'app-dash-content',
  templateUrl: './dash-content.component.html',
  styleUrls: ['./dash-content.component.scss']
})
export class DashContentComponent {

  form = new FormGroup({});
  model = { };
  fields: FormlyFieldConfig[] = [
    {
      key: 'name',
      type: 'input',
      templateOptions: {
        label: 'Key',
        placeholder: 'Enter key',
        required: true,
        minLength: 3,
        maxLength: 10,
      }
    },
    {
      key: 'email',
      type: 'input',
      templateOptions: {
        label: 'Type',
        placeholder: 'Enter Type',
        required: true,
      }
    },
  ];

  onSubmit(model: any) {
    console.log(model, model === this.model, this.model);
  }
}
