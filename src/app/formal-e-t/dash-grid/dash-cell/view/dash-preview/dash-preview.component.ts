import { AfterViewInit, Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Field, FieldType, FormlyFieldConfig } from '@ngx-formly/core';
import { merge } from 'rxjs';
import { FieldId } from 'src/app/shared/field.model';
import { FormalField } from 'src/app/shared/shared.model';
import { FormCursorStoreService } from 'src/app/store/form-cursor-store.service';
import { GrafStore } from 'src/app/store/graf-store.service';
import { DashChangesService } from '../../core/dash-changes.service';

const keyMaker = (key: string) => {
  return key.trim().toLowerCase().replace(/ /g, '_');
};

@Component({
  selector: 'app-dash-preview',
  templateUrl: './dash-preview.component.html',
  styleUrls: ['./dash-preview.component.scss'],
})
export class DashPreviewComponent implements AfterViewInit {
  form = new FormGroup({});
  model = {};

  fieldGroup!: FormalField[];

  field = {
    fieldGroupClassName: 'display-flex',
    fieldGroup: this.fieldGroup,
  };

  fields: FormlyFieldConfig[] = [this.field];

  cursor: number = 0;
  change: any = { id: 0 };

  formlyFormElem!: Element;

  constructor(
    private changes: DashChangesService,
    private cursorStore: FormCursorStoreService,
    private grafStore: GrafStore
  ) {
    this.coreUpdateMecha();
    this.updateWhenContentUpdates();
    this.updateWhenGraphUpdates();
  }

  ngAfterViewInit(): void {
    const form = (this.formlyFormElem = document.querySelector('formly-form')!);
    this.cursorStore.current.subscribe((c) => {
      const fields = () =>
        form.querySelectorAll('mat-form-field') as NodeListOf<HTMLElement>;

      function updateFieldMarker() {
        const feld = fields();
        feld.forEach((field) => (field.style.boxShadow = ''));
        if (!feld[c]) return;
        feld[c].style.boxShadow =
          '0 -5px 3px -3px purple, 0 5px 3px -3px purple';
      }

      const feld = fields();
      setTimeout(updateFieldMarker, 250);
    });
  }

  coreUpdateMecha() {
    this.fieldGroup = this.grafStore.edges.map((e) => e.origin.field);
    this.initialize();
  }

  updateWhenGraphUpdates() {
    this.grafStore.rxtiv().subscribe((_) => this.coreUpdateMecha());
  }

  initialize() {
    this.fieldGroup.forEach((_, i) => {
      const cur = this.grafStore.nodes[i].field;
      this.fieldGroup[i].type = cur.type.toLowerCase();
      this.fieldGroup[i].templateOptions.label = cur.key;
      this.fieldGroup[i].key = keyMaker(cur.key);
      this.fieldGroup[i].templateOptions.placeholder =
        cur.templateOptions.placeholder;
      this.fieldGroup[i].templateOptions.description =
        cur.templateOptions.label;
    });
    this.field.fieldGroup = this.fieldGroup;
    this.fields = [...this.fields];
  }

  updateWhenContentUpdates() {
    merge(this.cursorStore.current, this.changes.stream).subscribe((a) => {
      this.cursor = typeof a === 'number' ? a : this.cursor;
      this.change = typeof a !== 'number' ? a : this.change;

      if (this.change?.id && this.cursor < this.fieldGroup.length) {
        switch (this.change.id) {
          case FieldId.type: //1
            this.fieldGroup[this.cursor].type = this.change.value.trim().toLowerCase();
            break;
          case FieldId.label: //2
            this.fieldGroup[this.cursor].templateOptions.label = this.change.value.trim();
            this.fieldGroup[this.cursor].key = keyMaker(this.change.value);
            break;
          case FieldId.placeholder: //3
            this.fieldGroup[this.cursor].templateOptions.placeholder = this.change.value.trim();
            break;
          case FieldId.description: //4
            this.fieldGroup[this.cursor].templateOptions.description = this.change.value.trim();
            break;
          case FieldId.hidden: //5
            this.fieldGroup[this.cursor].templateOptions.hidden = this.change.value;
            break;
          case FieldId.readonly: //6
            this.fieldGroup[this.cursor].templateOptions.readonly = this.change.value;
            break;
          case FieldId.max: //7
            this.fieldGroup[this.cursor].templateOptions.max = this.change.value;
            this.fieldGroup[this.cursor].templateOptions.maxLength = this.change.value;
            break;
          case FieldId.min: //8
            this.fieldGroup[this.cursor].templateOptions.min = this.change.value;
            this.fieldGroup[this.cursor].templateOptions.minLength = this.change.value;
            break;
          case FieldId.options: //9
            this.fieldGroup[this.cursor].templateOptions.options = this.change.value;
            break;
          case FieldId.attributes: //10
            this.fieldGroup[this.cursor].templateOptions.attributes = this.change.value;
            break;
          case FieldId.pattern: //11
            this.fieldGroup[this.cursor].templateOptions.pattern = this.change.value;
            break;
          case FieldId.step: //12
            this.fieldGroup[this.cursor].templateOptions.step = this.change.value;
            break;
          case FieldId.tabindex: //13
            this.fieldGroup[this.cursor].templateOptions.tabindex = this.change.value;
            break;
          case FieldId.required: //14
            this.fieldGroup[this.cursor].templateOptions.required = this.change.value;
            break;
          case FieldId.disabled: //15
            this.fieldGroup[this.cursor].templateOptions.disabled = this.change.value;
            break;
          case FieldId.hidden: //16
            this.fieldGroup[this.cursor].templateOptions.hidden = this.change.value;
            break;
          default:
            console.log('woah');
            break;
        }
        this.field.fieldGroup[this.cursor] = this.fieldGroup[this.cursor];
        this.fields = [...this.fields];
      }
    });
  }

  onSubmit(model: any) {
    console.log(model, model === this.model, this.model);
  }
}
