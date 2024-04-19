import React from "react";
import Dialog from "@mui/material/Dialog";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

function CustomDialog({ open, onClose, children, ...otherProps }) {
  return (
    <Dialog open={open} onClose={onClose} {...otherProps}>
      {/* Close button at the top-right corner */}
      <IconButton
        aria-label="close"
        onClick={onClose}
        style={{ position: "absolute", right: 8, top: 8, color: "#fff" }}
      >
        <CloseIcon />
      </IconButton>
      {children}
    </Dialog>
  );
}

export default CustomDialog;
