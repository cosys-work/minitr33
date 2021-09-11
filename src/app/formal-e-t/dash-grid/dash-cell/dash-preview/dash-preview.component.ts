import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { FieldId } from 'src/app/shared/field.model';
import { FormalField } from 'src/app/shared/shared.model';
import { FormCursorStoreService } from 'src/app/store/form-cursor-store.service';
import { GrafStore } from 'src/app/store/graf-store.service';
import { DashChangesService } from '../dash-content/dash-changes.service';


const keyMaker = (key: string) => {
  return key.trim().toLowerCase().replace(/ /g, "_");
}

@Component({
  selector: 'app-dash-preview',
  templateUrl: './dash-preview.component.html',
  styleUrls: ['./dash-preview.component.scss']
})
export class DashPreviewComponent implements OnInit {

  form = new FormGroup({});
  model = { };
   
  fieldGroup!: FormalField[];

  field = {
    fieldGroupClassName: 'display-flex',
    fieldGroup: this.fieldGroup
  };

  fields: FormlyFieldConfig[] = [
    this.field,
  ];

  constructor(
    private changes: DashChangesService, 
    private cursorStore: FormCursorStoreService,
    private grafStore: GrafStore
  ) {
    this.fieldGroup = this.grafStore.edges.map(e => e.origin.field);

    this.initialize();

    this.cursorStore.current.subscribe(v => {
      if (v <= this.fieldGroup.length) {
        console.log("updating cursor");
        this.updateAtCursor(v);
      }
    });
  }

  initialize() {
    this.fieldGroup.forEach((_, i) => {
      console.log("initing", i);
      const cur = this.grafStore.nodes[i].field;
      this.fieldGroup[i].type = cur.type;
      this.fieldGroup[i].templateOptions.label = cur.key;
      this.fieldGroup[i].key = keyMaker(cur.key);
      this.fieldGroup[i].templateOptions.placeholder = cur.templateOptions.placeholder;
      this.fieldGroup[i].templateOptions.description = cur.templateOptions.label;
      console.log("fgi",this.fieldGroup[i], cur);
    })
    this.field.fieldGroup = this.fieldGroup;
    this.fields = [...this.fields];
  }

  updateAtCursor(cursor: number) {
    
    this.fieldGroup[cursor].className = "flex-2";
    this.changes.stream.subscribe((v) => {
      console.log("cont values", v);
      switch (v.id) {
        case FieldId.type:
          this.fieldGroup[cursor].type = v.value.trim();
          break;
        case FieldId.label:
          this.fieldGroup[cursor].templateOptions.label = v.value.trim();
          this.fieldGroup[cursor].key = keyMaker(v.value);
          console.log("trimmy trimmy trimmy", this.fieldGroup[cursor].key);
          break;
        case FieldId.placeholder:
          this.fieldGroup[cursor].templateOptions.placeholder = v.value.trim();
          break;
        case FieldId.description:
          this.fieldGroup[cursor].templateOptions.description = v.value.trim();
          break;
        default:
          console.log("woah");
          break;
      };
    });
    this.field.fieldGroup = this.fieldGroup;
    this.fields = [...this.fields];
    console.log("cursor fields post", this.fields);
  }

  onSubmit(model: any) {
    console.log(model, model === this.model, this.model);
  }

  ngOnInit(): void {
  }

}
