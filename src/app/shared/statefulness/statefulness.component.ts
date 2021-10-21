import {Component, OnDestroy, OnInit} from '@angular/core';
import {concat, from, mergeMap, Observable, ReplaySubject, takeUntil, tap} from "rxjs";

const OnInitSubject = Symbol('OnInitSubject');
const OnDestroySubject = Symbol('OnDestroySubject');

export type ObservableMap<T> = {
  [P in keyof T]: Observable<T[P]>;
};

@Component({
  selector: 'app-statefulness',
  templateUrl: './statefulness.component.html',
  styleUrls: ['./statefulness.component.scss']
})
export class StatefulnessComponent implements OnInit, OnDestroy {

  private [OnInitSubject] = new ReplaySubject<true>(1);
  private [OnDestroySubject] = new ReplaySubject<true>(1);

  ngOnInit() {
    this[OnInitSubject].next(true);
    this[OnInitSubject].complete();
  }

  ngOnDestroy() {
    this[OnDestroySubject].next(true);
    this[OnDestroySubject].complete();
  }

  get onInit$() {
    return this[OnInitSubject].asObservable();
  }

  get onDestroy$() {
    return this[OnDestroySubject].asObservable();
  }

  onSrcUpdate<T>(sources: ObservableMap<T>, func: (v: unknown) => void): T {
    const sink = {} as T;
    const sourceKeys = Object.keys(sources) as (keyof T)[];
    const updateSink$ = from(sourceKeys).pipe(
      mergeMap(sourceKey => {
        return sources[sourceKey].pipe(
          tap((sinkValue: any) => (sink[sourceKey] = sinkValue))
        );
      })
    );
    concat(this.onInit$, updateSink$)
      .pipe(takeUntil(this.onDestroy$))
      .subscribe(
        (v) => func(v)
      );
    return sink;
  }

}
