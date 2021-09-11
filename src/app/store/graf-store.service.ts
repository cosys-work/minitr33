import {ObservableStore} from "@codewithdan/observable-store";

import {Observable, ReplaySubject} from "rxjs";

import {Injectable} from "@angular/core";
import { SeedInitService } from "./seed-init.service";
import { FGraph } from "../shared/f-graph.model";

enum Actions {
  INIT="INIT",
  REINIT="REINIT",
  EDIT="EDIT"
}

const bufferSize = 100;

@Injectable({
  providedIn: "root",
})
export class GrafStore extends ObservableStore<FGraph> {

  protected storeStream = new ReplaySubject<FGraph>(bufferSize);

  constructor(private seed: SeedInitService) {
    super({ trackStateHistory: true });
    this.setState(this.seed.graph, Actions.INIT);
    this.updateStoreStream();
  }

  private updateStoreStream() {
    this.storeStream.next(this.getState(true));
  }

  get state() {
    return this.getState(true);
  }

  get nodes() {
    return this.state.nodes;
  }

  get edges() {
    return this.state.edges;
  }

  set reset(gDef: FGraph) {
    this.setState(gDef, Actions.REINIT);
    this.updateStoreStream();
  }

  set edit(part: Partial<FGraph>) {
    const newState = { ...this.getState(true), ...part };
    this.setState(newState, Actions.EDIT);
    this.updateStoreStream();
  }

  rxtiv(): Observable<FGraph> {
    return this.storeStream.asObservable();
  }

}
