import { useLocation } from "react-router-dom";
import { TiArrowBack } from "react-icons/ti";
import { RxCounterClockwiseClock } from "react-icons/rx";
import Countdown from "react-countdown-now";

function Payment() {
    const { state } = useLocation();
    console.log(state);

    let result = "";
    let characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let charactersLength = characters.length;
    for (let i = 0; i < 6; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    const user = JSON.parse(localStorage.getItem("token"));
    const back = () => {
        fetch("http://localhost:3001/movie/updateStatusEmpty", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: state.name,
                day: state.day,
                location: state.location,
                type: state.type,
                cinema: state.cinema,
                site: state.site,
                time: state.time,
                position: state.position,
                type_chair: state.type_chair,

            }),
        })

            .then((res) => res.json())
            .then((data) => {
                console.log(data);
            })
            .catch((err) => {
                console.log(err);
            });

        window.location.href = "http://localhost:3000/";
    }


    const renderer = ({ hours, minutes, seconds, completed }) => {
        if (completed) {
            fetch("http://localhost:3001/movie/updateStatusEmpty", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: state.name,
                    day: state.day,
                    location: state.location,
                    type: state.type,
                    cinema: state.cinema,
                    site: state.site,
                    time: state.time,
                    position: state.position,
                    type_chair: state.type_chair,
                }),
            })

                .then((res) => res.json())
                .then((data) => {
                    console.log(data);
                })
                .catch((err) => {
                    console.log(err);
                });
            window.location.href = "/nocart";
        } else {
            return (
                <span>{minutes}:{seconds}</span>
            )
        }
    };
    // item.comment === result
    const interval = setInterval(() => {
        fetch("http://localhost:3001/movie/middleServer", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                data.data.map((item) => {
                    if (item.amount === parseInt(state.price) && item.comment === result) {
                        clearInterval(interval);
                        alert("Thanh toán thành công");
                        //create random number
                        const code = Math.floor(Math.random() * 100000);
                        const date = new Date();
                        fetch("http://localhost:3001/auth/saveHistory", {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify({
                                name: state.name,
                                day: state.day,
                                location: state.location,
                                type: state.type,
                                cinema: state.cinema,
                                site: state.site,
                                time: state.time,
                                position: state.position,
                                type_chair: state.type_chair,
                                total_showtime: state.total_showtime,
                                order_date: date,
                                code: code,
                                email: user.user.email
                            }),
                        })
                            .then((res) => res.json())
                            .then((data) => {
                                console.log(data);
                                window.location.href = '/'
                            })
                            .catch((err) => {
                                console.log(err);
                            })
                    }
                })
            })
            .catch((err) => {
                console.log(err);
            });
    }, 40000);

    return (
        <div>
            <div className="main-containers col1-layout">
                <div className="main">
                    <div className="col-main">
                        <div className="booking-progress">
                            <div className="pages-title">
                                <h1>Thanh toán qua Momo </h1>
                            </div>
                            <div className="top-content">
                                <div className="countexpire">
                                    <h3>Countdown Clock</h3>
                                    <div id="countdown">
                                        <Countdown
                                            date={Date.now() + 20000}
                                            renderer={renderer}
                                        />
                                        <RxCounterClockwiseClock />
                                    </div>
                                </div>
                                <div className="payment" style={{ 'textAlign': 'center' }}>
                                    <img src="https://scontent.xx.fbcdn.net/v/t1.15752-9/330560498_1192497018040938_808415653431841475_n.jpg?stp=dst-jpg_s206x206&_nc_cat=108&ccb=1-7&_nc_sid=aee45a&_nc_ohc=CaUBg1xHdXEAX8iMMm_&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.xx&oh=03_AdS5f0wODTGc8aEARQnIUcNAoMGSCMJNYosY0OxJOgEkVA&oe=640FF72C" alt='' width='200' height='300' />
                                </div>
                                <div style={{
                                    'textAlign': 'center',
                                    'fontSize': '20px',
                                    'fontWeight': 'bold',
                                    'color': 'black',
                                    'marginTop': '20px',
                                    'textTransform': 'uppercase'
                                }}>Tổng số tiền bạn cần phải thanh toán là: {state.price} VND <br /><br />
                                    Nội dung thanh toán: {result} <br /> <br />
                                    <span style={{ 'fontSize': '15px', 'fontWeight': 'bold', 'color': 'red' }}>Vui lòng chuyển khoản đúng số tiền và nội dung !</span>
                                </div>

                            </div>
                            <TiArrowBack style={{
                                'width': '30px',
                                'height': '30px',
                            }} onClick={back} />
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default Payment; 