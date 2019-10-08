import React, { memo } from "react";
import PropTypes from "prop-types";
import {
  withStyles,
  makeStyles,
  createMuiTheme,
  MuiThemeProvider
} from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import Add from "@material-ui/icons/Queue";
import Park from "@material-ui/icons/LocalParking";
import Color from "@material-ui/icons/ColorLens";
import Cloud from "@material-ui/icons/CloudUpload";
import Settings from "@material-ui/icons/Settings";
import Tooltip from "@material-ui/core/Tooltip";
import Badge from "@material-ui/core/Badge";

const theme = createMuiTheme({
  overrides: {
    MuiTooltip: {
      tooltip: {
        fontSize: "14px"
      }
    }
  }
});

const styles = {
  root: {},
  fullBar: {
    width: "50px",
    backgroundColor: "#363636",
    display: "flex",
    flexDirection: "column"
  },
  logo: {
    color: "#AEAEAE",
    backgroundColor: "#363636",
    margin: "12px 12px 12px 12px",
    padding: "0px",
    "&:hover": {
      color: "white"
    }
  },
  logo_toggle_on: {
    color: "#adaead"
  },
  logo_toggle_off: {
    color: "#262626"
  },
  actionBar: {
    flexGrow: 1,
    justifyContent: "space-evenly",
    display: "flex",
    flexDirection: "column"
  },
  grow: {
    flexGrow: 4
  },
  tooltip: {
    fontSize: "10px"
  }
};

const ActionBar = props => {
  const {
    classes,
    inDevMode,
    startView,
    showParametersBar,
    showColorPickerBar,
    onAddWidget,
    canSave,
    onSaveLayout,
    onParametersView,
    onColorPickerView,
    onClickSettings
  } = props;
  return (
    <div className={classes.fullBar}>
      <MuiThemeProvider theme={theme}>
        <div className={classes.actionBar}>
          <Tooltip
            title="Add Widget"
            placement="right"
            className={classes.tooltip}
          >
            <div>
              <IconButton
                className={classes.logo}
                onClick={onAddWidget}
                disabled={!inDevMode || startView}
              >
                <Add />
              </IconButton>
            </div>
          </Tooltip>
          <Tooltip
            title="Parameters"
            placement="right"
            className={classes.tooltip}
          >
            <div>
              <IconButton
                className={
                  showParametersBar
                    ? `${classes.logo} ${classes.logo_toggle_on}`
                    : `${classes.logo} ${classes.logo_toggle_off}`
                }
                onClick={onParametersView}
                disabled={false}
              >
                <Park />
              </IconButton>
            </div>
          </Tooltip>
          <Tooltip
            title="Color Picker"
            placement="right"
            className={classes.tooltip}
          >
            <div>
              <IconButton
                className={
                  showColorPickerBar
                    ? `${classes.logo} ${classes.logo_toggle_on}`
                    : `${classes.logo} ${classes.logo_toggle_off}`
                }
                onClick={onColorPickerView}
                disabled={false}
              >
                <Color />
              </IconButton>
            </div>
          </Tooltip>
          <Tooltip
            title="Redis Upload"
            placement="right"
            className={classes.tooltip}
          >
            <div>
              <IconButton
                className={classes.logo}
                onClick={onSaveLayout}
                disabled={startView}
              >
                <Badge
                  color="secondary"
                  variant="dot"
                  invisible={!canSave}
                  className={classes.margin}
                >
                  <Cloud />
                </Badge>
              </IconButton>
            </div>
          </Tooltip>
        </div>
        <div className={classes.grow} />
        <Tooltip title="Settings" placement="right" className={classes.tooltip}>
          <IconButton className={classes.logo} onClick={onClickSettings}>
            <Settings />
          </IconButton>
        </Tooltip>
      </MuiThemeProvider>
    </div>
  );
};

ActionBar.propTypes = {
  classes: PropTypes.object.isRequired,
  inDevMode: PropTypes.bool,
  startView: PropTypes.bool,
  showParametersBar: PropTypes.bool,
  showColorPickerBar: PropTypes.bool,
  canSave: PropTypes.bool,
  onAddWidget: PropTypes.func,
  onSaveLayout: PropTypes.func,
  onParametersView: PropTypes.func,
  onColorPickerView: PropTypes.func
};

export default memo(withStyles(styles)(ActionBar));
