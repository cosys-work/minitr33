import { Injectable } from '@angular/core';
import { ObservableStore } from '@codewithdan/observable-store';
import { fieldRefs, FieldRefs } from '../shared/field.model';
import { GrafStore } from './graf-store.service';


@Injectable({
  providedIn: 'root'
})
export class FieldRefsStoreService extends ObservableStore<Array<FieldRefs>> {

  constructor(private graphStore: GrafStore) { 
    super({trackStateHistory: true});


    const labels: FieldRefs[] = this.graphStore.nodes
      .map(n => fieldRefs(n.label, n.tag, n.title));
    
    this.setState(labels);
  }

  get states(): FieldRefs[] {
    return this.getState(true);
  }

  set addField(fRef: FieldRefs) {
    this.setState([...this.states, fRef]);
  }
}
