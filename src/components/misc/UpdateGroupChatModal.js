import { IconButton, Button, FormControl, TextField } from "@mui/material";
import React, { useState } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { ChatState } from "../Context/ChatProvider";
import { Box } from "@mui/system";
import UserBadge from "../userAvatar/UserBadge";
import axios from "axios";
import UserListItem from "../userAvatar/UserListItem";

const UpdateGroupChatModal = ({ fetchAgain, setFetchAgain, fetchMessages }) => {
  const [open, setOpen] = React.useState(false);

  const { selectedChat, setSelectedChat, user } = ChatState();
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [groupChatName, setGroupChatName] = useState("");
  const [renameLoading, setRenameLoading] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleRemove = async (user1) => {
    if (selectedChat.groupAdmin._id !== user._id && user1._id !== user._id) {
      alert("Only Admins can remove someone!");
      return;
    }
    try {
      setLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.put(
        `/api/chat/groupremove`,
        {
          chatId: selectedChat._id,
          userId: user1._id,
        },
        config
      );
      user1._id === user._id ? setSelectedChat() : setSelectedChat(data);
      setFetchAgain(!fetchAgain);
      fetchMessages();
      setLoading(false);
    } catch (error) {
      alert("Error Occured while removing user");
    }
  };
  const handleReName = async () => {
    if (!groupChatName) return;
    try {
      setRenameLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.put(
        "/api/chat/rename",
        {
          chatId: selectedChat._id,
          chatName: groupChatName,
        },
        config
      );
      setSelectedChat(data);
      setFetchAgain(!fetchAgain);
      setRenameLoading(false);
    } catch (error) {
      throw error;
      setGroupChatName("");
    }
  };
  const handleSearch = async (query) => {
    setSearch(query);
    if (!query) {
      return;
    }
    try {
      setLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.get(`/api/user?search=${search}`, config);
      setLoading(false);
      setSearchResult(data);
    } catch (error) {
      console.log({ error });
      setLoading(false);
    }
  };

  const handleAddUser = async (user1) => {
    if (selectedChat.users.find((u) => u._id === u._id)) {
      alert("User Already in the group");
      return;
    }
    if (selectedChat.groupAdmin._id !== user1._id) {
      alert("Only Admins can add someone!");
      return;
    }
    try {
      setLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.put(
        "/api/chat/groupadd",
        { chatId: selectedChat._id, userId: user1._id },
        config
      );
      setSelectedChat(data);
      setFetchAgain(!fetchAgain);
      setLoading(false);
    } catch (error) {
      alert("Error Occured while adding the user");
      setLoading(false);
    }
  };
  return (
    <div>
      <IconButton style={{ display: "flex" }}>
        <VisibilityIcon onClick={handleClickOpen} />
      </IconButton>
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
          {selectedChat.chatName}
        </DialogTitle>
        <DialogContent>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              width: "100%",
              marginBottom: "10px",
            }}
          ></div>
          <DialogContentText id="alert-dialog-description">
            <Box
              style={{
                width: "100%",
                display: "flex",
                flexWrap: "wrap",
                paddingBottom: "3px",
              }}
            >
              {selectedChat.users.map((u) => (
                <UserBadge
                  key={user._id}
                  user={u}
                  handleFunction={() => handleRemove(u)}
                ></UserBadge>
              ))}
            </Box>
            <Box style={{ display: "flex", alignItems: "center" }}>
              <div>
                <TextField
                  id="outlined-basic"
                  label="Chat Name"
                  variant="outlined"
                  size="small"
                  sx={{ mt: 1 }}
                  value={groupChatName}
                  onChange={(e) => {
                    setGroupChatName(e.target.value);
                  }}
                ></TextField>
              </div>
              <div>
                <Button
                  variant="outlined"
                  size="small"
                  sx={{ ml: 2, mt: 1 }}
                  onClick={handleReName}
                >
                  Update
                </Button>
              </div>
            </Box>
            <Box style={{ display: "flex", alignItems: "center" }}>
              <TextField
                id="outlined-basic"
                label="Add user to group"
                variant="outlined"
                size="small"
                sx={{ mt: 1, mb: 1, width: "100%" }}
                // value={groupChatName}
                onChange={(e) => {
                  handleSearch(e.target.value);
                }}
              ></TextField>
            </Box>
            <Box>
              {loading ? (
                <h6>Loading...</h6>
              ) : (
                searchResult?.map((user) => (
                  <UserListItem
                    key={user._id}
                    user={user}
                    handleFunction={() => handleAddUser(user)}
                  ></UserListItem>
                ))
              )}
            </Box>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => handleRemove(user)}
            variant="contained"
            color="error"
          >
            Leave Group
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default UpdateGroupChatModal;
