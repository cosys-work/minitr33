import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FieldType, FormlyFieldConfig } from '@ngx-formly/core';
import { merge } from 'rxjs';
import { filter, map, switchMap, withLatestFrom } from 'rxjs/operators';
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

  cursor: number = 0;
  change: any = { id: 0 };

  constructor(
    private changes: DashChangesService, 
    private cursorStore: FormCursorStoreService,
    private grafStore: GrafStore
  ) {
    this.fieldGroup = this.grafStore.edges.map(e => e.origin.field);

    this.initialize();
    this.updateAtCursor();

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

  updateAtCursor() {

    merge(
      this.cursorStore.current,
      this.changes.stream
    ).subscribe(a => {
      this.cursor = typeof a === "number" ? a : this.cursor;
      this.change = typeof a !== "number" ? a : this.change;

      console.log("cont values", this.change);
      if (this.change?.id) {
      switch (this.change.id) {
        case FieldId.type:
          this.fieldGroup[this.cursor].type = this.change.value.trim();
          break;
        case FieldId.label:
          this.fieldGroup[this.cursor].templateOptions.label = this.change.value.trim();
          this.fieldGroup[this.cursor].key = keyMaker(this.change.value);
          console.log("trimmy trimmy trimmy", this.fieldGroup[this.cursor].key);
          break;
        case FieldId.placeholder:
          this.fieldGroup[this.cursor].templateOptions.placeholder = this.change.value.trim();
          break;
        case FieldId.description:
          this.fieldGroup[this.cursor].templateOptions.description = this.change.value.trim();
          break;
        default:
          console.log("woah");
          break;
      }
      this.field.fieldGroup = this.fieldGroup;
      this.fields = [...this.fields];
      console.log("cursor fields post", this.fields);
    };
    });
  }

  onSubmit(model: any) {
    console.log(model, model === this.model, this.model);
  }

  ngOnInit(): void {
  }

}
