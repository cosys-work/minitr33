import { AfterViewInit, Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
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
    this.cursorStore.current.subscribe((c) => (this.cursor = c));
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
        cur.templateOptions.description;
    });
    this.field.fieldGroup = this.fieldGroup;
    this.fields = [...this.fields];
  }

  updateWhenContentUpdates() {
    console.log('outside the changer', this.cursor, this.change.id);
    
      this.changes.labelStrm.subscribe(l => {
        this.fieldGroup[this.cursor].templateOptions.label = l.value;
        this.fieldGroup[this.cursor].key = keyMaker(l.value);
        console.log('inside the label changer', this.cursor, this.change.id, l.value);
      });

      this.changes.typeStrm.subscribe(t => {
        this.fieldGroup[this.cursor].type = t.value
          .trim()
          .toLowerCase();
        console.log('inside the type changer', this.cursor, this.change.id, t.value);
      });

      this.changes.placeStrm.subscribe((p) => {
        this.fieldGroup[this.cursor].templateOptions.placeholder =
          p.value.trim();
        console.log(
          'inside the placeholder changer',
          this.cursor,
          this.change.id,
          p.value
        );
      });

      this.changes.descStrm.subscribe((p) => {
        this.fieldGroup[this.cursor].templateOptions.description =
          p.value.trim();
        console.log(
          'inside the description changer',
          this.cursor,
          this.change.id,
          p.value
        );
      });

      this.changes.hiddenStrm.subscribe((p) => {
        this.fieldGroup[this.cursor].templateOptions.hidden = p.value;
        console.log(
          'inside the hidden changer',
          this.cursor,
          this.change.id,
          p.value
        );
      });

      this.changes.readonlyStrm.subscribe((p) => {
        console.log(
          'inside the readonly changer',
          this.cursor,
          this.change.id,
          p.value
        );
        this.fieldGroup[this.cursor].templateOptions.readonly =
          p.value;
      });

      this.changes.maxStrm.subscribe((p) => {
        this.fieldGroup[this.cursor].templateOptions.max = p.value;
        this.fieldGroup[this.cursor].templateOptions.maxLength =
          this.change.value;
        console.log(
          'inside the max changer',
          this.cursor,
          this.change.id,
          p.value
        );
      });

      this.changes.minStrm.subscribe((p) => {
        this.fieldGroup[this.cursor].templateOptions.min = p.value;
        this.fieldGroup[this.cursor].templateOptions.minLength =
          this.change.value;
        console.log('inside the min changer', this.cursor, this.change.id, p.value);
      });

      this.changes.optionsStrm.subscribe((p) => {
        this.fieldGroup[this.cursor].templateOptions.options =
          p.value;
        console.log('inside the options changer', this.cursor, this.change.id, p.value);
      });

      this.changes.attributesStrm.subscribe((p) => {
        this.fieldGroup[this.cursor].templateOptions.attributes =
          p.value;
        console.log(
          'inside the atttributes changer',
          this.cursor,
          this.change.id,
          p.value
        );
      });

      this.changes.patternStrm.subscribe((p) => {
        this.fieldGroup[this.cursor].templateOptions.pattern =
          p.value;
        console.log('inside the pattern changer', this.cursor, this.change.id, p.value);
      });

      this.changes.stepStrm.subscribe((p) => {
        this.fieldGroup[this.cursor].templateOptions.step = p.value;
        console.log('inside the step changer', this.cursor, this.change.id, p.value);
      });

      this.changes.tabindexStrm.subscribe((p) => {
        this.fieldGroup[this.cursor].templateOptions.tabindex =
          p.value;
        console.log('inside the tabindex changer', this.cursor, p.value);
      });

      this.changes.requiredStrm.subscribe((p) => {
        this.fieldGroup[this.cursor].templateOptions.required =
          p.value;
        console.log(
          'inside the required changer',
          this.cursor,
          this.change.id,
          p.value
        );
      });

      this.changes.disabledStrm.subscribe((a) => {
        this.fieldGroup[this.cursor].templateOptions.disabled =
          a.value;
        console.log(
          'inside the disabled changer',
          this.cursor,
          this.change.id,
          a.value
        );
      });

      this.field.fieldGroup[this.cursor] = this.fieldGroup[this.cursor];
      this.fields = [...this.fields];
    
  }

  onSubmit(model: any) {
    console.log(model, model === this.model, this.model);
  }
}
