import { E, P } from "@angular/cdk/keycodes";
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

  set delNodeEdgePair(fez: FEdge) {
    if (!fez) return;
    if (!this.edges.length) return;

    const edgeToRemoveArr: FEdge[] = this.edges.filter(e => {
      return e.label === fez.label;
    });
    
    if (!edgeToRemoveArr.length) return;

    const edgeToRemove = edgeToRemoveArr[0];
    const nodeToRemove = edgeToRemove.origin;


    // TODO refactor so as to not assume that the nodes and edges 
    // are guaranteed to remain ordered despite of state changes
    const eIndex = this.edges.findIndex(e => e.origin.id === edgeToRemove.origin.id);
    const nIndex = this.nodes.findIndex(n => n.id === nodeToRemove.id);

    const nextNode = this.nodes[nIndex + 1] ?? null;

    const allEdgesBefore = this.edges.slice(0, eIndex);
    const allEdgesAfter = this.edges.slice(eIndex + 1);

    const prevEdgeToModify = this.edges[eIndex - 1] ?? null;
    if (prevEdgeToModify) {
      allEdgesBefore[allEdgesBefore.length - 1].target = nextNode?.id;
    }

    // else we are removing the root node, no edits needed 
    // other than yeeting off the current node-edge pair ofc
    // nodes are pruned off automatically by the structure
    this.newEdges = [...allEdgesBefore, ...allEdgesAfter];    
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
