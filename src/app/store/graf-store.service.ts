import {ObservableStore} from "@codewithdan/observable-store";

import {Observable, ReplaySubject} from "rxjs";

import {Injectable} from "@angular/core";
import { SeedInitService } from "./seed-init.service";
import { FEdge, FGraph, FNode } from "../shared/f-graph.model";

enum Actions {
  INIT="INIT_GRAF",
  REINIT="REINIT_GRAF",
  EDIT="EDIT_GRAF"
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
    console.log("core state", this.getState(true));
    this.updateStoreStream();
  }

  private updateStoreStream() {
    this.storeStream.next(this.getState(true));
  }

  get state(): FGraph {
    const { nodes, edges} = this.getState(true);
    console.log("getting core state", nodes, edges);
    return ({ nodes, edges });
  }

  get nodes(): FNode[] {
    return this.state.nodes;
  }

  get edges(): FEdge[] {
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
