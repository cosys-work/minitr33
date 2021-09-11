import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { emailField, emptyField, FieldId, FieldRefs, nameField, refsToField } from 'src/app/shared/field.model';
import { FormalField } from 'src/app/shared/shared.model';
import { FieldRefsStoreService } from 'src/app/store/field-refs-store.service';
import { DashChangesService } from '../dash-content/dash-changes.service';


@Component({
  selector: 'app-dash-preview',
  templateUrl: './dash-preview.component.html',
  styleUrls: ['./dash-preview.component.scss']
})
export class DashPreviewComponent implements OnInit {

  form = new FormGroup({});
  model = { };

  buff: FormalField = emptyField();
  
  fieldGroup = [
    nameField,
    emailField
  ];

  field = {
    fieldGroupClassName: 'display-flex',
    fieldGroup: this.fieldGroup
  };

  fields: FormlyFieldConfig[] = [
    { key: 'id'},
    this.field,
    this.buff
  ];

  constructor(
    private contents: DashChangesService, 
    private fieldRefs: FieldRefsStoreService
  ) {

    const it = [
      this.fieldRefs.states[0], 
      this.fieldRefs.states[1]
    ].map((s: FieldRefs) => refsToField(s));
    
    this.fieldGroup = [...this.fieldGroup, ...it];
    this.fields = [...this.fields];
    this.buff.className = "flex-2";

    this.contents.stream.subscribe((v) => {
      console.log("v", v);
      switch (v.id) {
        case FieldId.type:
          this.buff.type = v.value.trim();
          break;
        case FieldId.label:
          this.buff.templateOptions.label = v.value.trim();
          this.buff.key = v.value.trim().toLowerCase().replace(/ /g, "_");
          break;
        case FieldId.placeholder:
          this.buff.templateOptions.placeholder = v.value.trim();
          break;
        case FieldId.description:
          this.buff.templateOptions.description = v.value.trim();
          break;
        default:
          break;
      };
      this.fields = [...this.fields];
    });
  }

  onSubmit(model: any) {
    console.log(model, model === this.model, this.model);
  }

  ngOnInit(): void {
  }

}
