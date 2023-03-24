import React, { useEffect, useState } from "react";
import "./DashBoard.css";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Tasks from "./Tasks";
import { useCookies } from "react-cookie";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";
function DashBoard(props) {
  const [cookies, setCookie, removeCookie] = useCookies(["user"]);
  const [title, setTitle] = useState(null);
  const [items, setItems] = useState([]);
  const [name, setName] = useState(null);
  const userId = cookies.UserId;
  const navigate = useNavigate();
  useEffect(() => {
    loadData();
  }, [items]);
  const loadData = async () => {
    try {
      const response = await axios.get("http://localhost:8000/view", {
        params: { userId },
      });
      const loadItems = response.data.tasks;
      const UserName = response.data.user_name;
      setItems(loadItems);
      setName(UserName);
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmitTask = async (e) => {
    e.preventDefault();
    const newItem = title;
    const userid = cookies.UserId;
    // setItems([...items, newItem]);
    try {
      console.log(userid);
      const response = await axios.put(`http://localhost:8000/dashboard`, {
        newItem,
        userid,
      });
      // setCookie("AuthToken", response.data.token,{ path: '/' });
      // setCookie("UserId", response.data.userId,{ path: '/' });
      const success = response.status === 201;
    } catch (error) {
      console.log(error);
    }
  };
  const handleLogout = ()=>{
    navigate("/");
    removeCookie("user",{path:"/",domain: "localhost"});
  }

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
            <div className="dashboard__logout" onClick = {handleLogout}>
              <LogoutIcon  />
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
            {items.map((item, index) => (
              <Tasks key={index} item={item} items={items} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashBoard;
