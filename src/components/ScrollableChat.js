import { Avatar } from "@mui/material";
import { Cursor } from "mongoose";
import React from "react";
import {
  isLastMessage,
  isSameSender,
  isSameSenderMargin,
  isSameUser,
} from "../config/ChatLogic";
import { ChatState } from "./Context/ChatProvider";
import Tooltip from "@mui/material/Tooltip";
import ScrollableFeed from "react-scrollable-feed";

const ScrollableChat = ({ messages }) => {
  const { user } = ChatState();
  return (
    <ScrollableFeed>
      {messages &&
        messages.map((m, i) => (
          <div style={{ display: "flex" }} key={m._id}>
            {(isSameSender(messages, m, i, user._id) ||
              isLastMessage(messages, i, user._id)) && (
              <Tooltip title={m.sender.name}>
                <Avatar
                  src={m.sender.pic}
                  style={{
                    marginTop: "7px",
                    marginRight: "1",
                    cursor: "pointer",
                  }}
                ></Avatar>
              </Tooltip>
            )}
            {console.log(m.sender._id, "m.sender._id", user._id, "user._id")}
            <span
              style={{
                backgroundColor: `${
                  m.sender._id == user._id ? "#BEE3F8" : "#B9F5D0"
                }`,
                borderRadius: "20px",
                padding: "5px 15px",
                maxWidth: "75%",
                marginLeft: isSameSenderMargin(messages, m, i, user._id),
                marginTop: isSameUser(messages, m, i, user._id) ? 3 : 10,
              }}
            >
              {m.content}
            </span>
          </div>
        ))}
    </ScrollableFeed>
  );
};

export default ScrollableChat;
