import { AfterContentInit, Component } from "@angular/core";
import { ClusterNode, Layout } from "@swimlane/ngx-graph";
import { FGraph } from "src/app/shared/f-graph.model";
import { GrafStore } from "src/app/store/graf-store.service";
import { curveBundle } from "d3-shape";
import { Subject } from "rxjs";

@Component({
  selector: 'app-dash-overview',
  templateUrl: './dash-overview.component.html',
  styleUrls: ['./dash-overview.component.scss']
})
export class DashOverviewComponent implements AfterContentInit {

  graphData: FGraph = { nodes: [], edges: []};

  layout: string | Layout = 'dagreCluster';
  clusters: ClusterNode[] = [];

  curve = curveBundle.beta(1);

  draggingEnabled: boolean = false;
  panningEnabled: boolean = true;
  zoomEnabled: boolean = true;

  zoomSpeed: number = 0.1;
  minZoomLevel: number = 0.1;
  maxZoomLevel: number = 4.0;
  panOnZoom: boolean = true;

  autoZoom: boolean = true;
  autoCenter: boolean = true;

  update$: Subject<boolean> = new Subject();
  center$: Subject<boolean> = new Subject();
  zoomToFit$: Subject<boolean> = new Subject();

  constructor(
    private grafStore: GrafStore,
  ) {}

  ngAfterContentInit() {
    this.updateGraph();
    this.grafStore.rxtiv().subscribe(_ => {
      this.updateGraph();
    });
  }

  updateGraph() {
    const {nodes, edges} = this.treeData();
    this.graphData = { nodes, edges };
  }

  treeData(): FGraph {
    const { nodes, edges } = this.grafStore.state;
    return ({
      nodes,
      edges
    });
  }
}
