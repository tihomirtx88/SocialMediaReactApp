import Stories from "../stories/Stories";
import Posts from "../posts/Posts";
import "./Home.scss";


const Home = () => {
   

    return(
        <div className="home">
            <Stories/>
            <Posts/>
        </div>
    )
}

export default Home;
