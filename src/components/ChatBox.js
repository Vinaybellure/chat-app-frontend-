import { Box } from "@mui/system";
import React from "react";
import { ChatState } from "./Context/ChatProvider";
import SingleChat from "./SingleChat";

function ChatBox({ fetchAgain, setFetchAgain }) {
  const { selectedChat } = ChatState();
  console.log("Chat Box");
  console.log({ selectedChat });
  return (
    <>
      <Box
        style={{
          flexDirection: "column",
          padding: 3,
          alignItems: "center",
          background: "white",
          borderRadius: "10px",
          borderWidth: "1px",
          // height: "77vh",
        }}
        m={3}
        sx={{
          display: { xs: selectedChat ? "flex" : "none", md: "flex" },
          width: { xs: "100%", md: "68%" },
        }}
      >
        <SingleChat fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
      </Box>
    </>
  );
}

export default ChatBox;
