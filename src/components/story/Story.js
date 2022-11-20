import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useContext, useState } from "react";
import { makeRequest } from "../../axios";
import { AuthContext } from "../../contex/authContext";
import "./Story.scss";

export const Story = ({ story }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const { currentUser } = useContext(AuthContext);

  const queryClient = useQueryClient();

  const deleteMutation = useMutation(
    (storyId) => {
      return makeRequest.delete("/stories/" + storyId);
    },
    {
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries(["stories"]);
      },
    }
  );

  const handleDelete = () => {
    deleteMutation.mutate(story.id);
  };

  return (
    <>
      <div className="story" key={story.id}>
        <img src={"./upload/" + story.image} alt="" />
        <span>{story.name}</span>
        <div className="icon-delete">
          {menuOpen && story.userId === currentUser.id && (
            <button className="button-delete-story" onClick={handleDelete}>
              Delete
            </button>
          )}
           <span  onClick={() => setMenuOpen(!menuOpen)}>
            ...
          </span>
        </div>
      </div>
    </>
  );
};

export default Story;
