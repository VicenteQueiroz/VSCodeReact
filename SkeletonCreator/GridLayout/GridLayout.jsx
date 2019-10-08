//import React, { PureComponent } from "react";
import React from "react";
import { Responsive, WidthProvider } from "react-grid-layout";
import GridItemCard from "./submodules/GridItemCard/GridItemCard";
import GridItemDev from "./submodules/GridItemDev/GridItemDev";
import PropTypes from "prop-types";
import "./css/GridLayout.css";
// This allows resizable and shadow
require("react-grid-layout/css/styles.css");
require("react-resizable/css/styles.css");

const ResponsiveGridLayout = WidthProvider(Responsive);

const GridLayout = props => {
  //{lg: layout1, md: layout2, ...}
  var layouts = {
    lg: props.componentList,
    md: props.componentList,
    sm: props.componentList,
    xs: props.componentList,
    xxs: props.componentList
  };

  // previous bck color was #ededed
  const gridColor = props.inDevMode ? "#ffdeb7" : props.layoutColors[0];
  return (
    <ResponsiveGridLayout
      className="layout"
      style={{ backgroundColor: props.layoutColors[0] }}
      //layouts={layouts} //TODO: check/test responsivness this
      rowHeight={20}
      onLayoutChange={props.onLayoutChange}
      breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
      cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
      isDraggable={props.inDevMode}
      isResizable={props.inDevMode}
    >
      {props.componentList.map((component, componentIndex) => {
        return (
          <div
            key={component.parameters.layout.i}
            data-grid={{
              x: component.parameters.layout.x,
              y: component.parameters.layout.y,
              w: component.parameters.layout.w,
              h: component.parameters.layout.h,
              static: component.static
            }}
            className="gridLayoutContainer"
            style={{ backgroundColor: gridColor }}
          >
            {/* This is the view of the Developer */}
            {props.inDevMode && (
              <GridItemDev
                onCloseWindow={props.onCloseWindow}
                onClickEditProperties={props.onClickEditProperties}
                componentIndex={componentIndex}
                widgetOptions={props.widgetOptions}
                widgetSelected={component.selected}
                widgetTitle={component.name}
                onWidgetSelect={props.onWidgetSelect}
              />
            )}
            {/* This is the view of the client */}
            {!props.inDevMode && (
              <GridItemCard
                {...props}
                title={component.i}
                icon="home"
                onClickEditProperties={props.onClickEditProperties}
                widgetSelected={component.selected}
                tokens={props.tokens}
              />
            )}
          </div>
        );
      })}
    </ResponsiveGridLayout>
  );
};

GridLayout.propTypes = {
  componentList: PropTypes.array,
  layoutColors: PropTypes.array,
  onLayoutChange: PropTypes.func,
  onCloseWindow: PropTypes.func,
  onClickEditProperties: PropTypes.func,
  onWidgetSelect: PropTypes.func,
  widgetOptions: PropTypes.array
};

GridLayout.defaultProps = {
  layoutColors: ["#232323", "#232323", "#232323"]
};

export default GridLayout;
