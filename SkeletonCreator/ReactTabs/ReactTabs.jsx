import React, { Component } from "react";
import PropTypes from "prop-types";
import "./css/ReactTabs.css";
import Clear from "@material-ui/icons/Clear";

const ReactTabs = props => {
  return (
    <div className="tabBar_container">
      {props.activeLayoutList !== undefined &&
        props.activeLayoutList.map((tab, index) => {
          return (
            <div
              key={index}
              className={index === props.tabIndex ? "tab--selected" : "tab"}
            >
              <div
                onClick={() => props.onSelectTab(index)}
                className={index === props.tabIndex ? "text--selected" : "text"}
              >
                {tab.layoutName}
              </div>

              <Clear
                className="remove_icon"
                onClick={() => props.onRemoveTab(index)}
              />
            </div>
          );
        })}
    </div>
  );
};

ReactTabs.propTypes = {
  tabIndex: PropTypes.number,
  onSelectTab: PropTypes.func,
  onRemoveTab: PropTypes.func,
  activeLayoutList: PropTypes.array
};

export default ReactTabs;
