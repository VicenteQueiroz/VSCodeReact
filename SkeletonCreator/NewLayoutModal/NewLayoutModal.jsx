import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import PropTypes from "prop-types";

const NewLayoutModal = props => {
  const {
    openModal,
    onCloseModal,
    onSaveModalLayoutName,
    onChangeModalLayoutName
  } = props;
  return (
    <Dialog
      open={openModal}
      onClose={onCloseModal}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title"> + New Layout</DialogTitle>
      <DialogContent>
        <DialogContentText>Enter Layout Name:</DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label=""
          type="text"
          fullWidth
          onChange={evt => onChangeModalLayoutName(evt)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onCloseModal} color="primary">
          Cancel
        </Button>
        <Button onClick={onSaveModalLayoutName} color="primary">
          Save Layout
        </Button>
      </DialogActions>
    </Dialog>
  );
};

NewLayoutModal.propTypes = {
  openModal: PropTypes.bool,
  onCloseModal: PropTypes.func,
  onChangeModalLayoutName: PropTypes.func,
  onSaveModalLayoutName: PropTypes.func
};

export default NewLayoutModal;
