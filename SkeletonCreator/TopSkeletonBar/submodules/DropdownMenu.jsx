import React from "react";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import Popper from "@material-ui/core/Popper";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import Divider from "@material-ui/core/Divider";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  root: {
    display: "flex"
  },
  paper: {
    marginRight: theme.spacing.unit * 2, //Needed?
    backgroundColor: "#43433d"
  },
  popper: {
    zIndex: 9999
  },
  menu_buttons: {
    fontSize: "14px",
    color: "white",
    textTransform: "none"
  },
  MenuItem: {
    fontSize: "14px",
    color: "#e2e2e2"
  }
});

class MenuListComposition extends React.Component {
  state = {
    openFile: false,
    openEdit: false,
    openNewLayout: false,
    openFile_Edit: false,
    openView: false
  };

  anchorElFile = null;
  anchorElNewLayout = null;
  anchorElFile_Edit = null;
  anchorElEdit = null;
  anchorElView = null;

  handleToggleFile = () => {
    this.setState(state => ({ openFile: !state.openFile }));
  };
  handleToggleFile_Edit = () => {
    this.setState(state => ({ openFile_Edit: !state.openFile_Edit }));
  };
  handleToggleNewLayout = () => {
    this.setState(state => ({ openNewLayout: !state.openNewLayout }));
  };
  handleToggleEdit = () => {
    this.setState(state => ({ openEdit: !state.openEdit }));
  };
  handleToggleView = () => {
    this.setState(state => ({ openView: !state.openView }));
  };

  handleCloseFile = event => {
    if (this.anchorElFile.contains(event.target)) {
      return;
    }
    this.setState({ openFile: false });
  };
  handleCloseNewLayout = event => {
    if (this.anchorElNewLayout.contains(event.target)) {
      return;
    }
    this.setState({ openNewLayout: false });
  };
  handleCloseFile_Edit = event => {
    if (this.anchorElFile_Edit.contains(event.target)) {
      return;
    }
    this.setState({ openFile_Edit: false });
  };
  handleClickFile_Edit_Layout = layout_index => {
    this.setState({ openFile_Edit: false });
    this.props.onClickEditLayout(layout_index);
  };
  handleCloseEdit = event => {
    if (this.anchorElEdit.contains(event.target)) {
      return;
    }

    this.setState({ openEdit: false });
  };

  handleCloseView = event => {
    if (this.anchorElView.contains(event.target)) {
      return;
    }

    this.setState({ openView: false });
  };

