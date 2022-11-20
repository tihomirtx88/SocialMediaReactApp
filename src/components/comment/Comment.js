import "./Comment.scss";
import moment from "moment";
import { useContext, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { makeRequest } from "../../axios";
import { AuthContext } from "../../contex/authContext";

const Comment = ({ comment }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const { currentUser } = useContext(AuthContext);

  const queryClient = useQueryClient();

  const deleteMutation = useMutation(
    (commentId) => {
      return makeRequest.delete("/comments/" + commentId);
    },
    {
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries(["comments"]);
      },
    }
  );

  const handleDelete = () => {
    deleteMutation.mutate(comment.id);
  };

  return (
    <div className="comment">
      <img src={"/upload/" + comment.profilePicture} alt="" />
      <div className="info">
        <span>{comment.name}</span>
        <p>{comment.description}</p>
      </div>
      <div className="span-delete">
        <span className="date">{moment(comment.createdAt).fromNow()}</span>
        {menuOpen && comment.userId === currentUser.id && (
          <button className="button-delete-comment" onClick={handleDelete}>
            Delete
          </button>
        )}

        <span
          className="span-delete-comment"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          Delete Comment
        </span>
      </div>
    </div>
  );
};

export default Comment;
