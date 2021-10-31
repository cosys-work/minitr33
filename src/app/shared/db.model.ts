import {FEdge, FNode, ZenFGraph} from "./f-graph.model";
import {RxCollection, RxDatabase, RxDocument} from "rxdb";

export const idb: 'idb' = 'idb';
//**
// Main Obj
// */
export type GrafDocObj = ZenFGraph;
export type GrafDocMorph = (hash: string) => string[];

export type GrafDocMorphs = {
  commit: GrafDocMorph;
  clone: GrafDocMorph;
}

export type GrafDoc = RxDocument<GrafDocObj, GrafDocMorphs>;

export type DocCollMorph = (hashes: string[]) => string[];
export type GrafDocCollMorphs = {
  merge: DocCollMorph;
  concat: DocCollMorph;
}
export type GrafDocs = RxCollection<GrafDocObj, GrafDocMorphs, GrafDocCollMorphs>;

//**
// Node Obj
// */
export type GrafNodeObj = FNode;
export type GrafNode = RxDocument<GrafNodeObj, GrafDocMorphs>;
export type GrafNodes = RxCollection<GrafNodeObj, GrafDocMorphs, GrafDocCollMorphs>;

//**
// Edge Obj
// */
export type GrafEdgeObj = FEdge;
export type GrafEdge = RxDocument<GrafEdgeObj, GrafDocMorphs>;
export type GrafEdges = RxCollection<GrafEdgeObj, GrafDocMorphs, GrafDocCollMorphs>;



export type GrafBuckets = {
  graphs: GrafDocs,
  nodes: GrafNodes,
  edges: GrafEdges
}

export type GrafDB = RxDatabase<GrafBuckets>
