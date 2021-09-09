import { Component, OnInit } from "@angular/core";
import { GrafStore, Graph } from "src/app/store/graf-store.service";

interface OnAble {
  on: (selector: string, cb: (params: unknown) => void) => void
}

declare const vis: any;

@Component({
  selector: 'app-dash-overview',
  templateUrl: './dash-overview.component.html',
  styleUrls: ['./dash-overview.component.scss']
})
export class DashOverviewComponent implements OnInit {

  public network!: OnAble;

  constructor(
    private grafStore: GrafStore
  ) {}

  ngOnInit() {
    this.loadVisTree(this.getTreeData());
  }

  loadVisTree(treeData: unknown) {
    const options = {
      interaction: {
        hover: true,
      },
      manipulation: {
        enabled: true
      },
      height: '230px',
      width: '1800px',
      clickToUse: true
    };
    const container = document.getElementsByClassName("network")[0];
    this.network = new vis.Network(container, treeData, options);

    this.network.on("deselectNode", function (params: unknown) {
      console.log('deselectNode Event:', params);
    });

    this.network.on("deselectEdge", function(params: unknown) {
      console.log('deselectEdge event:', params);
    });

    this.network.on("selectNode", function (params: unknown) {
      console.log('selectNode event', params);
    });

    this.network.on("selectEdge", function (params: unknown) {
      console.log('selectEdge event', params);
    });
  }

  getTreeData(): Graph {
    const grafState = this.grafStore.state;
    const nodes = grafState.nodes;
    const edges = grafState.edges;
    return ({
      nodes,
      edges
    });
  }
}
