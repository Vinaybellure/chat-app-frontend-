import React, { useEffect, useState } from "react";
import Drawer from "@mui/material/Drawer";
import Divider from "@mui/material/Divider";
import SearchIcon from "@mui/icons-material/Search";
import { Box, IconButton, TextField } from "@mui/material";
import axios from "axios";
import ChatLoading from "../ChatLoading";
import UserListItem from "../userAvatar/UserListItem";
import { ChatState } from "../Context/ChatProvider";
import CircularProgress from "@mui/material/CircularProgress";

function LeftDrawer({ openDrawer, event1, handleSearchClose, user }) {
  const { setSelectedChat, chats, setChats } = ChatState();
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [searchResult, setSearchResult] = useState([]);
  const [loadingChat, setLoadingChat] = useState(false);

  useEffect(() => {
    if (openDrawer == true) {
      toggleDrawer("left", true, event1);
    }
  }, [openDrawer]);

  const toggleDrawer = (anchor, open, event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const toggleDrawerClose = (e) => {
    toggleDrawer("left", false, e);
    handleSearchClose(false);
  };

  const handleSearch = async () => {
    if (!search) {
      alert("Please Enter Something");
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
      alert("Failed to load search Result");
      throw error;
    }
  };

  const accessChat = async (userId, e) => {
    try {
      setLoadingChat(true);
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.post("/api/chat", { userId }, config);

      if (!chats.find((c) => c._id === data._id)) setChats([data, ...chats]);

      setSelectedChat(data);
      setLoadingChat(false);
      toggleDrawerClose(e);
    } catch (error) {
      alert("Error Fetching Chat");
      throw error;
    }
  };

  const list = (anchor) => (
    <Box
      style={{
        width: anchor === "top" || anchor === "bottom" ? "auto" : 250,
        padding: "10px",
      }}
      role="presentation"
      //   onClick={(e) => toggleDrawerClose(e)}
      //   onKeyDown={(e) => toggleDrawerClose(e)}
    >
      <Box style={{ display: "flex", marginBottom: "20px" }}>
        <TextField
          id="outlined-basic"
          label="Search User"
          variant="outlined"
          size="small"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <IconButton
          aria-label="delete"
          style={{ marginLeft: "2px" }}
          onClick={handleSearch}
        >
          <SearchIcon style={{ color: "blue" }} />
        </IconButton>
      </Box>
      <Box>
        {loading ? (
          <ChatLoading />
        ) : (
          searchResult?.map((user) => {
            return (
              <UserListItem
                key={user._id}
                user={user}
                handleFunction={(e) => accessChat(user._id, e)}
              />
            );
          })
        )}
      </Box>
    </Box>
  );

  return (
    <div>
      <React.Fragment key={"left"}>
        {/* <Button onClick={toggleDrawer("left", true)}>{"left"}</Button> */}
        <Drawer
          anchor={"left"}
          open={state["left"]}
          onClose={(e) => toggleDrawerClose(e)}
        >
          <div
            style={{ width: "100%", display: "flex", justifyContent: "center" }}
          >
            <h3>Search Users</h3>
          </div>
          <Divider />
          {list("left")}
        </Drawer>
        {/* {loadingChat && (
          <Box sx={{ display: "flex" }}>
            <CircularProgress />
          </Box>
        )} */}
      </React.Fragment>
    </div>
  );
}

export default LeftDrawer;
