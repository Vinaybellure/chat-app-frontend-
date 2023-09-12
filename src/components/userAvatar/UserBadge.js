import React from "react";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import { IconButton } from "@mui/material";
import { Box } from "@mui/system";

const UserBadge = ({ user, handleFunction }) => {
  return (
    <Box
      style={{
        display: "flex",
        alignItems: "center",
        background: "purple",
        borderRadius: "15px",
        color: "white",
        paddingRight: "7px",
        paddingLeft: "7px",
        paddingTop: "2px",
        paddingBottom: "2px",
        fontSize: "15px",
        cursor: "pointer",
        marginRight: "3px",
        marginBottom: "5px",
      }}
      onClick={handleFunction}
    >
      {user.name}{" "}
      <PersonRemoveIcon
        style={{ fontSize: "15px", paddingLeft: "5px", color: "white" }}
      />
    </Box>
  );
};

export default UserBadge;
