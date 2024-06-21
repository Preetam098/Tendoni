import { Button, IconButton, Snackbar } from "@mui/material";
import { GridCloseIcon } from "@mui/x-data-grid";
import React, { useState } from "react";
interface props {
  open: boolean;
  closeSnacker: () => void;
  message: string;
  //   entries?: number;
  //   deleteAction: () => void;
}
// handleClose, entries, deleteAction
const Snackers = ({ open, closeSnacker, message }: props) => {
  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={closeSnacker}
      >
        <GridCloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  return (
    <>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        // onClose={handleClose}
        message={message}
        onClose={closeSnacker}
        action={action}
      />
    </>
  );
};

export default Snackers;
