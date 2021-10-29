import {ZenFGraph} from "./f-graph.model";
import {RxCollection, RxDatabase, RxDocument} from "rxdb";

export const idb: 'idb' = 'idb';

export type GrafDocObj = ZenFGraph;
export type DocMorph = (hash: string) => string[];
export type DocsMorph = (hashes: string[]) => string[];

export type GrafDocMorphs = {
  commit: DocMorph;
  fork: DocMorph;
}

export type GrafDocsMorphs = {
  merge: DocsMorph;
  concat: DocsMorph;
}

export type GrafDoc = RxDocument<GrafDocObj, GrafDocMorphs>;
export type GrafDocs = RxCollection<GrafDocObj, GrafDocMorphs, GrafDocsMorphs>;

export type GrafBuckets = {
  graphs: GrafDocs
}

export type GrafDB = RxDatabase<GrafBuckets>
