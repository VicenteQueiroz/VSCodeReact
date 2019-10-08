import React, { memo } from "react";
import PropTypes from "prop-types";
import ColorPicker from "./submodules/ColorPicker";
import "./css/ColorPickerBar.css";

const ColorPickerBar = props => {
  const { layoutList, handleColorChange } = props;

  let Content;
  if (layoutList === undefined || layoutList.length === 0) {
    Content = (
      <div>
        <div className="title_bar" />
        <div className="no_layout_text">No Layout selected to color</div>
      </div>
    );
  } else {
    Content = (
      <div style={{ height: "100%" }}>
        <div className="title_bar" />
        <div className="picker_body">
          <div className="third_division">
            <div className="vRow2">Background</div>
            <div className="centered">
              <ColorPicker
                color={layoutList.layoutColors[0]}
                width={150}
                onColorChange={color => handleColorChange(color, "Background")}
                borderWidth={1}
                borderColor="#232323"
              />
            </div>
          </div>
          <div className="third_division">
            <div className="vRow2">Dashboard</div>
            <div className="centered">
              <ColorPicker
                color={layoutList.layoutColors[1]}
                width={150}
                onColorChange={color => handleColorChange(color, "Dashboard")}
                borderWidth={1}
                borderColor="#232323"
              />
            </div>
          </div>
          <div className="third_division">
            <div className="vRow2">Text</div>
            <div className="centered">
              <ColorPicker
                color={layoutList.layoutColors[2]}
                width={150}
                onColorChange={color => handleColorChange(color, "Text")}
                borderWidth={1}
                borderColor="#232323"
              />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fullBar">
      <div className="bar_title">
        <div>Color Picker</div>
      </div>
      <div className="picker_content">{Content}</div>
    </div>
  );
};

ColorPickerBar.propTypes = {
  layoutList: PropTypes.object,
  handleColorChange: PropTypes.func
};

export default memo(ColorPickerBar);
