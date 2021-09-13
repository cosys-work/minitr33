import { Injectable } from "@angular/core";
import { ObservableStore } from "@codewithdan/observable-store";
import { Observable, Subject } from "rxjs";
import { FEdge, FGraph, FNode } from "../shared/f-graph.model";
import { SeedInitService } from "./seed-init.service";

enum Actions {
  INIT="INIT_GRAF",
  REINIT="REINIT_GRAF",
  EDIT="EDIT_GRAF"
}

@Injectable({
  providedIn: "root",
})
export class GrafStore extends ObservableStore<FGraph> {

  private actionStream = new Subject<FGraph>();

  constructor(private seed: SeedInitService) {
    super({ trackStateHistory: true });
    this.setState(this.seed.graph, Actions.INIT);
  }

  rxtiv(): Observable<FGraph> {
    return this.actionStream.asObservable();
  }

  get state(): FGraph {
    const { nodes, edges} = this.getState(true);
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
    const newNods: FNode[] = edges.map(e => e.origin);
    this.newNodes = newNods;
    this.actionStream.next(newState);
  }

  private set newNodes(nodes: FGraph['nodes']) {
    const newState: FGraph = { ...this.state, nodes };
    this.setState(newState, Actions.EDIT);
  }

  addEdge() {
    const emptyEdge = this.seed.edgeMaker(this.edges.length);
    const adage = [ ...this.edges, emptyEdge];
    this.newEdges = adage; // updates stream too
  }

}
