import {Injectable} from '@angular/core';
import {addPouchPlugin} from "rxdb";

import * as IDB from 'pouchdb-adapter-idb';
import {createDB, schema} from "../shared/schema";
import {ZenFGraph} from "../shared/f-graph.model";
import {from} from "rxjs";

addPouchPlugin(IDB);

@Injectable({
  providedIn: 'root'
})
export class GrafDbService {

  private schema = schema;

  private db = from(createDB());

  constructor() {
    this.addGraphCollection();
  }

  addGraphCollection() {
    this.db.subscribe(db => db.addCollections({
      graphs: {
        schema: this.schema
      }}));
  }

  saveNewCommit(zG: ZenFGraph) {
    this.db.subscribe(db => db.graphs.upsert(zG));
  }

}
