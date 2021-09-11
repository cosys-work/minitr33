import { Injectable } from "@angular/core";
import { FEdge, FGraph, FNode } from "../shared/f-graph.model";
import { makeFormalField } from "../shared/field.model";


@Injectable({
  providedIn: "root",
})
export class SeedInitService {

  public nodeMaker(iz: number): FNode {
    const node = (ix: number) => ({
      id: `${ix}`,
      label: `Label ${ix}`,
      title: `Description ${ix}`,
      tag: `Placeholder ${ix}`
    });
    const nodeWithField = (iy: number) => {
      const ode = node(iy);
      return ({
        ...node(iy), 
        ...makeFormalField(ode.label, ode.tag, ode.title)
      }); // makeFormalField label=label, placeholder=tag, description=title
    };
    return nodeWithField(iz);
  }

  public edgeMaker(iy: number): FEdge {
    const edge =
      (ix: number) => (
        {
          from: `${ix}`, // every edge is 'from' one origin node, c.f. origin below
          to: `${ix + 1}`, // every edge goes 'to' the next node by default
          origin: this.nodeMaker(ix), // every edge 'has' one origin node in the 'from' field
          label: `${ix}..${ix+1}` // every edge is labeled with origin..destination
        });
    return edge(iy);
  }

  public seedNodes(): FNode[] {
    return Array(2)
      .fill(1 )
      .map((_, i) => this.nodeMaker(i));
  }

  public seedEdges(): FEdge[] {
    return Array(2)
      .fill(1 )
      .map((_, i) => this.edgeMaker(i));
  }

  public makeGraph(nodes: any, edges: any): FGraph {
    return ({ edges, nodes });
  }

  private makeDefault(): FGraph {
    return this.makeGraph(
      this.seedNodes(),
      this.seedEdges()
    );
  }

  get graph(): FGraph {
    return this.makeDefault();
  }

}
