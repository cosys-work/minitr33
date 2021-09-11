import { Injectable } from "@angular/core";
import { FEdge, FGraph, FNode } from "../shared/f-graph.model";
import { makeFormalField } from "../shared/field.model";


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
    };
    function nodeWithField(iy: number): FNode {
      const ode = node(iy);
      // makeFormalField label=label, placeholder=tag, description=title
      const field = makeFormalField(ode.label, ode.tag, ode.title);
      console.log("makeFormalField", field);
      return ({
        ...ode, 
        field 
      }); 
    };
    const nwf = nodeWithField(iz);
    console.log("nodeWithField", nwf);
    return nwf;
  }

  public edgeMaker(iy: number): FEdge {
    const edge = (ix: number) => ({
          from: `${ix}`, // every edge is 'from' one origin node, c.f. origin below
          to: `${ix + 1}`, // every edge goes 'to' the next node by default
          origin: this.nodeMaker(ix), // every edge 'has' one origin node in the 'from' field
          label: `${ix}..${ix+1}` // every edge is labeled with origin..destination
        });
    const edgeWithNode = edge(iy);
    console.log("edgeWithNode", edgeWithNode);
    return edgeWithNode;
  }

  public seedEdges(): FEdge[] {
    return Array(2)
      .fill(1)
      .map((_, i) => this.edgeMaker(i));
  }

  public makeGraph(nodes: any, edges: any): FGraph {
    return ({ edges, nodes });
  }

  private makeDefault(): FGraph {
    const seedEdges = this.seedEdges();
    const seedNodes = seedEdges.map(v => v.origin);
    return this.makeGraph(
      seedNodes,
      seedEdges
    );
  }

  get graph(): FGraph {
    return this.makeDefault();
  }

}
