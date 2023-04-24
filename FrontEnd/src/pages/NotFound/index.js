import "./style.css"
import { useNavigate } from "react-router-dom";
function NotFound() {
    const navigate = useNavigate();
    const goHome = () => {
        navigate("/")
    }

    return (
        <div className="main-containers col1-layout">
            <div className="main">
                <div className="col-main">
                    <div className="std">
                        <div className="page-head-alt">
                            <h3>We are sorry, but the page you are looking for cannot be found</h3>
                        </div>
                        <div>
                            <ul className="disc">
                                <li>If you typed the URL directly, please make sure the spelling is correct.</li>
                                <li>If you clicked on a link to get here, we must have moved the content.<br></br>
                                    Please try our store search box above to search for an item.
                                </li>
                                <li>
                                    If you are not sure how you got here, <span className="back" onClick={() => navigate(-1)}>go back </span>
                                    to the previous page or return to our,  <span className="back" onClick={goHome}>store homepage</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default NotFound;


// function NotFound() {
//     return (
//         <div>h11111</div>
//     )
// }

// export default NotFound;