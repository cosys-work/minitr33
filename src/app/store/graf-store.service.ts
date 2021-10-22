import {Injectable} from "@angular/core";
import {ObservableStore} from "@codewithdan/observable-store";
import {Observable} from "rxjs";
import {FEdge, FNode, ZenFGraph} from "../shared/f-graph.model";
import {SeedInitService} from "./seed-init.service";
import {distinctUntilChanged, map} from "rxjs/operators";
import {FormalField} from "../shared/shared.model";

enum Action {
  INIT="INIT_GRAF",
  NEW_NODES="NEW_NODES",
  NEW_EDGES="NEW_EDGES",
  NEXT="NEXT_CRSR_GRAF",
  PREV="PREV_CRSR_GRAF"
}

enum Property {
  NODES = "nodes",
  EDGES = "edges",
  CUR_NODE = "curNode"
}

@Injectable({
  providedIn: "root",
})
export class GrafStore extends ObservableStore<ZenFGraph> {

  constructor(private seed: SeedInitService) {
    super({ trackStateHistory: true });
    this.setState(this.seed.graph, Action.INIT);
  }

  private updateCursor(actions: Action.PREV | Action.NEXT) {
    const curGraph = this.state;
    const curNode = actions === Action.NEXT ? curGraph.curNode + 1 : curGraph.curNode - 1;
    const updatedGraph : ZenFGraph = { ...curGraph, curNode };
    this.setState(updatedGraph, actions);
  }

  next() {
    this.updateCursor(Action.NEXT);
  }

  prev() {
    this.updateCursor(Action.PREV);
  }

  get current(): Observable<ZenFGraph[Property.CUR_NODE]> {
    return this.stateChanged.pipe(map(g => g.curNode), distinctUntilChanged());
  }

  get cursor(): number {
    return this.state.curNode;
  }

  get state(): ZenFGraph {
    const { nodes, edges, curNode} = this.getState(true);
    return ({ nodes, edges, curNode });
  }

  get nodes(): ZenFGraph[Property.NODES] {
    return  this.state[Property.NODES];
  }

  get edges(): FEdge[] {
    return  this.state[Property.EDGES];
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
      allEdgesBefore[allEdgesBefore.length - 1].target = nextNode.id;
    }

    // else we are removing the root node, no edits needed
    // other than yeeting off the current node-edge pair ofc
    // nodes are pruned off automatically by the structure
    this.edges = [...allEdgesBefore, ...allEdgesAfter];
  }

  set edges(edges: ZenFGraph[Property.EDGES]) {
    const newState: ZenFGraph = { ...this.state, edges };
    this.setState(newState, Action.NEW_EDGES);
    this.nodes = edges.map(e => e.origin);
  }

  updateNode(field: FormalField) {
    const cursor = this.cursor;
    const oldEdge = this.edges[cursor];
    const oldNode = this.nodes[cursor];
    const origin : FNode = { ...oldNode, field};
    const newEdge : FEdge = { ...oldEdge, origin};
    const oldEdges : FEdge[] = this.edges;
    oldEdges.splice(cursor, 1, newEdge);
    this.edges = oldEdges;
  }

  get curField() {
    return this.nodes[this.cursor].field;
  }

  get curTemplateOptions() {
    return this.curField.templateOptions;
  }

  get curValidation() {
    return this.curField.validation;
  }

  set nodes(nodes: ZenFGraph[Property.NODES]) {
    const newState: ZenFGraph = { ...this.state, nodes };
    this.setState(newState, Action.NEW_NODES);
  }

  addEdge() {
    const emptyEdge = this.seed.edgeMaker(this.edges.length);
    this.edges = [...this.edges, emptyEdge]; // updates stream too
  }

}
