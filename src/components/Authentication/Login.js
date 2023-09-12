import React, { useState } from "react";
import {
  FormControl,
  Button,
  FormLabel,
  TextField,
  InputAdornment,
  IconButton,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import axios from "axios";
import { useHistory } from "react-router-dom";

const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);
  const history = useHistory();

  const handleChangePage = () => {
    props.handlePage("signup");
  };
  const submitHandler = async () => {
    if (!email || !password) {
      alert("Please fill all the fields");
    }
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const { data } = await axios.post(
        "/api/user/login",
        {
          email,
          password,
        },
        config
      );
      alert("Login Successful");
      localStorage.setItem("userInfo", JSON.stringify(data));
      history.push("/chats");
    } catch (error) {
      alert("Error Occured", error.response.data.message);
    }
  };

  return (
    <div>
      <h1>LOG IN</h1>
      <FormControl sx={{ width: "40ch" }}>
        <FormLabel
          required
          sx={{ "& .MuiFormLabel-asterisk": { color: "red" } }}
        >
          Email Address
        </FormLabel>
        <TextField
          id="outlined-basic"
          label="Email Address"
          variant="outlined"
          size="small"
          sx={{ mt: 1 }}
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <FormLabel
          sx={{ mt: 2, "& .MuiFormLabel-asterisk": { color: "red" } }}
          required
        >
          Password
        </FormLabel>
        <TextField
          id="password"
          label="Password"
          variant="outlined"
          size="small"
          sx={{ mt: 1 }}
          value={password}
          fullWidth
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                >
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            ),
          }}
          type={showPassword ? "text" : "password"}
        />
        <Button
          variant="contained"
          size="small"
          sx={{ mt: 2 }}
          onClick={submitHandler}
        >
          Let's Login
        </Button>

        <Button
          variant="contained"
          size="small"
          sx={{ mt: 2 }}
          color="error"
          onClick={() => {
            setEmail("guest@example.com");
            setPassword("123456");
          }}
        >
          Get Guest User Credentials
        </Button>
        <FormLabel
          sx={{
            display: "flex",
            justifyContent: "right",
            alignItems: "center",
            mt: 1,
          }}
        >
          Need an account?{" "}
          <Button href="#text-buttons" onClick={handleChangePage}>
            Sign Up
          </Button>
        </FormLabel>
      </FormControl>
    </div>
  );
};

export default Login;
