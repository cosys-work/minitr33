import { Component } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';

@Component({
  selector: 'app-dash-grid',
  templateUrl: './dash-grid.component.html',
  styleUrls: ['./dash-grid.component.scss']
})
export class DashGridComponent {
  /** Based on the screen size, switch from standard to one column per row */
  cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return [
          { title: 'Form Overview', cols: 1, rows: 1 },
          { title: 'Comp Content', cols: 1, rows: 1 },
          { title: 'Form Preview', cols: 1, rows: 1 },
          { title: 'Comp Logic', cols: 1, rows: 1 }
        ];
      }

      return [
        { title: 'Form Overview', cols: 2, rows: 1 },
        { title: 'Comp Content', cols: 1, rows: 1 },
        { title: 'Form Preview', cols: 1, rows: 2 },
        { title: 'Comp Logic', cols: 1, rows: 1 }
      ];
    })
  );

  constructor(private breakpointObserver: BreakpointObserver) {}
}
