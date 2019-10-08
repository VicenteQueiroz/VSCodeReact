import React from "react";
import PropTypes from "prop-types";
import { parametersEditor } from "../utils/Utils.js";
import "./css/ParametersBar.css";
import ArrowDown from "@material-ui/icons/ArrowDropDown";
import ArrowRight from "@material-ui/icons/ArrowRight";

const ParametersBar = props => {
  const {
    layoutList,
    onParametersNumberChange,
    onParametersBoolChange,
    onParametersStringChange,
    onToggleAcordion,
    tabIndex,
    acordion
  } = props;

  let Parameters;
  if (layoutList === undefined || layoutList.length === 0) {
    // console.log("PARAMETERS BAR PROPS, ", componentList);
    Parameters = (
      <div>
        <div className="params_title_bar" />
        <div className="no_params_text">No Parameters found</div>
      </div>
    );
  } else {
    Parameters = (
      <div>
        {layoutList.componentList.map((widgetInst, widget_index) => {
          return (
            <div key={widget_index}>
              <div className="params_title_bar">
                <div className="params_text">{widgetInst.name}</div>
                <div
                  className="acordion"
                  onClick={() => onToggleAcordion(widget_index)}
                >
                  {acordion[widget_index] ? <ArrowDown /> : <ArrowRight />}
                </div>
              </div>
              {acordion[widget_index] ? (
                <div className="params_body">
                  {Object.keys(widgetInst.parameters).map(
                    (parameter, param_index) => {
                      return (
                        <div className="param" key={param_index}>
                          <div className="param_title">{parameter}</div>
                          <div className="param_editor">
                            {parametersEditor(
                              widgetInst.parameters[parameter],
                              [parameter], // objPath, this is to track the keys of the object we pass through
                              tabIndex,
                              widget_index,
                              onParametersNumberChange,
                              onParametersBoolChange,
                              onParametersStringChange
                            )}
                          </div>
                        </div>
                      );
                    }
                  )}
                </div>
              ) : (
                <div />
              )}
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <div className="fullBar">
      <div className="bar_title">
        <div>Parameters Viewer</div>
      </div>
      <div className="params_list">{Parameters}</div>
    </div>
  );
};

ParametersBar.propTypes = {
  layoutList: PropTypes.object,
  tabIndex: PropTypes.number,
  onParametersNumberChange: PropTypes.func,
  onParametersBoolChange: PropTypes.func,
  onParametersStringChange: PropTypes.func,
  acordion: PropTypes.array
};

export default ParametersBar;
