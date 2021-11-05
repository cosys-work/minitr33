import {RxCollection, RxDatabase, RxDocument} from "rxdb";
import {ZenFGraph} from "../shared/f-graph.model";

export type GrafDocObj = ZenFGraph;

export type GrafDocMorphs = {
  clone: (hash: string) => string[];
}
export type GrafDocCollMorphs = {
  concat: (hashes: string[]) => string[];
}

export type GrafDoc = RxDocument<GrafDocObj, GrafDocMorphs>;
export type GrafDocs = RxCollection<GrafDocObj, GrafDocMorphs, GrafDocCollMorphs>;

export type GrafBuckets = {
  graph: GrafDocs
}

export type GrafDB = RxDatabase<GrafBuckets>
