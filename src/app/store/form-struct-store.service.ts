import { Injectable } from '@angular/core';
import { ObservableStore } from '@codewithdan/observable-store';
import { FormalField } from '../shared/shared.model';
import { GrafStore } from './graf-store.service';

export interface AllFields {
  fields: FormalField[];
}

enum Actions {
  INIT="INIT_STRC",
  REINIT="REINIT_STRC",
  EDIT="EDIT_STRC"
}

@Injectable({
  providedIn: 'root'
})
export class FormStructStoreService extends ObservableStore<AllFields> {

  stubbornState!: FormalField[];

  constructor(private graphStore: GrafStore) { 
    super({trackStateHistory: true});

    const fields: FormalField[] = this.graphStore.nodes
      .map(n => n.field);

    console.log("constructor, formalFields", this.graphStore.nodes[0].field, this.graphStore.nodes[1].field);
    this.stubbornState = [this.graphStore.nodes[0].field, this.graphStore.nodes[1].field];
    console.log("alles", this.stubbornState[0], this.stubbornState[1]);
    console.log("history", )
  }

  get state(): AllFields['fields'] {
    const feelds = this.stubbornState;
    console.log("getting field states", feelds);
    return feelds;
  }

  set addField(field: FormalField) {
    const fields: FormalField[] = this.state;
    this.setState({ fields, ...field}, Actions.EDIT);
  }
}
