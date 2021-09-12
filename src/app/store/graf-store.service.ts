import { T } from "@angular/cdk/keycodes";
import { Injectable } from "@angular/core";
import { ObservableStore } from "@codewithdan/observable-store";
import { Subject } from "rxjs";
import { FEdge, FGraph, FNode } from "../shared/f-graph.model";
import { SeedInitService } from "./seed-init.service";



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

  private actionStream = new Subject<FGraph>();

  constructor(private seed: SeedInitService) {
    super({ trackStateHistory: true });
    this.setState(this.seed.graph, Actions.INIT);
    console.log("core state", this.getState(true));
  }

  get state(): FGraph {
    const { nodes, edges} = this.getState(true);
    console.log("getting core state", nodes, edges);
    return ({ nodes, edges });
  }

  get nodes(): FNode[] {
    const { nodes } = this.getState(true);
    return nodes;
  }

  get edges(): FEdge[] {
    const { edges } = this.getState(true);
    return edges;
  }

  set markRemoved(fez: FEdge) {
    const edges: FEdge[] = this.edges.filter(e => e.origin.id === fez.origin.id);
    this.newEdges = edges; // updates stream too
  }

  set newGraph(gDef: FGraph) {
    this.setState(gDef, Actions.REINIT);
    this.actionStream.next(gDef);
  }

  set newEdges(edges: FGraph['edges']) {
    const newState: FGraph = { ...this.state, edges };
    this.setState(newState, Actions.EDIT);
    this.actionStream.next(newState);
  }

  addEdge() {
    const emptyEdge = this.seed.edgeMaker(this.edges.length);
    const adage = { ...this.edges, };
    this.newEdges = adage; // updates stream too
  }

}
