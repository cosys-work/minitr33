import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {Component, ElementRef, ViewChild} from '@angular/core';
import {BehaviorSubject, Observable, Subject, takeUntil} from 'rxjs';
import {debounceTime, distinctUntilChanged, map, take} from 'rxjs/operators';
import {GrafStore} from 'src/app/store/graf-store.service';
import {StatefulnessComponent} from "../../shared/statefulness/statefulness.component";
import {DashChangesService} from "../../store/dash-changes.service";

@Component({
  selector: 'app-dash-grid',
  templateUrl: './dash-grid.component.html',
  styleUrls: ['./dash-grid.component.scss']
})
export class DashGridComponent extends StatefulnessComponent {

  fieldCursor: Observable<number> = this.grafStore.current;
  maxCursor: () => number = () => this.grafStore.edges.length - 1;

  curName: string = "Untiled Form";

  keyUp = new Subject<KeyboardEvent>();

  @ViewChild('formNameInput') formNameInput!: ElementRef<HTMLInputElement>;

  /** Based on the screen size, switch from standard to one column per row */
  cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return [
          { title: 'Field Content', cols: 2, rows: 2 },
          { title: this.curName, cols: 2, rows: 2 },
          { title: 'Field Logic', cols: 2, rows: 2 },
          { title: 'Form Overview', cols: 2, rows: 2 },
        ];
      }

      return [
        { title: 'Field Content', cols: 1, rows: 1 },
        { title: this.curName, cols: 1, rows: 2 },
        { title: 'Field Logic', cols: 1, rows: 1 },
        { title: 'Form Overview', cols: 2, rows: 1 },
      ];
    })
  );

  nexted = new BehaviorSubject(false);

  constructor(
    private breakpointObserver: BreakpointObserver,
    private grafStore: GrafStore,
    private changes: DashChangesService,
  ) {
    super();
    this.updateFL();
    this.keyUp.pipe(
      takeUntil(this.onDestroy$),
      map(event => (<HTMLInputElement>event.target).value)
    ).subscribe(name => this.curName = name);
  }

  updateFL() {
    this.changes.get.nameStream.pipe(
      takeUntil(this.onDestroy$),
      debounceTime(1000),
      distinctUntilChanged(),
    ).subscribe(l => {
      if (typeof l === "string") {
        this.formNameInput.nativeElement.value = l;
      }
    });
  }

  onSave(_: Event) {
    this.grafStore.updateName(this.curName);
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

  onPrev(_: Event) {
    this.handlePrev();
  }
}
