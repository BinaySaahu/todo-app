import React, { useContext, useState } from "react";
import "./Login.css";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Cookies, useCookies } from "react-cookie";
import { UserContext } from "../context/UserContext";
function Login(props) {
  const navigate = useNavigate();
  const {userDetails,setUserDetails} = useContext(UserContext);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [cookies, setCookie, removeCookie] = useCookies(["user"]);

  const handleClose = () => {
    props.setViewLogin(false);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`http://localhost:8000/auth/login`, {
        email,
        password,
      });
      console.log(response);
      setCookie("AuthToken", response.data.token);
      setCookie("UserId", response.data.userId);
      const success = response.status === 201;
      if (success) {
        props.setIsLoggedin(true);
        setUserDetails(response.data);
        navigate("/dashboard");
      } else if (response.status === 409) {
        props.setViewRegister(true);
        props.setViewLogin(false);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="login">
      <div className="login_form">
        <div className="login_head">
          Login
          <CloseIcon className="close_icon" onClick={handleClose} />
        </div>
        <input
          type="text"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="login_btn" onClick={handleSubmit}>
          Submit
        </button>
      </div>
    </div>
  );
}

export default Login;
