import { Injectable } from '@angular/core';
import { ObservableStore } from '@codewithdan/observable-store';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

enum Actions {
  INIT="INIT_CRSR",
  REINIT="REINIT_CRSR",
  EDIT="EDIT_CRSR"
}

export interface FCursor {
  index: number;
  next: number;
  jumps?: number[];
}

const index = 0;
const next = 1;

@Injectable({
  providedIn: 'root'
})
export class FormCursorStoreService extends ObservableStore<FCursor> {

  protected cursorStream = new BehaviorSubject<FCursor>({index, next});

  constructor() {
    super({trackStateHistory: true});
    this.setState({index, next}, Actions.INIT);
  }

  private updateStoreStream() {
    return this.cursorStream.next(this.getState(true));
  }

  jump(index: number) {
    const next = index + 1;
    this.setState({index, next}, Actions.REINIT);
    this.updateStoreStream();
  }

  next() {
    const {index, next} = this.getState(true);
    this.setState({index: index + 1, next: next + 1}, Actions.EDIT);
    this.updateStoreStream();
  }

  prev() {
    const {index, next} = this.getState(true);
    this.setState({index: index - 1, next: next - 1}, Actions.EDIT);
    this.updateStoreStream();
  }

  rxtiv(): Observable<FCursor> {
    return this.cursorStream.asObservable();
  }

  get current(): Observable<number> {
    return this.rxtiv().pipe(map(v => v.index));
  }
}
