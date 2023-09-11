import axios from "axios";
import React, { useEffect, useState } from "react";
import { ChatState } from "./Context/ChatProvider";
import { Box, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import ChatLoading from "./ChatLoading";
import { Stack } from "@mui/system";
import { getSender } from "../config/ChatLogic";
import GroupChatModal from "./misc/GroupChatModal";
import "./userAvatar/UserListItem.css";

function MyChats({ fetchAgain }) {
  const [loggedUser, setLoggedUser] = useState();
  const { user, setSelectedChat, chats, setChats, selectedChat } = ChatState();

  const fetchChats = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.get("/api/chat", config);
      setChats(data);
    } catch (error) {
      alert("Failed TO Load Chats");
    }
  };

  useEffect(() => {
    setLoggedUser(JSON.parse(localStorage.getItem("userInfo")));
    fetchChats();
  }, [fetchAgain]);

  return (
    <Box
      style={{
        flexDirection: "column",
        padding: "20px",
        alignItems: "center",
        background: "white",
        borderRadius: "10px",
        borderWidth: "1px",
        // height: "77vh",
      }}
      m={3}
      sx={{
        display: { sm: selectedChat ? "none" : "flex", md: "flex" },
        width: { sm: "100%", md: "30%" },
      }}
    >
      <Box
        pb={3}
        px={3}
        style={{
          justifyContent: "space-between",
          display: "flex",
          width: "100%",
          fontFamily: "work sans",
          alignItems: "center",
          fontSize: { sm: "28px", md: "30px" },
        }}
      >
        My Chats
        <GroupChatModal>
          <Button
            variant="outlined"
            style={{
              fontSize: { sm: "17px", md: "10px", lg: "17px" },
              display: "flex",
            }}
            startIcon={<AddIcon />}
          >
            Group
          </Button>
        </GroupChatModal>
      </Box>
      <Box
        style={{
          display: "flex",
          flexDirection: "column",
          padding: "10px",
          width: "100%",
          height: "100%",
          overflowY: "hidden",
          background: "#f8f8f8",
        }}
      >
        {chats ? (
          <Stack style={{ overflowY: "scroll" }}>
            {chats.map((chat) => (
              <Box
                onClick={() => setSelectedChat(chat)}
                key={chat._id}
                className="chatDesign1"
                style={{
                  cursor: "pointer",
                  // background: SelectedChat == chat ? "#38B2AC" : "#E8E8E8",
                  color: selectedChat == chat ? "white" : "black",
                  // padding: "10px",
                  // margin: "4px",
                  // borderRadius: "10px",
                }}
              >
                {" "}
                <h4 style={{ margin: 0 }}>
                  {!chat.isGroupChat
                    ? getSender(loggedUser, chat.users)
                    : chat.chatName}
                </h4>
              </Box>
            ))}
          </Stack>
        ) : (
          <ChatLoading />
        )}
      </Box>
    </Box>
  );
}

export default MyChats;
