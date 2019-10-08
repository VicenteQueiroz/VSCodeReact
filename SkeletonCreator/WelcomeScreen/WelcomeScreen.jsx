import React from "react";
import PropTypes, { element } from "prop-types";
import "../css/SkeletonCreator.css";

const WelcomeScreen = props => {
  return (
    <div className="welcome_screen">
      <div className="welcome_centered">
        <h1 className="welcome_company_title">Mov.AI</h1>
        <h2 className="welcome_app_title">Layout Manager</h2>
        <h3 className="welcome_subtitle">Start</h3>
        <p className="welcome_buttons" onClick={props.onClickNewLayout}>
          {" "}
          + New Layout
        </p>
        <h3 className="welcome_subtitle">Recent</h3>

        {props.layoutList.map((layout, layout_index) => {
          return (
            <p
              className="welcome_buttons"
              onClick={() => props.onClickEditLayout(layout_index)}
              key={layout_index}
            >
              {layout.layoutName}{" "}
            </p>
          );
        })}

        <h3 className="welcome_subtitle">Help</h3>
      </div>
    </div>
  );
};

WelcomeScreen.propTypes = {
  onClickNewLayout: PropTypes.func,
  onClickEditLayout: PropTypes.func,
  layoutList: PropTypes.array
};

export default WelcomeScreen;
