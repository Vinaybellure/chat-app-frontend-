import { IconButton, Button } from "@mui/material";
import React from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

function ProfileModal({ user, children }) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      {children ? (
        <span onClick={handleClickOpen}>{children}</span>
      ) : (
        <IconButton>
          <VisibilityIcon onClick={handleClickOpen} />
        </IconButton>
      )}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle
          id="alert-dialog-title"
          style={{ display: "flex", justifyContent: "center" }}
        >
          {user.name}
        </DialogTitle>
        <DialogContent>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              width: "100%",
              marginBottom: "10px",
            }}
          >
            <img
              src={user.pic}
              style={{ width: "150px", height: "150px", borderRadius: "5%" }}
            />
          </div>
          <DialogContentText id="alert-dialog-description">
            {user.email}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} autoFocus>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default ProfileModal;
