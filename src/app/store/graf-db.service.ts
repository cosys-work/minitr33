import {Injectable} from '@angular/core';
import {addPouchPlugin, createRxDatabase, getRxStoragePouch} from "rxdb";

import * as IDB from 'pouchdb-adapter-idb';
import {idb} from "../shared/db.model";

addPouchPlugin(IDB);

@Injectable({
  providedIn: 'root'
})
export class GrafDbService {

  database = createRxDatabase({
    name: 'formalGraphDB',
    storage: getRxStoragePouch(idb)
  });

  schema = {
    keyCompression: true,
    version: 0,
    title: 'Formal Graphs',
    primaryKey: 'id',
    type: 'object'
  }

}
