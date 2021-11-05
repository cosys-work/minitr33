import {createRxDatabase, getRxStoragePouch} from "rxdb";

export const idb = 'idb';

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
      items: {
        type: "string"
      }
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
  type: "object",
  properties: {
    requiredRule: {
      type: "string"
    },
    disabledRule: {
      type: "string"
    },
    hiddenRule: {
      type: "string"
    },
    readonlyRule: {
      type: "string"
    },
    maxRule: {
      type: "string"
    },
    minRule: {
      "type": "string"
    },
    stepRule: {
      "type": "string"
    },
    tabindexRule: {
      "type": "string"
    },
    show: {
      type: "boolean"
    },
    messages: {
      type: "object",
      patternProperties: {
        "^.+$": {
          "type": "string"
        }
      },
      additionalProperties: false
    },
  }
}


export async function createDB() {
  return  createRxDatabase({
    name: 'graf',
    storage: getRxStoragePouch(idb)
  });
}
