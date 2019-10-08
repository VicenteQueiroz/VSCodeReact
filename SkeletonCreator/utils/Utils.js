import React from "react";
import { element } from "prop-types";
import "../ParametersBar/css/ParametersBar.css";

// Loops through the existing widgets in componentList and appends a number which is unique.
export function findsUniqueWidgetName(componentList, selected_widget) {
  let candidate = selected_widget;
  let n = "";
  if (componentList !== undefined) {
    for (let i = 1; i <= componentList.length; i++) {
      for (let j = 0; j < componentList.length; j++) {
        if (candidate === componentList[j].name) {
          n++;
          candidate = selected_widget + n;
          break;
        }
      }
    }
  }
  return candidate;
}

// Makes sure to find unique "i" of grid layout, returns string
export function findsUnique_i(componentList) {
  // If empty, return 0
  if (componentList.length === 0 || componentList === undefined) {
    return "0";
  }
  for (let k = 0; k < componentList.length; k++) {
    for (let j = 0; j < componentList.length; j++) {
      if (k === parseInt(componentList[j].parameters.layout.i, 10)) {
        break;
      }
      if (j === componentList.length - 1) {
        return `${k}`;
      }
    }
  }

  return `${componentList.length}`;
}

export function parametersEditor(
  paramValue,
  objPath,
  tabIndex,
  widget_index,
  onParametersNumberChange,
  onParametersBoolChange,
  onParametersStringChange
) {
  const mapper = {
    number: (inputValue, objPath) => (
      <input
        data-testid="input-number"
        className="input_number"
        value={inputValue}
        onChange={evt =>
          onParametersNumberChange(evt, objPath, tabIndex, widget_index)
        }
        type="number"
      />
    ),
    boolean: (inputValue, objPath) => (
      <input
        data-testid="input-bool"
        className="input_boolean"
        checked={inputValue}
        onChange={evt =>
          onParametersBoolChange(evt, objPath, tabIndex, widget_index)
        }
        type="checkbox"
      />
    ),
    string: (inputValue, objPath) => (
      <input
        data-testid="input-string"
        className="input_string"
        value={inputValue}
        onChange={evt =>
          onParametersStringChange(evt, objPath, tabIndex, widget_index)
        }
        type="text"
      />
    ),

    object: (inputValue, objPath) => (
      <div>
        {Object.keys(inputValue).map((element, elementIndex) => {
          return (
            <div className="vRow" key={elementIndex}>
              <div className="obj_key">{element}</div>
              {typeof inputValue[element] === "object" ||
              inputValue[element] === undefined ? (
                <input
                  data-testid="input-object"
                  className="input_object"
                  value={JSON.stringify(paramValue)}
                  onChange={evt =>
                    onParametersStringChange(
                      evt,
                      objPath,
                      tabIndex,
                      widget_index
                    )
                  }
                  type="text"
                />
              ) : (
                parametersEditor(
                  inputValue[element],
                  objPath.concat(element), // here has to be immutable, has to return a new array
                  tabIndex,
                  widget_index,
                  onParametersNumberChange,
                  onParametersBoolChange,
                  onParametersStringChange
                )
              )}
            </div>
          );
        })}
      </div>
    )
  };
  return mapper[typeof paramValue](paramValue, objPath);
}

// Takes a key path ([vicente, age]) and puts a value (23) in the respective obj ({vicente: {age: 12, id: "12938461"}, joao: {age: 45, id:"123"}})
export function setAttribute(obj, key, value) {
  for (let i = 0; i < key.length - 1; i++) {
    let attr = key[i];
    obj = obj[attr];
  }

  obj[key[key.length - 1]] = value;
}
