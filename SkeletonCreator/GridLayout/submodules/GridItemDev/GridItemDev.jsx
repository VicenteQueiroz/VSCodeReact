import React from "react";
import "../../css/GridLayout.css"; // test comment
import PropTypes from "prop-types";
import Select from "react-select";

const colourStyles = {
  control: styles => ({
    ...styles,
    backgroundColor: "hsla(0, 0%, 100%, 0.61)",
    width: "100%"
  }),
  option: (styles, { data, isDisabled, isFocused, isSelected }) => {
    return {
      ...styles,
      backgroundColor: "#fdf2e3",
      color: "black",
      cursor: isDisabled ? "not-allowed" : "default",
      ":active": {
        backgroundColor: !isDisabled && (isSelected ? "red" : "blue")
      },
      ":hover": {
        backgroundColor: "rgb(255, 204, 143)"
      },
      width: "100%"
    };
  },
  input: styles => ({ ...styles, width: "100%" }),
  placeholder: styles => ({ ...styles, width: "100%" }),
  singleValue: (styles, { data }) => ({ ...styles, width: "100%" })
};

const GridItemDev = props => {
  const {
    componentIndex,
    onCloseWindow,
    onClickEditProperties,
    widgetOptions,
    widgetSelected,
    onWidgetSelect,
    widgetTitle
  } = props;

  // Format the options from ["a","b"] to [{value: "a", label: "a"},{value: "b", label: "b"}]
  const formatted_options = [];
  widgetOptions.map(elem => {
    formatted_options.push({ value: elem, label: elem });
  });

  return (
    <div className="gridItemDev">
      <div className="container_right">
        {" "}
        <i
          className="fas fa-times fa-2x removeGridItem"
          onClick={() => onCloseWindow(componentIndex)}
        />
      </div>
      <div className="container_select">
        <Select
          className="select"
          value={widgetSelected}
          styles={colourStyles}
          onChange={evt => onWidgetSelect(evt, componentIndex)}
          options={formatted_options}
          placeholder="Select widget..."
        />
      </div>
      <div className="container_center">
        <div className="centered">
          <p>{widgetTitle + ""}</p>
          <button
            className="editPropertiesBtn"
            onClick={() => onClickEditProperties(componentIndex)}
          >
            <i className="fas fa-cog" />
            {" Properties"}
          </button>
        </div>
      </div>
    </div>
  );
};

GridItemDev.propTypes = {
  componentIndex: PropTypes.number,
  onCloseWindow: PropTypes.func,
  onClickEditProperties: PropTypes.func,
  onWidgetSelect: PropTypes.func,
  widgetOptions: PropTypes.array,
  widgetTitle: PropTypes.string
};

export default GridItemDev;
