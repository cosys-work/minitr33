import {AfterViewInit, Component, OnDestroy} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {FormlyFieldConfig} from '@ngx-formly/core';
import {FormalField} from 'src/app/shared/shared.model';
import {GrafStore} from 'src/app/store/graf-store.service';

import {AlKeysAlNumVals, FieldRefsAddons} from "../../../../../shared/field.model";
import {DashChangesService} from "../../../../../store/dash-changes.service";
import {Subscription} from "rxjs";

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

  fieldGroup: FormalField[] = [];

  field = {
    fieldGroupClassName: 'display-flex',
    fieldGroup: this.fieldGroup,
  };

  fields: FormlyFieldConfig[] = [this.field];

  cursor: number = 0;
  change: any = {id: 0};

  formlyFormElem!: Element;

  subs = new Subscription();

  constructor(
    private changes: DashChangesService,
    private grafStore: GrafStore
  ) {
    this.subs.add(this.grafStore.current.subscribe((c) => (this.cursor = c)));
    this.initialize();
  }

  initialize() {
    this.fieldGroup = this.grafStore.edges.map((e) => e.origin.field);
    if (this.fieldGroup.length) {
      const ns = this.grafStore.nodes;
      [...this.fieldGroup].forEach((_, i) => {
        const cur = ns[i].field;
        this.fieldGroup[i].type = cur.type.toLowerCase();
        this.fieldGroup[i].key = keyMaker(cur.key);
        this.fieldGroup[i].templateOptions = cur.templateOptions;
        this.fieldGroup[i].id = cur.id;
        this.fieldGroup[i].className = cur.className;
      });
      this.field.fieldGroup = this.fieldGroup;
      this.fields = [...this.fields];
    }
  }

  updateWhenGraphUpdates() {
    this.subs.add(this.grafStore.stateChanged.subscribe((z) => {
      this.fieldGroup = this.grafStore.nodes.map((e) => e.field);
      this.fieldGroup[z.curNode].type = z.nodes[z.curNode].field.type.toLowerCase();
      this.fieldGroup[z.curNode].key = keyMaker(z.nodes[z.curNode].field.key);
      this.fieldGroup[z.curNode].templateOptions = z.nodes[z.curNode].field.templateOptions;
      this.fieldGroup[z.curNode].id = z.nodes[z.curNode].field.id;
      this.fieldGroup[z.curNode].className = z.nodes[z.curNode].field.className;

      this.field.fieldGroup = this.fieldGroup;
      this.fields = [...this.fields];
    }));
  }


  ngAfterViewInit(): void {

    this.updateWhenContentUpdates();
    this.updateWhenGraphUpdates();

    const form = (this.formlyFormElem = document.querySelector('formly-form')!);
    this.subs.add(this.grafStore.current.subscribe((c) => {
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
    }));
  }



  tOptRuleUpdater(opt: keyof FieldRefsAddons, val: any) {
    const cursor = this.cursor;
    if (this?.fieldGroup[cursor]?.validation && this?.fieldGroup[cursor]?.validation[opt]) {
      this.fieldGroup[cursor].validation[opt] = val;
    }
    this.field.fieldGroup[cursor] = this.fieldGroup[cursor];
    this.fields = [...this.fields];
  }

  updateWhenContentUpdates() {

    this.subs.add(this.changes.get.labelStream.subscribe(l => {
      if (typeof l === "string") {
        this.fieldGroup[this.cursor].templateOptions.label = l;
        this.fieldGroup[this.cursor].key = keyMaker(l);
      }
    }));

    this.subs.add(this.changes.get.typeStream.subscribe(t => {
      const [typeA, typeB] = (t as string).trim().split(",");

      this.fieldGroup[this.cursor].type = typeA;
      if (typeB) {
        this.fieldGroup[this.cursor].templateOptions.type = typeB;
      }
    }));

    this.subs.add(this.changes.get.placeholderStream.subscribe((p) => {
      this.fieldGroup[this.cursor].templateOptions.placeholder = (p as string).trim();
    }));

    this.subs.add(this.changes.get.descriptionStream.subscribe((p) => {
      this.fieldGroup[this.cursor].templateOptions.description = (p as string).trim();
    }));

    this.subs.add(this.changes.get.optionsStream.subscribe((p) => {
      this.fieldGroup[this.cursor].templateOptions.options = p as any[];
    }));

    this.subs.add(this.changes.get.attributesStream.subscribe((p) => {
      this.fieldGroup[this.cursor].templateOptions.attributes = p as AlKeysAlNumVals;
    }));

    this.subs.add(this.changes.get.patternStream.subscribe((p) => {
      if (typeof p === "string") {
        this.fieldGroup[this.cursor].templateOptions.pattern = p;
      }
    }));

    this.subs.add(this.changes.get.hiddenStream.subscribe((p) => {
      if (typeof p === "boolean") {
        this.fieldGroup[this.cursor].templateOptions.hidden = p;
      }
    }));

    this.subs.add(this.changes.get.readonlyStream.subscribe((p) => {
      if (typeof p === "boolean") {
        this.fieldGroup[this.cursor].templateOptions.readonly = p;
      }
    }));

    this.subs.add(this.changes.get.requiredStream.subscribe((p) => {
      if (typeof p === "boolean") {
        this.fieldGroup[this.cursor].templateOptions.required = p;
      }
    }));

    this.subs.add(this.changes.get.disabledStream.subscribe((a) => {
      if (typeof a === "boolean") {
        this.fieldGroup[this.cursor].templateOptions.disabled = a;
      }
    }));

    this.subs.add(this.changes.get.maxStream.subscribe((p) => {
      if (typeof p === "number") {
        this.fieldGroup[this.cursor].templateOptions.max = p;
        this.fieldGroup[this.cursor].templateOptions.maxLength = p;
      }
    }));

    this.subs.add(this.changes.get.minStream.subscribe((p) => {
      if (typeof p === "number") {
        this.fieldGroup[this.cursor].templateOptions.min = p;
        this.fieldGroup[this.cursor].templateOptions.minLength = p;
      }
    }));

    this.subs.add(this.changes.get.stepStream.subscribe((p) => {
      if (typeof p === "number") {
        this.fieldGroup[this.cursor].templateOptions.step = p;
        this.fieldGroup[this.cursor].templateOptions.rows = p;
        this.fieldGroup[this.cursor].templateOptions.cols = p;
      }
    }));

    this.subs.add(this.changes.get.tabindexStream.subscribe((p) => {
      if (typeof p === "number") {
        this.fieldGroup[this.cursor].templateOptions.tabindex = p;
      }
    }));

    this.subs.add(this.changes.get.hiddenRuleStream.subscribe((p) => {
      this.tOptRuleUpdater("hiddenRule", p);
    }));

    this.subs.add(this.changes.get.readonlyRuleStream.subscribe((p) => {
      this.tOptRuleUpdater("readonlyRule", p);
    }));

    this.subs.add(this.changes.get.requiredRuleStream.subscribe((p) => {
      this.tOptRuleUpdater("requiredRule", p);
    }));

    this.subs.add(this.changes.get.disabledRuleStream.subscribe((a) => {
      this.tOptRuleUpdater("disabledRule", a);
    }));

    this.subs.add(this.changes.get.maxRuleStream.subscribe((p) => {
      this.tOptRuleUpdater("maxRule", p);
    }));

    this.subs.add(this.changes.get.minRuleStream.subscribe((p) => {
      this.tOptRuleUpdater("minRule", p);
    }));

    this.subs.add(this.changes.get.stepRuleStream.subscribe((p) => {
      this.tOptRuleUpdater("stepRule", p);
    }));

    this.subs.add(this.changes.get.tabindexRuleStream.subscribe((p) => {
      this.tOptRuleUpdater("tabindexRule", p);
    }));
  }

  onSubmit(model: any) {
    console.log(model, model === this.model, this.model);
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
