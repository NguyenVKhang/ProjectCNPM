import { useLocation } from "react-router-dom";
import { TiArrowBack } from "react-icons/ti";
import { RxCounterClockwiseClock } from "react-icons/rx";
import { useEffect } from "react";
import Countdown from "react-countdown-now";

function Payment() {
    const { state } = useLocation();
    const currency = new Intl.NumberFormat('vi-VN', {style: 'currency', currency: 'VND'}).format(state.price);
    let result = "";
    let characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let charactersLength = characters.length;
    for (let i = 0; i < 6; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    const user = JSON.parse(localStorage.getItem("token"));
    console.log(user);
    const back = () => {
        window.history.back()
    }

    useEffect(() => {
        const handleBeforeUnload = (event) => {
          // Thực hiện các hành động tại đây trước khi người dùng rời khỏi trang
          event.preventDefault();
          event.returnValue = 'Giao dịch chưa thành công bạn có chắc chắn rời khỏi trang này chứ?';
          fetch('http://localhost:3001/movie/updateStatusEmpty', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({
            movie: state.movie,
            position: state.position,
            position_booked: state.position_booked,
            }),
        })
            .then((res) => res.json())
            .then((data) => {
            console.log(data);
            })
            .catch((err) => {
            console.log(err);
            });
        };
    
        window.addEventListener('beforeunload', handleBeforeUnload);
    
        return () => {
          window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    const renderer = ({ hours, minutes, seconds, completed }) => {
        if (completed) {
            window.location.href = "/nocart";
            fetch("http://localhost:3001/movie/updateStatusEmpty", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    movie: state.movie,
                    position: state.position,
                    position_booked: state.position_booked
                }),
            })

                .then((res) => res.json())
                .then((data) => {
                    console.log(data);
                })
                .catch((err) => {
                    console.log(err);
                });
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
                // eslint-disable-next-line array-callback-return
                data.data.map((item) => {
                    if (parseInt(item.trans_amount) === state.price/1000 && item.description === result) {
                        clearInterval(interval);
                        alert("Thanh toán thành công");
                        fetch("http://localhost:3001/auth/saveHistory", {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify({
                                user_id: user.user.user_id,
                                showtime_id: state.movie[0].id,
                                room_id: state.position[0][0].room_id,
                                position_booked: state.position_booked
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
    }, 10000);

    return (
        <div>
            <div className="main-containers col1-layout">
                <div className="main">
                    <div className="col-main">
                        <div className="booking-progress">
                            <div className="pages-title">
                                <h1>Thanh toán qua ZaloPay </h1>
                            </div>
                            <div className="top-content">
                                <div className="countexpire">
                                    <h3>Countdown Clock</h3>
                                    <div id="countdown">
                                        <Countdown
                                            date={Date.now() + 200000}
                                            renderer={renderer}
                                        />
                                        <RxCounterClockwiseClock />
                                    </div>
                                </div>
                                <div className="payment" style={{ 'textAlign': 'center' }}>
                                    <img src="/zalopay.jpg" alt='' width='200' height='300' />
                                </div>
                                <div style={{
                                    'textAlign': 'center',
                                    'fontSize': '20px',
                                    'fontWeight': 'bold',
                                    'color': 'black',
                                    'marginTop': '20px',
                                    'textTransform': 'uppercase'
                                }}>Tổng số tiền bạn cần phải thanh toán là: {currency} VND <br /><br />
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