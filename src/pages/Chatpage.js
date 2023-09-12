import React, { useEffect, useState } from "react";
import axios from "axios";
import { ChatState } from "../components/Context/ChatProvider";
import SideDrawer from "../components/misc/SideDrawer";
import MyChats from "../components/MyChats";
import ChatBox from "../components/ChatBox";

const Chatpage = () => {
  const { user } = ChatState();

  const [fetchAgain, setFetchAgain] = useState(false);
  return (
    <div style={{ width: "100%" }}>
      {user && <SideDrawer user={user} />}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
          height: "91.5vh",
          // padding: "10px",
        }}
      >
        {user && <MyChats fetchAgain={fetchAgain} />}
        {user && (
          <ChatBox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
        )}
      </div>
    </div>
  );
};

export default Chatpage;
