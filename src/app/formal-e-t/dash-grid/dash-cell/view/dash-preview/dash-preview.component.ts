import {AfterViewInit, Component} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {FormlyFieldConfig} from '@ngx-formly/core';
import {FormalField} from 'src/app/shared/shared.model';
import {GrafStore} from 'src/app/store/graf-store.service';

import {AlKeyAlNumValObj, FieldRefsAddons} from "../../../../../shared/field.model";
import {DashChangesService} from "../../../../../store/dash-changes.service";
import {takeUntil, zip} from "rxjs";
import {StatefulnessComponent} from "../../../../../shared/statefulness/statefulness.component";

@Component({
  selector: 'app-dash-preview',
  templateUrl: './dash-preview.component.html',
  styleUrls: ['./dash-preview.component.scss'],
})
export class DashPreviewComponent extends StatefulnessComponent implements AfterViewInit {
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

  constructor(
    private changes: DashChangesService,
    private grafStore: GrafStore
  ) {
    super();
    this.grafStore.current.pipe(takeUntil(this.onDestroy$)).subscribe((c) => (this.cursor = c));
    this.initialize();
  }

  initialize() {
    this.fieldGroup = this.grafStore.edges.map((e) => e.origin.field);
    if (this.fieldGroup.length) {
      const ns = this.grafStore.nodes;
      [...this.fieldGroup].forEach((_, i) => {
        const cur = ns[i].field;
        this.fieldGroup[i].type = cur.type;
        this.fieldGroup[i].key = cur.key;
        this.fieldGroup[i].templateOptions = cur.templateOptions;
        this.fieldGroup[i].id = cur.id;
        this.fieldGroup[i].className = cur.className;
      });
      this.field.fieldGroup = this.fieldGroup;
      this.fields = [...this.fields];
    }
  }

  updateWhenGraphUpdates() {
    this.grafStore.stateChanged.pipe(takeUntil(this.onDestroy$)).subscribe((z) => {
      this.fieldGroup = this.grafStore.nodes.map((e) => e.field);
      this.fieldGroup[z.curNode].type = z.nodes[z.curNode].field.type;
      this.fieldGroup[z.curNode].key = z.nodes[z.curNode].field.key;
      this.fieldGroup[z.curNode].templateOptions = z.nodes[z.curNode].field.templateOptions;
      this.fieldGroup[z.curNode].id = z.nodes[z.curNode].field.id;
      this.fieldGroup[z.curNode].className = z.nodes[z.curNode].field.className;

      this.field.fieldGroup = this.fieldGroup;
      this.fields = [...this.fields];
    });
  }


