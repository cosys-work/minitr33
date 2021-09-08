import { Injectable } from "@angular/core";


@Injectable({
  providedIn: "root",
})
export class SeedInitService {

  private readonly nodes = [];
  private readonly edges = [];

  public nodeMaker(iz: number) {
    const node = (ix: number) => ({
      id: `${ix}`,
      label: `Label ${ix}`,
      title: `Title ${ix}`,
      tag: `Tag ${ix}`
    });
    const nodeWithId = (iy: number) => {
      const nodeIdd = node(iy);
      return {
        nodeId: nodeIdd,
        ...nodeIdd
      };
    };
    return nodeWithId(iz);
  }

  public edgeMaker(iz: number) {
    const edge =
      (ix: number) => (
        {
          from: `${ix}`,
          to: `${ix + 1}`,
          at: `${ix} => ${ix+1}`,
          ...this.nodeMaker(ix)
        });
    const edgeWithDi = (iy: number) => {
      const edgeY = edge(iy);
      return  {
        nodeDi: new Array(edgeY),
        ...edgeY,
      };
    }
    return edgeWithDi(iz);
  }

  public seedNodes() {
    return Array(5)
      .fill(1 )
      .map((_, i) => this.nodeMaker(i));
  }

  public seedEdges() {
    return Array(5)
      .fill(1 )
      .map((_, i) => this.edgeMaker(i));
  }


  public makeGraph(nodes: any, edges: any) {
    return ({ edges, nodes });
  }

  public makeDefault() {
    return this.makeGraph(
      this.seedNodes(),
      this.seedEdges()
    );
  }

  get isInitialized(): boolean {
    return (!!this.edges?.length && !!this.nodes?.length);
  }

  get graph() {
    return this.isInitialized ?
      this.makeGraph(this.nodes, this.edges) :
      this.makeDefault();
  }

}
