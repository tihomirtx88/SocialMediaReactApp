import "./Post.scss";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import TextsmsOutlinedIcon from "@mui/icons-material/TextsmsOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { Link } from "react-router-dom";
import Comments from "../commenst/Comments";  
import { useState } from "react";
import moment from "moment/moment";

const Post = ({ post }) => {
  const [commentOpen, setCommentOpen] = useState(false);

    //Temporary
    const liked = false;

  return (
    <div className="post">
      <div className="container">
        {/* ------ */}
        <div className="user">
          <div className="userInfo">
            <img src={post.profilePicture} alt="" />
            <div className="details">
              <Link
                to={`/profile/${post.userId}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <span className="name">{post.name}</span>
              </Link>
              <span className="date">{moment(post.createdAt).from()}</span>
            </div>
          </div>
          <MoreHorizIcon />
        </div>
        {/* ------ */}
        <div className="content">
          <p>{post.description}</p>
          <img src={"./upload/" + post.image} alt="" />
        </div>
        {/* ------ */}
        <div className="info">
          <div className="item">
            {liked ? <FavoriteOutlinedIcon /> : <FavoriteBorderOutlinedIcon />}
            12 Likes
          </div>
          <div className="item" onClick={() => setCommentOpen(!commentOpen)}>
            <TextsmsOutlinedIcon />
            12 Comments
          </div>
          <div className="item">
            <ShareOutlinedIcon />
            Share
          </div>
        </div>
        {commentOpen && <Comments />}
      </div>
    </div>
  );
};

export default Post;
