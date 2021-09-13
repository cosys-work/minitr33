import {
  Directive,
  ElementRef,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { FGraph } from 'src/app/shared/f-graph.model';
import { FormCursorStoreService } from 'src/app/store/form-cursor-store.service';

declare const vis: any;

interface Noded {
  nodes: string[];
}

@Directive({
  selector: '[appVisNetData]',
  providers: [FormCursorStoreService],
})
export class VisNetDataDirective implements OnChanges {
  network: any;
  netData!: FGraph;

  constructor(private el: ElementRef, private cursor: FormCursorStoreService) {}

  ngOnChanges(_: SimpleChanges): void {
    
  }

  @Input() set appVisNetData(graphData: FGraph) {
    this.netData = graphData;
    const options = {
      interaction: {
        hover: true,
      },
      manipulation: {
        enabled: true,
      },
      height: '230px',
      width: '1800px',
      clickToUse: true,
    };

    if (!this.network) {
      this.network = new vis.Network(this.el.nativeElement, graphData, options);

      const fCursor = this.cursor;

      this.network.on('deselectNode', function (params: unknown) {
        fCursor.jump(0);
      });

      this.network.on('deselectEdge', function (params: unknown) {
        //
      });

      this.network.on('selectNode', function (params: unknown) {
        const par = params as Noded;
        fCursor.jump(parseInt(par.nodes[0]));
      });

      this.network.on('selectEdge', function (params: unknown) {
        //
      });
    }
  }
}
