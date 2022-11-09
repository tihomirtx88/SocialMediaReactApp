import "./RightBar.scss"

const RightBar = () => {


    return(
        <div className="rightbar">
            <div className="container">
                <div className="item">
                    <span>Suggestion for you</span>
                    <div className="user">
                        <div className="user-info">
                            <img src="https://i.insider.com/5ca389adc6cc503c5a53fd96?width=500&format=jpeg&auto=webp" alt="" />
                            <span>Jane Doe</span>
                        </div>
                        <div className="buttons">
                            <button>follow</button>
                            <button>dismiss</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RightBar;