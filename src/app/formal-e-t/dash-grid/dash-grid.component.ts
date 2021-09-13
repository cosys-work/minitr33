import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { FormCursorStoreService } from 'src/app/store/form-cursor-store.service';
import { GrafStore } from 'src/app/store/graf-store.service';

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

  constructor(
    private breakpointObserver: BreakpointObserver,
    private cursorStore: FormCursorStoreService,
    private grafStore: GrafStore
  ) {}

  onSave(_: Event) {
    this.saved.next(true);
  }

  onShare(_: Event) {
    this.saved.next(false);
  }

  onNext(_: Event) {
    const currentTotal = this.grafStore.edges.length;
    //take 1 so that nexting the cursorStore does not trigger the subscribed actions again
    this.cursorStore.current.pipe(take(1)).subscribe(idx => {
      if (idx + 1 >= currentTotal) {
        this.grafStore.addEdge();
      }
      this.cursorStore.next();
    });
    this.nexted.next(true);
  }

  onPrev(_: Event) {
    //take 1 so that the second one can disable prev button if there's no previous node anymore
    this.cursorStore.current.pipe(take(1)).subscribe(idx => {
      if (idx > 0) {
        this.cursorStore.prev();
      }
      if (idx === 1) {
        this.nexted.next(false);
        return;
      }
    });
  }
}
