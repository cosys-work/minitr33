import {ObservableStore} from "@codewithdan/observable-store";

import {Observable, ReplaySubject} from "rxjs";

import {Injectable} from "@angular/core";
import { SeedInitService } from "./seed-init.service";


export interface Graph {
  nodes: [];
  edges: [];
}

export enum Actions {
  INIT="INIT",
  REINIT="REINIT",
  EDIT="EDIT"
}

const bufferSize = 100;

@Injectable({
  providedIn: "root",
})
export class GrafStore extends ObservableStore<Graph> {

  protected storeStream = new ReplaySubject<Graph>(bufferSize);

  constructor(private seed: SeedInitService) {
    super({ trackStateHistory: true });
    this.setState(this.seed.graph, Actions.INIT);
    this.updateStoreStream();
  }

  private updateStoreStream() {
    this.storeStream.next(this.getState(true));
  }

  get state() {
    return this.getState(false);
  }

  set reset(gDef: Graph) {
    this.setState(gDef, Actions.REINIT);
    this.updateStoreStream();
  }

  set edit(part: Partial<Graph>) {
    const newState = { ...this.getState(true), ...part };
    this.setState(newState, Actions.EDIT);
    this.updateStoreStream();
  }

  rxtiv(): Observable<Graph> {
    return this.storeStream.asObservable();
  }

}
