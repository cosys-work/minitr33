import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FieldType, FormlyFieldConfig } from '@ngx-formly/core';

@Component({
  selector: 'app-dash-preview',
  templateUrl: './dash-preview.component.html',
  styleUrls: ['./dash-preview.component.scss']
})
export class DashPreviewComponent implements OnInit {

  form = new FormGroup({});
  model = { };
  fields: FormlyFieldConfig[] = [
    {
      key: 'name',
      type: 'input',
      templateOptions: {
        label: 'Name',
        placeholder: 'Enter name',
        required: true,
        minLength: 3,
        maxLength: 10,
      }
    },
    {
      key: 'email',
      type: 'input',
      templateOptions: {
        label: 'Email address',
        placeholder: 'Enter email',
        required: true,
      }
    },
  ];

  onSubmit(model: any) {
    console.log(model, model === this.model, this.model);
  }

  ngOnInit(): void {
  }

}
