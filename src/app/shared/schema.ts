import {createRxDatabase, getRxStoragePouch, RxJsonSchema} from "rxdb";
import {GrafDocObj, idb} from "./db.model";

export const templateOptionsSchema = {
  type: "object",
  properties: {
    type: {
      type: "string"
    },
    label: {
      type: "string"
    },
    placeholder: {
      type: "string"
    },
    disabled: {
      type: "boolean"
    },
    options: {
      type: "array",
      items: {}
    },
    rows: {
      type: "number"
    },
    cols: {
      type: "number"
    },
    description: {
      type: "string"
    },
    hidden: {
      type: "boolean"
    },
    max: {
      type: "number"
    },
    min: {
      type: "number"
    },
    minLength: {
      type: "number"
    },
    maxLength: {
      type: "number"
    },
    pattern: {
      type: "string"
    },
    required: {
      type: "boolean"
    },
    tabindex: {
      type: "number"
    },
    readonly: {
      type: "boolean"
    },
    attributes: {
      type: "object",
      patternProperties: {
        "^.+$": {
          "anyOf": [
            {"type": "string"},
            {"type": "number"}
          ]
        }
      },
      additionalProperties: false
    },
    step: {
      type: "number"
    }
  }
}


export const validationSchema = {
  "type": "object",
  "properties": {
    "requiredRule": {
      "type": "string"
    }
    ,
    "disabledRule": {
      "type": "string"
    }
    ,
    "hiddenRule": {
      "type": "string"
    }
    ,
    "readonlyRule": {
      "type": "string"
    }
    ,
    "maxRule": {
      "type": "string"
    }
    ,
    "minRule": {
      "type": "string"
    }
    ,
    "stepRule": {
      "type": "string"
    }
    ,
    "tabindexRule": {
      "type": "string"
    }
    ,
    "messages": {
      type: "object",
      patternProperties: {
        "^.+$": {
          "type": "string"
        }
      },
      additionalProperties: false
    }
    ,
    "show": {
      "type": "boolean"
    }
  }
}


export async function createDB() {
  return  createRxDatabase({
    name: 'graf',
    storage: getRxStoragePouch(idb)
  });
}

export const schema: RxJsonSchema<GrafDocObj> = {
  title: 'Formal Graphs',
  description: 'Graphs containing form and function',
  version: 0,
  keyCompression: true,
  primaryKey: 'id',
  type: 'object',
  properties: {
    curNode: {
      type: "number"
    },
    curName: {
      type: "string"
    },
    id: {
      type: "string"
    },
    nodes: {
      type: "array",
      ref: "nodes",
      items: {
        type: "object",
        properties: {
          id: {
            type: "string"
          },
          label: {
            type: "string"
          },
          title: {
            type: "string"
          },
          tag: {
            type: "string"
          },
          field: {
            type: "object",
            properties: {
              key: {
                type: "string"
              },
              type: {
                type: "string"
              },
              className: {
                type: "string"
              },
              id: {
                type: "string"
              },
              templateOptions: templateOptionsSchema,
              validation: validationSchema
            }
          }
        }
      }
    },
    edges: {
      type: "array",
      ref: "edges",
      items: {
        type: "object",
        properties: {
          source: {
            type: "string"
          },
          target: {
            type: "string"
          },
          label: {
            type: "string"
          },
          origin: {
            type: "object",
            ref: "nodes"
          }
        }
      }
    }
  },
  required: [
    "curNode",
    "curName",
  ]
};
