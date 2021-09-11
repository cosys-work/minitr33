import { FormalField } from "./shared.model";

/**
 * Each node contains a `FormalField`
*/
export interface FNode {
    id: string;
    label: string;
    title: string;
    tag: string;
    field: FormalField;
}

/**
 * Each edge contains a `FNode`
*/
export interface FEdge {
    from?: string;
    origin: FNode;
    to: string | string[];
    label: string;
}

export interface FGraph {
    nodes: FNode[];
    edges: FEdge[];
}