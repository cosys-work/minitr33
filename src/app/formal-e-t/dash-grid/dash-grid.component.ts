import { Component } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { BehaviorSubject } from 'rxjs';

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
          { title: 'Field Content', cols: 1, rows: 1 },
          { title: 'Form Preview', cols: 1, rows: 1 },
          { title: 'Field Logic', cols: 1, rows: 1 }, 
          { title: 'Form Overview', cols: 1, rows: 1 },
        ];
      }

      return [
        { title: 'Field Content', cols: 1, rows: 1 },
        { title: 'Form Preview', cols: 1, rows: 2 },
        { title: 'Field Logic', cols: 1, rows: 1 },
        { title: 'Form Overview', cols: 2, rows: 1 },
      ];
    })
  );

  saved = new BehaviorSubject(false);
  nexted = new BehaviorSubject(false);

  constructor(private breakpointObserver: BreakpointObserver) {}

  onSave(_: Event) {
    this.saved.next(true);
  }

  onShare(_: Event) {
    this.saved.next(false);
  }

  onNext(_: Event) {
    this.nexted.next(true);
  }

  onPrev(_: Event) {
    this.nexted.next(false);
  }
}
