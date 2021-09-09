import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';

const nameField = {
  key: 'name',
  type: 'input',
  className: 'col-a',
  templateOptions: {
    label: 'Name',
    placeholder: 'Enter name',
    required: true,
    minLength: 3,
    maxLength: 10,
  }
};

const emailField = {
  key: 'email',
  type: 'input',
  className: 'col-b',
  templateOptions: {
    label: 'Email',
    placeholder: 'Enter email',
    required: false,
  }
}

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
      type: 'flex-layout',
      templateOptions: {
        fxLayout: 'row',
      },
      fieldGroup: [
        nameField,
        emailField
      ]
    }
  ];

  onSubmit(model: any) {
    console.log(model, model === this.model, this.model);
  }

  ngOnInit(): void {
  }

}
