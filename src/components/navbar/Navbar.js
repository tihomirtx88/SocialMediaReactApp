import "./Navbar.scss";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import WbSunnyOutlinedIcon from "@mui/icons-material/WbSunnyOutlined";
import GridViewOutlinedIcon from "@mui/icons-material/GridViewOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { DarkModeContext } from "../../contex/darkModeContextMode";
import { AuthContext } from "../../contex/authContext";

const Navbar = () => {
  const { toggle, darkMode } = useContext(DarkModeContext);
  const { currentUser, socket } = useContext(AuthContext);

  const [notifications, setNotifications] = useState([]);
  const [open, setOpen] = useState(false);


  const { logOut } = useContext(AuthContext);
  const navigate = useNavigate();

  // -------Socket

  useEffect(() => {
    if (!socket) return
    socket.on("getNotification", (data) => {
      console.log(data, `from navbar data`);
      // take event getNotification from server 
      setNotifications((prev) => [...prev, data]);
    });
  }, [socket]);

  console.log(currentUser.username, `from navbar current user`);
  console.log(notifications, `notifications from navbar `);

  const displayNotification = ({ senderName, type }) => {
    let action;

    if (type === 1) {
      action = "liked";
    } 
    return (
      <span className="notification">{`${senderName} ${action} your post.`}</span>
    );
  };
  // --------Logout

  const fetchLogout = async () => {
    await logOut()
    navigate("/login")
  };

  const handleDelete = () => {
    fetchLogout();
  };

  const handleHomeClick = () => {
    navigate("/");
  }

  const handleRead = () => {
    setNotifications([]);
    setOpen(false);
  };

  return (
    <div className="navbar">
      <div className="left">
        <Link to={"/"} style={{ textDecoration: "none" }}>
          <span>Social group</span>
        </Link>
        <HomeOutlinedIcon className="HomeOutlinedIcon" onClick={handleHomeClick}/>
  
        {darkMode ? (
          <WbSunnyOutlinedIcon style={{ cursor: "pointer" }} onClick={toggle} />
        ) : (
          <DarkModeOutlinedIcon
            style={{ cursor: "pointer" }}
            onClick={toggle}
          />
        )}
        <GridViewOutlinedIcon />
        <div className="search">
          <SearchOutlinedIcon />
          <input type="text" placeholder="Search..." />
        </div>
      </div>
      {open && (
        <div className="notifications">
          {notifications.map((n) => displayNotification(n))}
          <button className="nButton" onClick={handleRead}>
            Mark as read
          </button>
        </div>
      )}
      <div className="right">
        <PersonOutlinedIcon />
        <EmailOutlinedIcon />
        <NotificationsOutlinedIcon onClick={() => setOpen(!open)}/>
        <div className="user">
          <button className="logout-button" onClick={handleDelete}>Logout</button>
          <span>{currentUser.name}</span>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
