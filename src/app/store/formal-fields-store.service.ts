import { Injectable } from '@angular/core';
import { ObservableStore } from '@codewithdan/observable-store';
import { makeFormalField } from '../shared/field.model';
import { FormalField } from '../shared/shared.model';
import { GrafStore } from './graf-store.service';

export interface FormalFields {
  fields: FormalField[];
}

enum Actions {
  INIT="INIT_REFS",
  EDIT="EDIT_REFS"
}

@Injectable({
  providedIn: 'root'
})
export class FormalFieldsStoreService extends ObservableStore<FormalFields> {


  constructor(
    private graphStore: GrafStore
  ) { 
    super({trackStateHistory: true});
    this.updateRefs(Actions.INIT);
    this.graphStore.rxtiv().subscribe(_ => {
      this.updateRefs(Actions.EDIT);
    })
  }

  private updateRefs(act: Actions = Actions.EDIT) {
    const fields = this.graphStore.nodes
      .map(n => n.field?.type ? 
        n.field : 
        makeFormalField(n.label, n.tag, n.title, n.field.type)
      );
    const cont: FormalFields = { fields };
    this.setState(cont, act);
  }

  get state(): FormalFields['fields'] {
    return this.getState(true).fields;
  }

}
