import {ObservableStore} from "@codewithdan/observable-store";

import {Observable, ReplaySubject} from "rxjs";

import {Injectable} from "@angular/core";
import { SeedInitService } from "./seed-init.service";
import { FEdge, FGraph } from "../shared/f-graph.model";

export enum Actions {
  INIT="INIT",
  REINIT="REINIT",
  EDIT="EDIT"
}

const bufferSize = 100;

@Injectable({
  providedIn: "root",
})
export class GrafStore extends ObservableStore<FGraph> {

  protected storeStream = new ReplaySubject<FGraph>(bufferSize);

  constructor(private seed: SeedInitService) {
    super({ trackStateHistory: true });
    this.setState(this.seed.graph, Actions.INIT);
    this.updateStoreStream();
  }

  private updateStoreStream() {
    this.storeStream.next(this.getState(true));
  }

  get state() {
    return this.getState(true);
  }

  get nodes() {
    return this.state.nodes;
  }

  get edges() {
    return this.state.edges;
  }

  set delete(fez: FEdge) {
    const edges: FEdge[] = this.edges.filter(e => e.origin.id === fez.origin.id);
    this.edit(edges); // updates stream too
  }

  set reset(gDef: FGraph) {
    this.setState(gDef, Actions.REINIT);
    this.updateStoreStream();
  }

  edit(edges: FGraph['edges']) {
    const newState: FGraph = { ...this.state, edges };
    this.setState(newState, Actions.EDIT);
    this.updateStoreStream();
  }

  rxtiv(): Observable<FGraph> {
    return this.storeStream.asObservable();
  }

}
