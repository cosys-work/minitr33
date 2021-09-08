import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';

@Component({
  selector: 'app-dash-preview',
  templateUrl: './dash-preview.component.html',
  styleUrls: ['./dash-preview.component.scss']
})
export class DashPreviewComponent implements OnInit {

  form = new FormGroup({});
  model = { email: 'email@gmail.com' };
  fields: FormlyFieldConfig[] = [
    {
      key: 'email',
      type: 'input',
      templateOptions: {
        label: 'Email address',
        placeholder: 'Enter email',
        required: true,
      }
    }
  ];

  onSubmit(model: any) {
    console.log(model, model === this.model, this.model);
  }

  ngOnInit(): void {
  }

}
