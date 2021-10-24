import {Injectable} from "@angular/core";
import {FEdge, FNode, ZenFGraph} from "../shared/f-graph.model";
import {seedAField} from "./seed-init.utils";


@Injectable({
  providedIn: "root",
})
export class SeedInitService {

  public nodeMaker(iz: number): FNode {
    function node(ix: number) {
      return ({
        id: `${ix}`,
        label: `Label ${ix}`,
        title: `Description ${ix}`,
        tag: `Placeholder ${ix}`
      });
    }
    function nodeWithField(iy: number): FNode {
      const ode = node(iy);
      const field = seedAField(ode.label, ode.tag, ode.title, iy); // Label, Placeholder, Description, Tabindex
      return ({
        ...ode,
        field
      });
    }
    return nodeWithField(iz);
  }

  public edgeMaker(iy: number): FEdge {
    const edge = (ix: number) => ({
          source: `${ix}`, // every edge is from one origin node, c.f. origin below
          target: `${ix + 1}`, // every edge goes to the next node by default
          origin: this.nodeMaker(ix), // every edge 'has' one origin node in the 'from' field
          label: `${ix}..${ix+1}` // every edge is labeled with origin..destination
        });
    return edge(iy);
  }

  public seedEdges(): FEdge[] {
    return Array(2)
      .fill(1)
      .map((_, i) => this.edgeMaker(i));
  }

  public makeGraph(nodes: any, edges: any): ZenFGraph {
    const curNode = 0;
    return ({ edges, nodes, curNode });
  }

  private makeDefault(): ZenFGraph {
    const seedEdges = this.seedEdges();
    const seedNodes = seedEdges.map(v => v.origin);
    return this.makeGraph(
      seedNodes,
      seedEdges
    );
  }

  get graph(): ZenFGraph {
    return this.makeDefault();
  }

}
