import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {Component} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {map, take} from 'rxjs/operators';
import {GrafStore} from 'src/app/store/graf-store.service';

@Component({
  selector: 'app-dash-grid',
  templateUrl: './dash-grid.component.html',
  styleUrls: ['./dash-grid.component.scss']
})
export class DashGridComponent {

  fieldCursor: Observable<number> = this.grafStore.current;
  maxCursor: () => number = () => this.grafStore.edges.length - 1;

  /** Based on the screen size, switch from standard to one column per row */
  cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return [
          { title: 'Field Content', cols: 2, rows: 2 },
          { title: 'Form Preview', cols: 2, rows: 2 },
          { title: 'Field Logic', cols: 2, rows: 2 },
          { title: 'Form Overview', cols: 2, rows: 2 },
        ];
      }

      return [
        { title: 'Field Content', cols: 1, rows: 1 },
        { title: 'Untitled Form', cols: 1, rows: 2 },
        { title: 'Field Logic', cols: 1, rows: 1 },
        { title: 'Form Overview', cols: 2, rows: 1 },
      ];
    })
  );

  saved = new BehaviorSubject(false);
  nexted = new BehaviorSubject(false);

  constructor(
    private breakpointObserver: BreakpointObserver,
    private grafStore: GrafStore,
  ) {}

  onSave(_: Event) {
    this.saved.next(true);
  }

  onDelete(_: Event) {
    this.fieldCursor.pipe(
      take(1),
      map(c => this.grafStore.edges[c])
    ).subscribe(edgeToRemove => {
      this.grafStore.delNodeEdgePair = edgeToRemove;
      this.curseRedeemer(this.grafStore.edges.length);
    });
  }

  onNext(_: Event) {
    const currentTotal = this.grafStore.edges.length;
    this.fieldCursor.pipe(take(1)).subscribe(idx => {
      if (idx + 1 >= currentTotal) {
        this.grafStore.addEdge();
      }
      this.grafStore.next();
    });
    this.nexted.next(true);
  }

  curseRedeemer(idx: number) {
    if (idx > 0) {
      this.grafStore.prev();
    }
    if (idx === 1) {
      this.nexted.next(false);
    }
  }

  handlePrev() {
    this.fieldCursor.pipe(take(1)).subscribe(idx => {
      this.curseRedeemer(idx);
    });
  }

  onFormNameChange(changed: string) {
    console.log("save name", changed)
  }

  onPrev(_: Event) {
    this.handlePrev();
  }
}
