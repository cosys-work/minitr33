import {Injectable} from "@angular/core";
import {ObservableStore} from "@codewithdan/observable-store";
import {BehaviorSubject, Observable} from "rxjs";
import {FEdge, FNode, ZenFGraph} from "../shared/f-graph.model";
import {SeedInitService} from "./seed-init.service";
import {map} from "rxjs/operators";

enum Actions {
  INIT="INIT_GRAF",
  REINIT="REINIT_GRAF",
  EDIT="EDIT_GRAF",
  NEW_NODES="NEW_NODES",
  NEW_EDGES="NEW_EDGES",
  NEXT="NEXT_CRSR_GRAF",
  PREV="PREV_CRSR_GRAF"
}

@Injectable({
  providedIn: "root",
})
export class GrafStore extends ObservableStore<ZenFGraph> {

  private actionStream = new BehaviorSubject<ZenFGraph>(this.seed.graph);

  constructor(private seed: SeedInitService) {
    super({ trackStateHistory: true });
    this.setState(this.actionStream.value, Actions.INIT);
  }

  rxtiv(): Observable<ZenFGraph> {
    return this.actionStream.asObservable();
  }

  private updateCursor(actions: Actions.PREV | Actions.NEXT) {
    const curGraph = this.state;
    const curNode = actions === Actions.NEXT ? curGraph.curNode + 1 : curGraph.curNode - 1;
    const nextedGraph : ZenFGraph = { ...curGraph, curNode };
    this.setState(nextedGraph, actions);
    this.actionStream.next(nextedGraph);
  }

  next() {
    this.updateCursor(Actions.NEXT);
  }

  prev() {
    this.updateCursor(Actions.PREV);
  }

  get current(): Observable<ZenFGraph['curNode']> {
    return this.rxtiv().pipe(map(g => g.curNode));
  }

  get state(): ZenFGraph {
    const { nodes, edges, curNode} = this.getState(true);
    return ({ nodes, edges, curNode });
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
      allEdgesBefore[allEdgesBefore.length - 1].target = nextNode.id;
    }

    // else we are removing the root node, no edits needed
    // other than yeeting off the current node-edge pair ofc
    // nodes are pruned off automatically by the structure
    this.newEdges = [...allEdgesBefore, ...allEdgesAfter];
  }

  private set newEdges(edges: ZenFGraph['edges']) {
    const newState: ZenFGraph = { ...this.state, edges };
    this.setState(newState, Actions.NEW_EDGES);
    this.newNodes = edges.map(e => e.origin);
    this.actionStream.next(newState);
  }

  private set newNodes(nodes: ZenFGraph['nodes']) {
    const newState: ZenFGraph = { ...this.state, nodes };
    this.setState(newState, Actions.NEW_NODES);
    this.actionStream.next(newState);
  }

  addEdge() {
    const emptyEdge = this.seed.edgeMaker(this.edges.length);
    this.newEdges = [...this.edges, emptyEdge]; // updates stream too
  }

}