  render() {
    const {
      classes,
      onNavFileNewLayout,
      restoreDefaultColors,
      layoutList,
      onClickEditLayout
    } = this.props;
    const {
      openFile,
      openEdit,
      openView,
      openFile_Edit,
      openNewLayout
    } = this.state;

    const File = (
      <div>
        <Button
          key="File"
          className={classes.menu_buttons}
          buttonRef={node => (this.anchorElFile = node)}
          aria-owns={openFile ? "menu-list-grow" : undefined}
          aria-haspopup="true"
          onClick={this.handleToggleFile}
        >
          File
        </Button>
        <Popper
          placement="bottom-start"
          className={classes.popper}
          open={openFile}
          anchorEl={this.anchorElFile}
          transition
          disablePortal
        >
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              id="menu-list-grow"
              style={{
                transformOrigin:
                  placement === "bottom" ? "center top" : "center bottom"
              }}
            >
              <Paper className={classes.paper}>
                <ClickAwayListener onClickAway={this.handleCloseFile}>
                  <MenuList>
                    <MenuItem
                      className={classes.MenuItem}
                      onClick={this.handleCloseFile}
                    >
                      Save
                    </MenuItem>

                    <MenuItem
                      className={classes.MenuItem}
                      onClick={this.handleCloseFile}
                    >
                      Save All
                    </MenuItem>

                    <Divider />

                    <MenuItem
                      className={classes.MenuItem}
                      onClick={this.handleCloseFile}
                    >
                      Open New Tab
                    </MenuItem>
                    <MenuItem
                      className={classes.MenuItem}
                      onClick={this.handleCloseFile}
                    >
                      Close Current Tab
                    </MenuItem>

                    <Divider />

                    <MenuItem
                      className={classes.MenuItem}
                      onClick={this.handleCloseFile}
                    >
                      Exit
                    </MenuItem>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </div>
    );
    const Edit = (
      <div>
        <Button
          key="Edit"
          className={classes.menu_buttons}
          buttonRef={node => (this.anchorElEdit = node)}
          aria-owns={openEdit ? "menu-list-grow" : undefined}
          aria-haspopup="true"
          onClick={this.handleToggleEdit}
        >
          Edit
        </Button>
        <Popper
          placement="bottom-start"
          className={classes.popper}
          open={openEdit}
          anchorEl={this.anchorElEdit}
          transition
          disablePortal
        >
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              id="menu-list-grow"
              style={{
                transformOrigin:
                  placement === "bottom" ? "center top" : "center bottom"
              }}
            >
              <Paper className={classes.paper}>
                <ClickAwayListener onClickAway={this.handleCloseEdit}>
                  <MenuList>
                    <MenuItem
                      //onClick={onNavFileNewLayout}
                      onClick={this.handleToggleNewLayout}
                      className={classes.MenuItem}
                      buttonRef={node => (this.anchorElNewLayout = node)}
                    >
                      + New layout
                    </MenuItem>
                    <MenuItem
                      className={classes.MenuItem}
                      onClick={this.handleToggleFile_Edit}
                      buttonRef={node => (this.anchorElFile_Edit = node)}
                    >
                      Edit Layout
                    </MenuItem>
                    <Divider />
                    <MenuItem
                      className={classes.MenuItem}
                      onClick={this.handleCloseEdit}
                    >
                      + Add widget
                    </MenuItem>
                    <MenuItem
                      className={classes.MenuItem}
                      onClick={this.handleCloseEdit}
                    >
                      Remove all
                    </MenuItem>

                    <Divider />
                    <MenuItem
                      className={classes.MenuItem}
                      onClick={restoreDefaultColors}
                    >
                      Restore Default Colors
                    </MenuItem>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </div>
    );

    const File_Edit = (
      <div>
        <Popper
          placement="right-start"
          className={classes.popper}
          open={openFile_Edit}
          anchorEl={this.anchorElFile_Edit}
          transition
          disablePortal
        >
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              id="menu-list-grow"
              style={{
                transformOrigin:
                  placement === "bottom" ? "center top" : "center bottom"
              }}
            >
              <Paper className={classes.paper}>
                <ClickAwayListener onClickAway={this.handleCloseFile_Edit}>
                  <MenuList>
                    {layoutList !== undefined &&
                      layoutList.map((layout, layout_index) => {
                        return (
                          <MenuItem
                            className={classes.MenuItem}
                            onClick={() =>
                              this.handleClickFile_Edit_Layout(layout_index)
                            }
                            key={layout_index}
                          >
                            {layout.layoutName}
                          </MenuItem>
                        );
                      })}
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </div>
    );
    const NewLayout = (
      <div>
        <Popper
          placement="right-start"
          className={classes.popper}
          open={openNewLayout}
          anchorEl={this.anchorElNewLayout}
          transition
          disablePortal
        >
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              id="menu-list-grow"
              style={{
                transformOrigin:
                  placement === "bottom" ? "center top" : "center bottom"
              }}
            >
              <Paper className={classes.paper}>
                <ClickAwayListener onClickAway={this.handleCloseNewLayout}>
                  <MenuList>
                    <MenuItem className={classes.MenuItem}>TEST</MenuItem>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </div>
    );

    const View = (
      <div>
        <Button
          key="View"
          className={classes.menu_buttons}
          buttonRef={node => (this.anchorElView = node)}
          aria-owns={openView ? "menu-list-grow" : undefined}
          aria-haspopup="true"
          onClick={this.handleToggleView}
        >
          View
        </Button>
        <Popper
          placement="bottom-start"
          className={classes.popper}
          open={openView}
          anchorEl={this.anchorElView}
          transition
          disablePortal
        >
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              id="menu-list-grow"
              style={{
                transformOrigin:
                  placement === "bottom" ? "center top" : "center bottom"
              }}
            >
              <Paper className={classes.paper}>
                <ClickAwayListener onClickAway={this.handleCloseView}>
                  <MenuList>
                    <MenuItem
                      className={classes.MenuItem}
                      onClick={this.handleCloseView}
                    >
                      {" "}
                      Parameters Bar
                    </MenuItem>
                    <MenuItem
                      className={classes.MenuItem}
                      onClick={this.handleCloseView}
                    >
                      Color Picker
                    </MenuItem>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </div>
    );

    return (
      <div className={classes.root}>
        {File}
        {NewLayout}
        {File_Edit}
        {Edit}
        {View}
      </div>
    );
  }
}

MenuListComposition.propTypes = {
  classes: PropTypes.object.isRequired,
  layoutList: PropTypes.array
};

export default withStyles(styles)(MenuListComposition);
