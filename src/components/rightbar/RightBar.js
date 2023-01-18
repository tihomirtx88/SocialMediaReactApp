import { useQuery } from "@tanstack/react-query";
import { makeRequest } from "../../axios";
import Online from "../online/online";
import "./RightBar.scss";

const RightBar = () => {
  const { isLoading, error, data } = useQuery(["users"], () =>
    makeRequest
      .get("/users")
      .then((res) => { return res.data; 
    })
);

  console.log(data,"datata");

  return (
    <div className="rightbar">
      <div className="container">
        <div className="item">
          <span>Suggestion for you</span>

          <div className="user">
            <div className="user-info">
              <img
                src="https://i.insider.com/5ca389adc6cc503c5a53fd96?width=500&format=jpeg&auto=webp"
                alt=""
              />
              <span>Jane Doe</span>
            </div>
            <div className="buttons">
              <button>follow</button>
              <button>dismiss</button>
            </div>
          </div>

          <div className="user">
            <div className="user-info">
              <img
                src="https://i.insider.com/5ca389adc6cc503c5a53fd96?width=500&format=jpeg&auto=webp"
                alt=""
              />
              <span>Jane Doe</span>
            </div>
            <div className="buttons">
              <button>follow</button>
              <button>dismiss</button>
            </div>
          </div>
        </div>
        <div className="item">
          <span>Latest Activities</span>
        </div>
        <div className="item">
          <span>Online Firends</span>

          {error
            ? "Somthing went wrong"
            : isLoading
            ? "Loading"
            : data.map((user) => <Online user={user} key={user.id} />)}
  
        </div>
      </div>
    </div>
  );
};

export default RightBar;
