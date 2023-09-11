import React, { useState } from "react";
import {
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
  MenuList,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsIcon from "@mui/icons-material/Notifications";
import PersonIcon from "@mui/icons-material/Person";
import ProfileModal from "./ProfileModal";
import { useHistory } from "react-router-dom";
import LeftDrawer from "./LeftDrawer";
import { ChatState } from "../Context/ChatProvider";
import { getSender } from "../../config/ChatLogic";
import NotificationBadge from "react-notification-badge";
import { Effect } from "react-notification-badge";

function SideDrawer({}) {
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState();
  const [openDrawer, setOpenDrawer] = useState(false);
  const [event1, setEvent1] = useState();

  const { user, setSelectedChat, selectedChat, notification, setNotification } =
    ChatState();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const [anchorEl1, setAnchorEl1] = React.useState(null);
  const open1 = Boolean(anchorEl1);

  const history = useHistory();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClick1 = (event) => {
    setAnchorEl1(event.currentTarget);
  };

  const handleCloseMenu = (value) => {
    setAnchorEl(null);

    value == "logout" && logoutHandler();
  };

  const handleCloseMenu1 = (value) => {
    setAnchorEl1(null);
  };

  const logoutHandler = () => {
    localStorage.removeItem("userInfo");
    history.push("/");
  };

  const handleSearch = (e) => {
    setOpenDrawer(true);
    setEvent1(e);
  };

  const handleSearchClose = (value) => {
    setOpenDrawer(false);
    setEvent1();
  };

  return (
    <div>
      <Box
        sx={{
          width: 1,
          color: "black",
          background: "white",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Button
          variant="outlined"
          startIcon={<SearchIcon />}
          style={{ marginLeft: "1vh" }}
          onClick={(e) => handleSearch(e)}
        >
          Search
        </Button>
        <div>
          <h2>Chat App</h2>
        </div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <IconButton
            id="basic-button1"
            aria-controls={open1 ? "basic-menu1" : undefined}
            aria-haspopup="true"
            aria-expanded={open1 ? "true" : undefined}
            onClick={handleClick1}
          >
            <NotificationBadge
              count={notification.length}
              effect={Effect.SCALE}
            ></NotificationBadge>
            <NotificationsIcon style={{ color: "blue" }} />
          </IconButton>

          <Menu
            id="basic-menu1"
            anchorEl={anchorEl1}
            open={open1}
            onClose={() => handleCloseMenu1("close")}
            MenuListProps={{
              "aria-labelledby": "basic-button1",
            }}
          >
            <MenuList>
              {!notification.length && "No New Messages"}
              {notification.map((noti) => (
                <MenuItem
                  key={noti._id}
                  onClick={() => {
                    setSelectedChat(noti.chat);
                    setNotification(notification.filter((n) => n !== noti));
                  }}
                >
                  {noti.chat.isGroupChat
                    ? `New Message in ${noti.chat.chatName}`
                    : `New Message from ${getSender(user, noti.chat.users)}`}
                </MenuItem>
              ))}
            </MenuList>
          </Menu>

          <Button
            id="basic-button"
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
          >
            <PersonIcon style={{}} />
          </Button>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={() => handleCloseMenu("close")}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <ProfileModal user={user}>
              <MenuItem>Profile</MenuItem>
            </ProfileModal>
            <MenuItem onClick={(e) => handleCloseMenu("logout")}>
              Logout
            </MenuItem>
          </Menu>
        </div>
      </Box>
      <LeftDrawer
        openDrawer={openDrawer}
        event1={event1}
        handleSearchClose={handleSearchClose}
        user={user}
      />
    </div>
  );
}

export default SideDrawer;
