import Post from "../post/Post";
import "./Posts.scss";

const Posts = () => {
   
  

  return (
    <div className="posts">
      {posts.map((post) => (
        <Post post={post} key={post.id} />
      ))}
    </div>
  );
};

export default Posts;
