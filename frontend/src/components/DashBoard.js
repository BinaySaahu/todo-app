import React, { useContext, useEffect, useState } from "react";
import "./DashBoard.css";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Tasks from "./Tasks";
import { useCookies } from "react-cookie";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";
import { UserContext } from "../context/UserContext";
function DashBoard(props) {
  const [cookies, setCookie, removeCookie] = useCookies(["user"]);
  const { userDetails, setUserDetails } = useContext(UserContext);
  const [title, setTitle] = useState("");
  const [items, setItems] = useState([]);
  const [name, setName] = useState("");
  const token = cookies.AuthToken;
  const navigate = useNavigate();
  const handleSubmitTask = async (e) => {
    e.preventDefault();
    const newItem = title;
    const userid = cookies.UserId;
    setUserDetails(userDetails.tasks.push(newItem));
    setItems(userDetails.tasks);
    console.log(userDetails.tasks);
    try {
      const response = await axios.put(`http://localhost:8000/dash/dashboard`, {
        newItem,
        userid,
      });
    } catch (error) {
      console.log(error);
    }
  };
  const handleLogout = () => {
    navigate("/");
    removeCookie("AuthToken");
    removeCookie("UserId");
  };
  const loadData = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/dash/getdata`, {
        withCredentials: true,
        headers: {
          auth_token: token,
        },
      });
      console.log("Response is:",response)
      setUserDetails(response.data);
      console.log("User details:",userDetails.tasks);
      setItems(userDetails.tasks);
      console.log("Items are:",items);
      setName(userDetails.name);

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
    return ()=>{
      loadData();
    }
  });

  return (
    <div className="dashboard">
      <div className="dashboard_navbar">
        <div className="dashboard_navbar_left">
          <Link to="/">
            <h1>ToDo</h1>
          </Link>
        </div>
        <div className="dashboard_navbar_right">
          <AccountCircleIcon />
          <p className="dashboard_navbar_right_p">{name}</p>
          <div className="dashboard_logout_container">
            <div className="dashboard__logout" onClick={handleLogout}>
              <LogoutIcon />
              <p>Logout</p>
            </div>
          </div>
        </div>
      </div>
      <div className="dashboard_body">
        <div className="dashboard_body_container">
          <h3>Enter your task</h3>
          <div style={{ display: "flex", alignItems: "center" }}>
            <input type="text" onChange={(e) => setTitle(e.target.value)} />
            <button onClick={handleSubmitTask}>Submit</button>
          </div>
          <div className="dashboard_body_container_list">
            {items?.map((item, index) => (
              <Tasks key={index} item={item} items={items} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashBoard;
