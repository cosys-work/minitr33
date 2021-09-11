import { Injectable } from "@angular/core";
import { ObservableStore } from "@codewithdan/observable-store";
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

  set delete(fez: FEdge) {
    const edges: FEdge[] = this.edges.filter(e => e.origin.id === fez.origin.id);
    this.edit(edges); // updates stream too
  }

  set reset(gDef: FGraph) {
    this.setState(gDef, Actions.REINIT);
  }

  edit(edges: FGraph['edges']) {
    const newState: FGraph = { ...this.state, edges };
    this.setState(newState, Actions.EDIT);
  }

}
