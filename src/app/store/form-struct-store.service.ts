import { Injectable } from '@angular/core';
import { ObservableStore } from '@codewithdan/observable-store';
import { FormalField } from '../shared/shared.model';
import { GrafStore } from './graf-store.service';

@Injectable({
  providedIn: 'root'
})
export class FormStructStoreService extends ObservableStore<Array<FormalField>> {

  constructor(private graphStore: GrafStore) { 
    super({trackStateHistory: true});

    const connectedFields: FormalField[] = this.graphStore.edges
      .map(n => n.origin.field!);
    
    this.setState(connectedFields);
  }

  get states(): FormalField[] {
    return this.getState(true);
  }

  set addField(fRef: FormalField) {
    this.setState([...this.states, fRef]);
  }
}