  ngAfterViewInit(): void {

    this.updateWhenContentUpdates();
    this.updateWhenGraphUpdates();

    const form = (this.formlyFormElem = document.querySelector('formly-form')!);
    this.grafStore.current.pipe(takeUntil(this.onDestroy$)).subscribe((c) => {
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



  tOptRuleUpdater(opt: keyof FieldRefsAddons, val: any) {
    const cursor = this.cursor;
    if (this?.fieldGroup[cursor]?.validation && this?.fieldGroup[cursor]?.validation[opt]) {
      this.fieldGroup[cursor].validation[opt] = val;
    }
    this.field.fieldGroup[cursor] = this.fieldGroup[cursor];
    this.fields = [...this.fields];
  }

  // TO DO refactor to use a well-typed stream map + remove redundancy
  updateWhenContentUpdates() {

    this.changes.get.labelStream.pipe(takeUntil(this.onDestroy$)).subscribe(l => {
      if (typeof l === "string") {
        this.fieldGroup[this.cursor].templateOptions.label = l;
        this.fieldGroup[this.cursor].key = l;
      }
    });

    zip(
      this.changes.get.coreTypeStream,
      this.changes.get.typeStream
    ).pipe((takeUntil(this.onDestroy$))).subscribe(([typeA, typeB]) => {
      this.fieldGroup[this.cursor].type = typeA as string;
      if (typeB) {
        this.fieldGroup[this.cursor].templateOptions.type = typeB as string;
      }
    });

    this.changes.get.placeholderStream.pipe(takeUntil(this.onDestroy$)).subscribe((p) => {
      this.fieldGroup[this.cursor].templateOptions.placeholder = (p as string).trim();
    });

    this.changes.get.descriptionStream.pipe(takeUntil(this.onDestroy$)).subscribe((p) => {
      this.fieldGroup[this.cursor].templateOptions.description = (p as string).trim();
    });

    this.changes.get.optionsStream.pipe(takeUntil(this.onDestroy$)).subscribe((p) => {
      this.fieldGroup[this.cursor].templateOptions.options = p as any[];
    });

    this.changes.get.attributesStream.pipe(takeUntil(this.onDestroy$)).subscribe((p) => {
      this.fieldGroup[this.cursor].templateOptions.attributes = p as AlKeyAlNumValObj;
    });

    this.changes.get.patternStream.pipe(takeUntil(this.onDestroy$)).subscribe((p) => {
      if (typeof p === "string") {
        this.fieldGroup[this.cursor].templateOptions.pattern = p;
      }
    });

    this.changes.get.hiddenStream.pipe(takeUntil(this.onDestroy$)).subscribe((p) => {
      if (typeof p === "boolean") {
        this.fieldGroup[this.cursor].templateOptions.hidden = p;
      }
    });

    this.changes.get.readonlyStream.pipe(takeUntil(this.onDestroy$)).subscribe((p) => {
      if (typeof p === "boolean") {
        this.fieldGroup[this.cursor].templateOptions.readonly = p;
      }
    });

    this.changes.get.requiredStream.pipe(takeUntil(this.onDestroy$)).subscribe((p) => {
      if (typeof p === "boolean") {
        this.fieldGroup[this.cursor].templateOptions.required = p;
      }
    });

    this.changes.get.disabledStream.pipe(takeUntil(this.onDestroy$)).subscribe((a) => {
      if (typeof a === "boolean") {
        this.fieldGroup[this.cursor].templateOptions.disabled = a;
      }
    });

    this.changes.get.maxStream.pipe(takeUntil(this.onDestroy$)).subscribe((p) => {
      if (typeof p === "number") {
        this.fieldGroup[this.cursor].templateOptions.max = p;
        this.fieldGroup[this.cursor].templateOptions.maxLength = p;
      }
    });

    this.changes.get.minStream.pipe(takeUntil(this.onDestroy$)).subscribe((p) => {
      if (typeof p === "number") {
        this.fieldGroup[this.cursor].templateOptions.min = p;
        this.fieldGroup[this.cursor].templateOptions.minLength = p;
      }
    });

    this.changes.get.stepStream.pipe(takeUntil(this.onDestroy$)).subscribe((p) => {
      if (typeof p === "number") {
        this.fieldGroup[this.cursor].templateOptions.step = p;
        this.fieldGroup[this.cursor].templateOptions.rows = p;
        this.fieldGroup[this.cursor].templateOptions.cols = p;
      }
    });

    this.changes.get.tabindexStream.pipe(takeUntil(this.onDestroy$)).subscribe((p) => {
      if (typeof p === "number") {
        this.fieldGroup[this.cursor].templateOptions.tabindex = p;
      }
    });

    this.changes.get.hiddenRuleStream.pipe(takeUntil(this.onDestroy$)).subscribe((p) => {
      this.tOptRuleUpdater("hiddenRule", p);
    });

    this.changes.get.readonlyRuleStream.pipe(takeUntil(this.onDestroy$)).subscribe((p) => {
      this.tOptRuleUpdater("readonlyRule", p);
    });

    this.changes.get.requiredRuleStream.pipe(takeUntil(this.onDestroy$)).subscribe((p) => {
      this.tOptRuleUpdater("requiredRule", p);
    });

    this.changes.get.disabledRuleStream.pipe(takeUntil(this.onDestroy$)).subscribe((a) => {
      this.tOptRuleUpdater("disabledRule", a);
    });

    this.changes.get.maxRuleStream.pipe(takeUntil(this.onDestroy$)).subscribe((p) => {
      this.tOptRuleUpdater("maxRule", p);
    });

    this.changes.get.minRuleStream.pipe(takeUntil(this.onDestroy$)).subscribe((p) => {
      this.tOptRuleUpdater("minRule", p);
    });

    this.changes.get.stepRuleStream.pipe(takeUntil(this.onDestroy$)).subscribe((p) => {
      this.tOptRuleUpdater("stepRule", p);
    });

    this.changes.get.tabindexRuleStream.pipe(takeUntil(this.onDestroy$)).subscribe((p) => {
      this.tOptRuleUpdater("tabindexRule", p);
    });
  }

  onSubmit(model: any) {
    console.log("submittable: ", model);
  }
}
