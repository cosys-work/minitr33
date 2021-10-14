import {Injectable} from '@angular/core';
import {ObservableStore} from '@codewithdan/observable-store';
import {merge} from 'rxjs';
import {FullFieldRefs} from '../shared/field.model';
import {FormCursorStoreService} from './form-cursor-store.service';
import {GrafStore} from './graf-store.service';
import {fieldRefs} from "./seed-init.utils";

export interface FieldContainer {
  refs: FullFieldRefs[];
}

enum Actions {
  INIT="INIT_REFS",
  EDIT="EDIT_REFS"
}

@Injectable({
  providedIn: 'root'
})
export class FieldRefsStoreService extends ObservableStore<FieldContainer> {

  constructor(
    private graphStore: GrafStore,
    private cursorStore: FormCursorStoreService
  ) {
    super({trackStateHistory: true});

    merge(
      this.graphStore.rxtiv(),
      this.cursorStore.rxtiv()
    ).subscribe(_ => {
      this.updateRefs();
    })
  }

  updateRefs() {
    // rerun for every field for now, optimize later if there's any slowdown or potential speed gain
    // because some fields are inter-connected
    const refs = this.graphStore.nodes.map(n => fieldRefs(
      n.label ?? n.field.templateOptions.label,
      n.tag ?? n.field.templateOptions.placeholder,
      n.title ?? n.field.templateOptions.description,
      n.field.type,
      n.field.templateOptions.pattern,
      n.field.templateOptions.options,
      n.field.templateOptions.attributes,
      n.field.templateOptions.tabindex,
      n.field.templateOptions.required,
      n.field.templateOptions.disabled,
      n.field.templateOptions.hidden,
      n.field.templateOptions.readonly,
      n.field.templateOptions.max,
      n.field.templateOptions.min,
      n.field.templateOptions.step,
      n.field.id,
      n.field.validation?.tabindexRule,
      n.field.validation?.requiredRule,
      n.field.validation?.disabledRule,
      n.field.validation?.hiddenRule,
      n.field.validation?.readonlyRule,
      n.field.validation?.maxRule,
      n.field.validation?.minRule,
      n.field.validation?.stepRule
    ));
    const cont = { refs };
    console.log("orig ref", cont);
    this.setState(cont, Actions.INIT);
  }

  get state(): FieldContainer['refs'] {
    return this.getState(true).refs;
  }

}
