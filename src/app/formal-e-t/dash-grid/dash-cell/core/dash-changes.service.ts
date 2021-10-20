import {Injectable} from '@angular/core';
import {ChangeSettersService} from "./change-setters.service";
import {ChangeGettersService} from "./change-getters.service";
import {GrafStore} from "../../../../store/graf-store.service";
import {FormalField, TemplateOptions} from "../../../../shared/shared.model";

@Injectable({
  providedIn: 'root'
})
export class DashChangesService {

  constructor(
    private grafStore: GrafStore,
    public set: ChangeSettersService,
    public get: ChangeGettersService,
  ) {
    this.grafStore.current.subscribe(cursor => {
      if (cursor >= 0 && cursor < this.grafStore.nodes.length) {
        const field: FormalField = this.grafStore.nodes[cursor].field;
        const refs: TemplateOptions = field.templateOptions;
        if (refs) {
          this.set.label = refs.label;
          this.set.type = refs.type;
          this.set.description = refs.description;
          this.set.placeholder = refs.placeholder;

          this.set.id = field.id;
          this.set.options = refs.options;
          this.set.attributes = refs.attributes;
          this.set.pattern = refs.pattern;

          this.set.required = refs.required ?? false;
          this.set.disabled = refs.disabled ?? false;
          this.set.hidden = refs.hidden ?? false;
          this.set.readonly = refs.readonly ?? false;

          this.set.tabindex = refs.tabindex ?? cursor;
          this.set.max = refs.max ?? 1_000_000;
          this.set.min = refs.min ?? 0;
          this.set.step = refs.step ?? 1;

          const validation = field.validation;

          this.set.stepRule = validation.stepRule ?? "";
          this.set.tabindexRule = validation.tabindexRule ?? "";
          this.set.maxRule = validation.maxRule ?? "";
          this.set.minRule = validation.minRule ?? "";

          this.set.requiredRule = validation.requiredRule ?? "";
          this.set.readonlyRule = validation.readonlyRule ?? "";
          this.set.hiddenRule = validation.hiddenRule ?? "";
          this.set.disabledRule = validation.disabledRule ?? "";

          // Object.assign(this.set, refs);
          // Object.keys(refs).forEach((prop) => {
          //   if (this.set.hasOwnProperty(prop) && refs.hasOwnProperty(prop)) {
          //     this.set[prop] = refs[prop] ?? this.set[prop];
          //   }
          // });
        }
    }});
  }

}
