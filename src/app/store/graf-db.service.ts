import {Injectable} from '@angular/core';
import {ZenFGraph} from "../shared/f-graph.model";

// addPouchPlugin(IDB);

@Injectable({
  providedIn: 'root'
})
export class GrafDbService {

  // private schema = schema;

  // private db = from(createDB());

  constructor() {
    this.addGraphCollection();
  }

  addGraphCollection() {
    // this.db.subscribe(db => db.addCollections({
    //   graphs: {
    //     schema: this.schema
    //   }}));
  }

  saveNewCommit(_: ZenFGraph) {
    // this.db.subscribe(db => db.graphs.upsert(zG));
  }

}
