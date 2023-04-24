import { useState, useEffect } from "react"
function History() {

    const [data, setData] = useState([]);
    const user = JSON.parse(localStorage.getItem("token"));
    useEffect(() => {
        fetch("http://localhost:3001/auth/history", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: user.user.email,
            }),
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                setData(data.data.history);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    return (
        <div className="format-profile-cgv">
            <div className="title-page">
                <h1>LỊCH SỬ GIAO DỊCH</h1>
            </div>
            <div className="content-page">
                <ul>
                    {data.map((item, index) => {
                        const order_date = new Date(item.order_date);
                        const show_date = new Date(item.day)
                        const showtimes = new Date(item.time)
                        return (
                            <li key={index}>
                                <div className="content-page__item">
                                    <div className="content-page__item__title">
                                        <h3>Đơn hàng #{item.code}</h3>
                                        <p>Ngày đặt hàng: {order_date.toLocaleString("en-GB")}</p>
                                    </div>
                                    <div className="content-page__item__content">
                                        <div className="content-page__item__content__item">
                                            <div className="content-page__item__content__item__info">
                                                <p className="content-page__item__content__item__info__name">Tên phim: {item.name}</p>
                                                <p className="content-page__item__content__item__info__time">Thời lượng: {item.total_showtime} phút</p>
                                                <p className="content-page__item__content__item__info__date">Ngày chiếu: {show_date.toLocaleDateString("en-GB")}</p>
                                                <p className="content-page__item__content__item__info__time">Suất chiếu: {showtimes.toLocaleTimeString("en-US")}</p>
                                                <p className="content-page__item__content__item__info__room">Phòng chiếu: {item.cinema}</p>
                                                <p className="content-page__item__content__item__info__seat">Ghế:  {item.position.map((Position) => `${Position} `)}</p>
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
    )
}

export default History