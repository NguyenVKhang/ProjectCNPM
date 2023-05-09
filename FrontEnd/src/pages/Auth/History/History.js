import { useState, useEffect } from "react"
import './style.css';
function History() {

    const [data, setData] = useState([]);
    const user = JSON.parse(localStorage.getItem("token"));
    useEffect(() => {
        if (!user) return;
        fetch("http://localhost:3001/auth/history", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                user_id: user.user.user_id,
            }),
        })
            .then((res) => res.json())
            .then((data) => {
                setData(data.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    return (
        <>
            <div className="format-profile-cgv">
                <div className="title-page">
                    <h1>LỊCH SỬ GIAO DỊCH</h1>
                </div>
                <div className="content-page">
                    <ul>
                        {data && data.length > 0 && data.map((item, index) => {
                            const order_date = new Date(item.order_date);
                            const show_date = new Date(item.time);
                            const showtimes = new Date(item.time);
                            const now = new Date();
                            const end_time = new Date(item.time);
                            const diff = end_time - now;
                            const time_used = diff > 0 ? `Còn sử dụng` : "Đã hết hạn";
                            const bg_class = diff > 0 ? "green" : "red";
                            
                            console.log(order_date, show_date, showtimes);  
                            return (
                                <li key={index}>
                                    <div className={`content-page__item ${bg_class}`}>
                                        <div className="content-page__item__title">
                                            <h3>Đơn hàng #{item.ticket_id}</h3>
                                            <p>Ngày đặt hàng: {order_date.toLocaleString("en-GB")}</p>
                                        </div>
                                        <div className="content-page__item__content">
                                            <div className="content-page__item__content__item">
                                                <div className="content-page__item__content__item__info">
                                                    <p className="content-page__item__content__item__info__name">Tên phim: {item.film_name}</p>
                                                    <p className="content-page__item__content__item__info__time">Thời lượng: {item.film_length} phút</p>
                                                    <p className="content-page__item__content__item__info__date">Ngày chiếu: {show_date.toLocaleDateString("en-GB")}</p>
                                                    <p className="content-page__item__content__item__info__time">Suất chiếu: {showtimes.toLocaleTimeString("en-US")}</p>
                                                    <p className="content-page__item__content__item__info__room">Phòng chiếu: {item.cinema_name}</p>
                                                    <p className="content-page__item__content__item__info__seat">Ghế: {item.seat_name}</p>
                                                    <p className={`content-page__item__content__item__info__time-used ${bg_class}`}>{time_used}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            )
                        })}
                    </ul>

                </div>
            </div>
        </>
    )
}

export default History;