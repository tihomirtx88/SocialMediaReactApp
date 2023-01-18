import { Link } from "react-router-dom";
import "./online.scss";

export default function Online({ user }) {
  
  return (
    <div className="user">
      <div className="user-info">
        <Link to={`/profile/${user.id}`}
                style={{ textDecoration: "none", color: "inherit" }}>
            <img
             src={"/upload/" + user.profilePicture}
             alt=""
        />
        </Link>
        <div className="online" />
        <button className="user-span">{user.username}</button>
      </div>
    </div>
  );
}
