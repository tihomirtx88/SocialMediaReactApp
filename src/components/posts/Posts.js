import Post from "../post/Post";
import "./Posts.scss";
import { useQuery } from "@tanstack/react-query";
import { makeRequest } from "../../axios";

const Posts = ({userId}) => {
  const { isLoading, error, data } = useQuery(["posts"], () =>
    makeRequest.get("/posts?userId=" + userId).then((res) => {
      console.log(res.data);
      return res.data;
    })
  );

  return (
    <div className="posts">
      {error 
      ? "Somthing went wrong" 
      : (isLoading 
      ? "Loading" 
      : data.map((post) => (
        <Post post={post} key={post.id} />
      )))}
    </div>
  );
};

export default Posts;
