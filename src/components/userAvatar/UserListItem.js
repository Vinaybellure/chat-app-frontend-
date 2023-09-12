import { Box } from "@mui/system";
import React from "react";
import Avatar from "@mui/material/Avatar";
import "./UserListItem.css";

const UserListItem = ({ user, handleFunction }) => {
  return (
    <Box
      className="chatDesign"
      onClick={(e) => handleFunction(e)}
      style={{ cursor: "pointer" }}
    >
      <Avatar alt="Remy Sharp" src={user.pic} />
      <Box style={{ marginLeft: "10px" }}>
        <h5 style={{ margin: 0 }}>{user.name}</h5>
        <p style={{ margin: 0, fontSize: "10px" }}>
          <b>Email &nbsp;&nbsp;</b>
          {user.email}
        </p>
      </Box>
    </Box>
  );
};

export default UserListItem;
