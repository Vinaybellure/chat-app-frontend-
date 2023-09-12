import React, { useState } from "react";
import {
  FormControl,
  Button,
  FormLabel,
  TextField,
  IconButton,
  InputAdornment,
} from "@mui/material";
import FolderIcon from "@mui/icons-material/Folder";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import axios from "axios";
import { useHistory } from "react-router-dom";

const Signup = (props) => {
  const [fileName, setFileName] = useState("No File Choosen");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [pic, setPic] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword1, setShowPassword1] = useState(false);
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);

  const handleClickShowPassword1 = () => setShowPassword1(!showPassword1);
  const handleMouseDownPassword1 = () => setShowPassword1(!showPassword1);

  const handleChangePage = () => {
    props.handlePage("login");
  };

  const handleChangeupload = (e) => {
    setLoading(true);
    setFileName(e.target.files[0].name);
    let pic = e.target.files[0];
    if (pic == undefined) {
      alert("Please select an Image");
      return;
    }
    if (pic.type == "image/jpeg" || pic.type == "image/png") {
      const data = new FormData();
      data.append("file", pic);
      data.append("upload_preset", "chat-app");
      data.append("cloud_name", "dkvrrhxlg");
      fetch("https://api.cloudinary.com/v1_1/dkvrrhxlg/upload", {
        method: "POST",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          setFileName(data.url.toString());
          setPic(data.url.toString());
          setLoading(false);
        })
        .catch((err) => {
          setLoading(false);
        });
    } else {
      setLoading(false);
      alert("Please Select an Image");
      return;
    }
  };

  const SearchButton = () => (
    <IconButton
      color="primary"
      aria-label="upload picture"
      component="label"
      onChange={handleChangeupload}
    >
      <input hidden accept="image/*" type="file" />
      <FolderIcon />
    </IconButton>
  );

  const submitHandler = async () => {
    setLoading(true);
    if (!name || !email || !password || !confirmpassword) {
      alert("Please Filee all the fields");
      setLoading(false);
      return;
    }
    if (password != confirmpassword) {
      alert("Password Do Not Match");
      setLoading(false);
      return;
    }
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const { data } = await axios.post(
        "/api/user",
        {
          name,
          email,
          password,
          pic,
        },
        config
      );
      alert("Registaration Successful");
      localStorage.setItem("userInfo", JSON.stringify(data));
      setLoading(false);
      history.push("/chats");
    } catch (error) {
      alert("Error Occured", error.response.data.message);
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Sign Up</h1>
      <FormControl sx={{ width: "40ch" }}>
        <FormLabel
          required
          sx={{ "& .MuiFormLabel-asterisk": { color: "red" } }}
        >
          Name
        </FormLabel>
        <TextField
          id="outlined-basic"
          label="Name"
          variant="outlined"
          size="small"
          sx={{ mt: 1 }}
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        <FormLabel
          sx={{ mt: 2, "& .MuiFormLabel-asterisk": { color: "red" } }}
          required
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
        <FormLabel
          sx={{ mt: 2, "& .MuiFormLabel-asterisk": { color: "red" } }}
          required
        >
          Confirm Password
        </FormLabel>
        <TextField
          id="password"
          label="Confirm Password"
          variant="outlined"
          size="small"
          sx={{ mt: 1 }}
          value={confirmpassword}
          onChange={(e) => {
            setConfirmPassword(e.target.value);
          }}
          fullWidth
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword1}
                  onMouseDown={handleMouseDownPassword1}
                >
                  {showPassword1 ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            ),
          }}
          type={showPassword1 ? "text" : "password"}
        />
        <FormLabel sx={{ mt: 2 }}>Upload Picture</FormLabel>
        <TextField
          id="fileName"
          label={fileName}
          variant="outlined"
          size="small"
          sx={{ mt: 1 }}
          value={fileName}
          fullWidth
          InputProps={{ endAdornment: <SearchButton /> }}
        ></TextField>
        <Button
          variant="contained"
          size="small"
          sx={{ mt: 2 }}
          isloading={loading}
          onClick={submitHandler}
        >
          Let's Sing Up
        </Button>
        <FormLabel
          sx={{
            display: "flex",
            justifyContent: "right",
            alignItems: "center",
            mt: 1,
          }}
        >
          Have an account?{" "}
          <Button href="#text-buttons" onClick={handleChangePage}>
            Log in
          </Button>{" "}
        </FormLabel>
      </FormControl>
    </div>
  );
};

export default Signup;
