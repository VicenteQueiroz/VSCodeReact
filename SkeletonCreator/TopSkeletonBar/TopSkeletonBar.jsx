import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";

import { withStyles } from "@material-ui/core/styles";

import "./css/TopSkeletonBar.css";
import { green, grey, white } from "@material-ui/core/colors";
import DropdownMenu from "./submodules/DropdownMenu";

const styles = theme => ({
  colorSwitchBase: {
    color: grey[300],
    "&$colorChecked": {
      color: green[500],
      "& + $colorBar": {
        backgroundColor: green[500]
      }
    },
    height: 20
  },
  label: {
    color: "#FFFFFF",
    fontSize: "14px"
  },
  colorBar: {},
  colorChecked: {}
});

const TopSkeletonBar = props => {
  const {
    classes,
    inDevMode,
    onChangeDevMode,
    onNavFileNewLayout,
    restoreDefaultColors,
    layoutList,
    onClickEditLayout
  } = props;

  const handleChangeDevMode = name => event => {
    onChangeDevMode(event.target.checked);
    //this.setState({ [name]: event.target.checked });
    console.log("ahahah");
  };

  return (
    <div className="topBar">
      <div
        className="menuBar"
        style={{ flexGrow: 1, backgroundColor: "#40403C" }}
      >
        <DropdownMenu
          layoutList={layoutList}
          onClickEditLayout={onClickEditLayout}
          onNavFileNewLayout={onNavFileNewLayout}
          restoreDefaultColors={restoreDefaultColors}
        />
      </div>
      <FormControlLabel
        control={
          <Switch
            checked={inDevMode}
            onChange={handleChangeDevMode("devMode")}
            value="devMode"
            classes={{
              switchBase: classes.colorSwitchBase,
              checked: classes.colorChecked,
              bar: classes.colorBar
            }}
          />
        }
        labelPlacement="start"
        label={inDevMode ? "Developer" : "Client"}
        classes={{ label: classes.label }}
      />
    </div>
  );
};

export default withStyles(styles)(TopSkeletonBar);
