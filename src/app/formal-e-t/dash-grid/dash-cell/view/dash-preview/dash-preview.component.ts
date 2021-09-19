import {AfterViewInit, Component, OnDestroy} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {FormlyFieldConfig} from '@ngx-formly/core';
import {FormalField} from 'src/app/shared/shared.model';
import {FormCursorStoreService} from 'src/app/store/form-cursor-store.service';
import {GrafStore} from 'src/app/store/graf-store.service';
import {DashChangesService} from '../../core/dash-changes.service';
import {FieldRefsAddons} from "../../../../../shared/field.model";

const keyMaker = (key: string) => {
  return key.trim().toLowerCase().replace(/ /g, '_');
};

@Component({
  selector: 'app-dash-preview',
  templateUrl: './dash-preview.component.html',
  styleUrls: ['./dash-preview.component.scss'],
})
export class DashPreviewComponent implements AfterViewInit, OnDestroy {
  form = new FormGroup({});
  model = {};

  fieldGroup!: FormalField[];

  field = {
    fieldGroupClassName: 'display-flex',
    fieldGroup: this.fieldGroup,
  };

  fields: FormlyFieldConfig[] = [this.field];

  cursor: number = 0;
  change: any = {id: 0};

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
      this.fieldGroup[i].key = keyMaker(cur.key);
      this.fieldGroup[i].templateOptions = cur.templateOptions;
      this.fieldGroup[i].id = cur.id;
      this.fieldGroup[i].className = cur.className;
    });
    this.field.fieldGroup = this.fieldGroup;
    this.fields = [...this.fields];
  }

  tOptRuleUpdater(opt: keyof FieldRefsAddons, val: any) {

    if (this?.fieldGroup[this.cursor]?.validation && this?.fieldGroup[this.cursor]?.validation[opt]) {
      this.fieldGroup[this.cursor].validation[opt] = val;
    }
    this.updater();
  }

  updater() {
    this.field.fieldGroup[this.cursor] = this.fieldGroup[this.cursor];
    this.fields = [...this.fields];
  }

  updateWhenContentUpdates() {
    this.changes.get.labelStream.subscribe(l => {
      this.fieldGroup[this.cursor].templateOptions.label = l.value;
      this.fieldGroup[this.cursor].key = keyMaker(l.value);
    });

    this.changes.get.typeStream.subscribe(t => {
      this.fieldGroup[this.cursor].templateOptions.type = t.value.trim().toLowerCase();
    });

    this.changes.get.placeholderStream.subscribe((p) => {
      this.fieldGroup[this.cursor].templateOptions.placeholder = p.value.trim();
    });

    this.changes.get.descriptionStream.subscribe((p) => {
      this.fieldGroup[this.cursor].templateOptions.description = p.value.trim();
    });

    this.changes.get.optionsStream.subscribe((p) => {
      this.fieldGroup[this.cursor].templateOptions.options = p.value;
    });

    this.changes.get.attributesStream.subscribe((p) => {
      this.fieldGroup[this.cursor].templateOptions.attributes = p.value;
    });

    this.changes.get.patternStream.subscribe((p) => {
      this.fieldGroup[this.cursor].templateOptions.pattern = p.value;
    });


    this.changes.get.hiddenStream.subscribe((p) => {
      this.fieldGroup[this.cursor].templateOptions.hidden = p.value;
    });
    this.changes.get.readonlyStream.subscribe((p) => {
      this.fieldGroup[this.cursor].templateOptions.readonly = p.value;
    });
    this.changes.get.requiredStream.subscribe((p) => {
      this.fieldGroup[this.cursor].templateOptions.required = p.value;
    });
    this.changes.get.disabledStream.subscribe((a) => {
      this.fieldGroup[this.cursor].templateOptions.disabled = a.value;
    });

    this.changes.get.maxStream.subscribe((p) => {
      this.fieldGroup[this.cursor].templateOptions.max = p.value;
      this.fieldGroup[this.cursor].templateOptions.maxLength = p.value;
    });
    this.changes.get.minStream.subscribe((p) => {
      this.fieldGroup[this.cursor].templateOptions.min = p.value;
      this.fieldGroup[this.cursor].templateOptions.minLength = p.value;
    });
    this.changes.get.stepStream.subscribe((p) => {
      this.fieldGroup[this.cursor].templateOptions.step = p.value;
      this.fieldGroup[this.cursor].templateOptions.rows = p.value;
      this.fieldGroup[this.cursor].templateOptions.cols = p.value;
    });
    this.changes.get.tabindexStream.subscribe((p) => {
      this.fieldGroup[this.cursor].templateOptions.tabindex = p.value;
    });


    this.changes.get.hiddenRuleStream.subscribe((p) => {
      this.tOptRuleUpdater("hiddenRule", p.value);
    });
    this.changes.get.readonlyRuleStream.subscribe((p) => {
      this.tOptRuleUpdater("readonlyRule", p.value);
    });
    this.changes.get.requiredRuleStream.subscribe((p) => {
      this.tOptRuleUpdater("requiredRule", p.value);
    });
    this.changes.get.disabledRuleStream.subscribe((a) => {
      this.tOptRuleUpdater("disabledRule", a.value);
    });

    this.changes.get.maxRuleStream.subscribe((p) => {
      this.tOptRuleUpdater("maxRule", p.value);
    });
    this.changes.get.minRuleStream.subscribe((p) => {
      this.tOptRuleUpdater("minRule", p.value);
    });
    this.changes.get.stepRuleStream.subscribe((p) => {
      this.tOptRuleUpdater("stepRule", p.value);
    });
    this.changes.get.tabindexRuleStream.subscribe((p) => {
      this.tOptRuleUpdater("tabindexRule", p.value);
    });
  }

  onSubmit(model: any) {
    console.log(model, model === this.model, this.model);
  }

  ngOnDestroy(): void {
  }
}
