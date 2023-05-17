import React, { useEffect, useState } from "react";
import "./HomePage.css";
import Login from "./Login";
import Register from "./Register";
import axios from "axios";
import { useCookies } from "react-cookie";
function HomePage(props) {
  const [viewLogin, setViewLogin] = useState(false);
  const [viewRegister, setViewRegister] = useState(false);
  const [cookies, setCookie, removeCookie] = useCookies(["user"]);
  const handleLogin = () => {
    setViewLogin(true);
  };
  const handleRegister = () => {
    setViewRegister(true);
  };
  const loadData = async () => {
    const token = cookies.AuthToken;
  try {
    const response = await axios.get(`http://localhost:8000/dash/getdata`, {
      withCredentials: true,
      headers: {
        auth_token: token,
      },
    });
    if (response.status === 200) {
        props.setIsLoggedin(true);
      } else {
        props.setIsLoggedin(false);
      }
  } catch (err) {
    console.log(err);
  }
};
  useEffect(() => {
    
    loadData();
  });
  return (
    <div className="homepage">
      <div className="homepage_header">
        <h1>ToDo.Com</h1>
      </div>
      <div className="homepage_login">
        <button className="homepage_login_btn" onClick={handleLogin}>
          Login
        </button>
        {viewLogin && (
          <Login
            setViewLogin={setViewLogin}
            setViewRegister={setViewRegister}
            setIsLoggedin={props.setIsLoggedin}
          />
        )}
      </div>
      <div className="homepage_register">
        <button className="homepage_register_btn" onClick={handleRegister}>
          Register
        </button>
        {viewRegister && (
          <Register
            setViewRegister={setViewRegister}
            setViewLogin={setViewLogin}
          />
        )}
      </div>
    </div>
  );
}

export default HomePage;
