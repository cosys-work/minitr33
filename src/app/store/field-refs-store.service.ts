import { Injectable } from '@angular/core';
import { ObservableStore } from '@codewithdan/observable-store';
import { merge } from 'rxjs';
import { fieldRefs, FieldRefs } from '../shared/field.model';
import { FormCursorStoreService } from './form-cursor-store.service';
import { GrafStore } from './graf-store.service';

export interface FieldContainer {
  refs: FieldRefs[];
}

enum Actions {
  INIT="INIT_REFS",
  REINIT="REINIT_REFS",
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

  // label: string,
  // placeholder: string,
  // description: string,
  // type: string,
  // pattern?: string,
  // options?: string,
  // attributes?: string,
  // required?: string,
  // disabled?: string,
  // hidden?: string,
  // readonly?: string,
  // tabindex?: string,
  // maximum?: string,
  // minimum?: string,
  // step?: string,
  // id?: string,

  updateRefs() {
    const refs = this.graphStore.nodes.map(n => fieldRefs(
      n.label ?? n.field.templateOptions.label, 
      n.tag ?? n.field.templateOptions.placeholder, 
      n.title ?? n.field.templateOptions.description, 
      n.field.type, 
      n.field.templateOptions.pattern,
      n.field.templateOptions.options,
      n.field.templateOptions.attributes,
      n.field.templateOptions.required,
      n.field.templateOptions.disabled,
      n.field.templateOptions.hidden,
      n.field.templateOptions.readonly,
      n.field.templateOptions.tabindex,
      n.field.templateOptions.max,
      n.field.templateOptions.min,
      n.field.templateOptions.step,
      n.field.id,
    ));
    const cont = { refs };
    console.log("orig ref", cont);
    this.setState(cont, Actions.INIT);
  }

  get state(): FieldContainer['refs'] {
    return this.getState(true).refs;
  }

  set addField(refs: FieldRefs) {
    const oldRefs = { refs: this.state };
    this.setState({...oldRefs, ...refs}, Actions.EDIT);
  }
}
