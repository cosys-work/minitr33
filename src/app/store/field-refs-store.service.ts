import { Injectable } from '@angular/core';
import { ObservableStore } from '@codewithdan/observable-store';
import { merge } from 'rxjs';
import { switchAll } from 'rxjs/operators';
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

  updateRefs() {
    const refs = this.graphStore.nodes.map(n => fieldRefs(n.label, n.tag, n.title));
    const cont = { refs };
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
