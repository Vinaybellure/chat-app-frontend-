import React, { useState } from "react";
import { Box } from "@mui/material";
import "./Homepage.css";
import Login from "../components/Authentication/Login";
import Signup from "../components/Authentication/Signup";
const Homepage = () => {
  const [page, setPage] = useState("login");

  const handlePage = (value) => {
    setPage(value);
  };
  return (
    <div className="login">
      <Box className="login1">
        {page === "login" ? (
          <Login handlePage={handlePage} />
        ) : (
          <Signup handlePage={handlePage} />
        )}
      </Box>
    </div>
  );
};

export default Homepage;
