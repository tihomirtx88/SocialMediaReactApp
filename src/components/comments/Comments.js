import { useContext, useState } from "react";
import "./Comments.scss";
import { AuthContext } from "../../contex/authContext";
import { makeRequest } from "../../axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Comment from "../comment/Comment";

const Comments = ({ postId }) => {
  const [description, setDescription] = useState("");
  const { currentUser } = useContext(AuthContext);

  const { isLoading, err, data } = useQuery(["comments"], () =>
    makeRequest.get("/comments?postId=" + postId).then((res) => {
      return res.data;
    })
  );

  const queryClient = useQueryClient();

  const mutation = useMutation(
    (newComment) => {
      return makeRequest.post("/comments", newComment);
    },
    {
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries(["comments"]);
      },
    }
  );

  const handleClick = async (e) => {
    e.preventDefault();
    mutation.mutate({ description, postId });
    setDescription("");
  };

  return (
    <div className="comments">
      <div className="write">
        <img src={"/upload/" + currentUser.profilePicture} alt="" />
        <input
          type="text"
          placeholder="write a comment"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <button onClick={handleClick}>Send</button>
      </div>
      {err
        ? "Something went wrong"
        : isLoading
        ? "Loading..."
        : data.map((comment) => <Comment comment={comment} key={comment.id} />)}
    </div>
  );
};

export default Comments;
