import {AfterContentInit, Component} from "@angular/core";
import {ClusterNode, Layout} from "@swimlane/ngx-graph";
import {ZenFGraph} from "src/app/shared/f-graph.model";
import {GrafStore} from "src/app/store/graf-store.service";
import {curveBundle} from "d3-shape";
import {Subject} from "rxjs";
import {distinctUntilChanged, map} from "rxjs/operators";

@Component({
  selector: 'app-dash-overview',
  templateUrl: './dash-overview.component.html',
  styleUrls: ['./dash-overview.component.scss']
})
export class DashOverviewComponent implements AfterContentInit {

  graphData: ZenFGraph = { nodes: [], edges: [], curNode: 0};

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
    this.grafStore.stateChanged.pipe(
      map((cur: ZenFGraph) => cur.nodes),
      distinctUntilChanged()
    ).subscribe(_ => {
      this.updateGraph();
    });
  }

  updateGraph() {
    this.graphData = this.treeData();
  }

  treeData(): ZenFGraph {
    return  this.grafStore.state;
  }
}
