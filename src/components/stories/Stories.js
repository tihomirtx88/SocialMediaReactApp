import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useContext, useState } from "react";
import { AuthContext } from "../../contex/authContext";
import { makeRequest } from "../../axios";
import "./Stories.scss";
import Story from "../story/Story";

const Stories = ({ userId }) => {
  const { currentUser } = useContext(AuthContext);

  const [file, setFile] = useState(null);

  const { isLoading, error, data } = useQuery(["stories"], () =>
    makeRequest.get("/stories?userId=" + userId).then((res) => {
      return res.data;
    })
  );

  // const currentStories = data?.map((story) => <Story story={story} key={story.id} />);
  // console.log(currentStories, `currentStory`);

  const upload = async () => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await makeRequest.post("/upload", formData);
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };

  const queryClient = useQueryClient();

  const mutation = useMutation(
    (story) => {
      return makeRequest.post("/stories", story);
    },
    {
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries(["stories"]);
      },
    }
  );

  const handleClick = async (e) => {
    e.preventDefault();
    let imageUrl = "";
    if (file) imageUrl = await upload();
    mutation.mutate({ image: imageUrl });
    setFile(null);
  };

  return (
    <div className="stories">
      <div className="story">
        <img src={"/upload/" + currentUser.profilePicture} alt="" />
        <span>{currentUser.name}</span>
        <button onClick={handleClick}>+</button>
        <input
          type="file"
          id="file2"
          style={{ display: "none" }}
          onChange={(e) => setFile(e.target.files[0])}
        />
        <label className="label-for-story" htmlFor="file2">
          <div className="item">
            <span>Add Story</span>
          </div>
        </label>
      </div>

      {file && (
        <div className="story">
          <img src={URL.createObjectURL(file)} alt="" />
        </div>
      )}

      {error
        ? "Something went wrong"
        : isLoading
        ? "loading"
        : data.map((story) => (
          <Story story={story} key={story.id} />
          ))}
    </div>
  );
};

export default Stories;
