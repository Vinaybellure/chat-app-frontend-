import { IconButton, Button, TextField } from "@mui/material";
import React, { useState } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { ChatState } from "../Context/ChatProvider";
import axios from "axios";
import UserListItem from "../userAvatar/UserListItem";
import UserBadge from "../userAvatar/UserBadge";
import { Box } from "@mui/system";

const GroupChatModal = ({ children }) => {
  const [open, setOpen] = React.useState(false);
  const [groupChatName, setGroupChatName] = useState();
  const [selectedUsers, setselectedUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [searchReasult, setSearchReasult] = useState([]);
  const [loading, setLoading] = useState(false);

  const { user, chats, setChats } = ChatState();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleSearch = async (e) => {
    setSearch(e);
    if (!e) {
      return;
    }
    if (e == "") {
      setSearchReasult([]);
    } else {
      try {
        setLoading(true);
        const config = {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        };
        const { data } = await axios.get(`/api/user?search=${search}`, config);
        setLoading(false);
        setSearchReasult(data);
      } catch (error) {
        alert("Failed to Load the search results");
      }
    }
  };
  const handleSubmit = async () => {
    if (!groupChatName && !selectedUsers) {
      alert("Please fill all the fields");
    }
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.post(
        "/api/chat/group",
        {
          name: groupChatName,
          users: JSON.stringify(selectedUsers.map((u) => u._id)),
        },
        config
      );
      setChats([data, ...chats]);
      handleClose();
      alert("New Group Chat created");
    } catch (error) {
      alert("Error Occured while createing a group");
    }
  };

  const handleGroup = (userToAdd) => {
    if (selectedUsers.includes(userToAdd)) {
      alert("User Already exist");
      return;
    } else {
      setselectedUsers([...selectedUsers, userToAdd]);
    }
  };

  const handleDelete = (user) => {
    setselectedUsers(selectedUsers.filter((sel) => sel._id !== user._id));
  };
  return (
    <>
      <span onClick={handleClickOpen}>{children}</span>
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
          Create Group Chat
        </DialogTitle>
        <DialogContent
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "20px",
          }}
        >
          <TextField
            id="outlined-basic"
            style={{ width: "50vh" }}
            label="Chat Name"
            variant="outlined"
            size="small"
            value={groupChatName}
            onChange={(e) => setGroupChatName(e.target.value)}
          />
          <TextField
            id="outlined-basic"
            label="Add users eg: John, Jane"
            variant="outlined"
            size="small"
            onChange={(e) => handleSearch(e.target.value)}
            style={{ marginTop: "15px", marginBottom: "15px", width: "50vh" }}
          />
          <Box style={{ display: "flex", width: "100%", flexWrap: "wrap" }}>
            {selectedUsers.map((user) => (
              <UserBadge
                key={user._id}
                user={user}
                handleFunction={() => handleDelete(user)}
              />
            ))}
          </Box>
          {loading ? (
            <div>Loading</div>
          ) : (
            searchReasult?.slice(0, 4).map((user) => (
              <div style={{ width: "100%" }}>
                <UserListItem
                  key={user._id}
                  user={user}
                  handleFunction={() => handleGroup(user)}
                />
              </div>
            ))
          )}
          <DialogContentText id="alert-dialog-description"></DialogContentText>
        </DialogContent>
        <DialogActions sx={{ pb: "20px", px: "20px" }}>
          <Button onClick={handleSubmit} autoFocus variant="outlined">
            Create Chat
          </Button>
          <Button
            onClick={handleClose}
            autoFocus
            variant="outlined"
            color="error"
          >
            cancel
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default GroupChatModal;
