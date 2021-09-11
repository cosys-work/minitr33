import { Component, OnInit } from "@angular/core";
import { FGraph } from "src/app/shared/f-graph.model";
import { FormCursorStoreService } from "src/app/store/form-cursor-store.service";
import { GrafStore } from "src/app/store/graf-store.service";

interface OnAble {
  on: (selector: string, cb: (params: unknown) => void) => void
}

interface Noded {
  nodes: string[];
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
    private grafStore: GrafStore,
    private formCursor: FormCursorStoreService
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
    const fCursor = this.formCursor;

    this.network = new vis.Network(container, treeData, options);

    this.network.on("deselectNode", function (params: unknown) {
      console.log('deselectNode Event:', params);
      fCursor.jump(0);
    });

    this.network.on("deselectEdge", function(params: unknown) {
      console.log('deselectEdge event:', params);
    });
    
    this.network.on("selectNode", function (params: unknown) {
      console.log('selectNode event', params);
      const par = params as Noded;
      fCursor.jump(parseInt(par.nodes[0]))
    });

    this.network.on("selectEdge", function (params: unknown) {
      console.log('selectEdge event', params);
    });
  }

  getTreeData(): FGraph {
    const { nodes, edges } = this.grafStore.state;
    return ({
      nodes,
      edges
    });
  }
}
