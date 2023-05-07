import { useNavigate, useLocation } from "react-router-dom"
import Countdown from "react-countdown-now";
import "./style.css";
import React, { useEffect } from 'react';


function AuthPayment() {
    const navigate = useNavigate();
    const { state } = useLocation();
    const currency = new Intl.NumberFormat('vi-VN', {style: 'currency', currency: 'VND'}).format(state.price);
    useEffect(() => {
        const handleBeforeUnload = (event) => {
          event.preventDefault();
          event.returnValue = '';
          fetch('http://localhost:3001/movie/updateStatusEmpty', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              movie: state.movie,
              position: state.position,
              position_booked: state.position_booked
            })
          });
        };
        window.addEventListener('beforeunload', handleBeforeUnload);
        return () => {
          window.removeEventListener('beforeunload', handleBeforeUnload);
        };
      }, []);

      

    const back = () => {
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

        window.history.back()
    }


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

    const payment = () => {

        const method = document.querySelector('input[name="payment"]:checked')

        if (method === null) {
            alert("Vui lòng chọn hình thức thanh toán");
        }
        else if (method.value === 'ZaloPay') {
            navigate("/payment/ZaloPay", { state })
        }
        else {
            alert("Chức năng đang được bảo trì")
        }

    }



    return (
        <>
            <div className="main-containers col1-layout">
                <div className="main">
                    <div className="col-main">
                        <div className="booking-progress">
                            <div className="pages-title">
                                <h1>Thanh toán</h1>
                            </div>
                            <div className="top-content">
                                <div className="product-secondary">
                                    <div className="countexpire">
                                        <h3>Countdown Clock:</h3>
                                        <div id="countdown">
                                            <Countdown
                                                date={Date.now() + 500000}
                                                renderer={renderer}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="type-payment">
                                    <h3>HÌNH THỨC THANH TOÁN</h3>
                                    <ul>
                                        <li className="type-payment-cgv">
                                            <input type="radio" name="payment" id="payment1" value="ATM card"></input>
                                            <label htmlFor="payment1">ATM card(Thẻ nội địa)</label>
                                        </li>
                                        <li className="type-payment-cgv">
                                            <input type="radio" name="payment" id="payment2" value="Internation card"></input>
                                            <label htmlFor="payment2">Thẻ quốc tế (Visa, Master, Amex, JCB)</label>
                                        </li>
                                        <li className="type-payment-cgv">
                                            <input type="radio" name="payment" id="payment3" value="ZaloPay"></input>
                                            <label htmlFor="payment3">ZaloPay</label>
                                        </li>
                                    </ul>

                                </div>
                            </div>
                            <div className="bottom-content">
                                <div className="format-bg-top"></div>
                                <a className="btn-left" title="Previous" onClick={back}></a>
                                <div className="minicart-wrapper">
                                    <ul>
                                        <li className="item first">
                                            <div className="product-details">
                                                <table className="info-wrapper">
                                                    <colgroup>
                                                        <col style={{ "width": "40%" }}></col>
                                                    </colgroup>
                                                    <tbody>
                                                        <tr>
                                                            <td>
                                                                <img alt="Ảnh bìa" src={state.movie[0].poster} />
                                                            </td>
                                                            <td>
                                                                <table className="info-wrapper">
                                                                    <tbody>
                                                                        <tr>
                                                                            <td className="label">{state.movie[0].film_name}</td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td className="label">2D</td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td className="label">C18</td>
                                                                        </tr>
                                                                    </tbody>
                                                                </table>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </li>
                                        <li className="item">
                                            <div className="product-details">
                                                <table className="info-wrapper">
                                                    <tbody>
                                                        <tr>
                                                            <td className="label">Rạp:</td>
                                                            <td>{state.movie[0].cinema_name}</td>
                                                        </tr>
                                                        <tr>
                                                            <td className="label">Suất chiếu:</td>
                                                            <td>{state.showtime_start.toLocaleTimeString("en-GB", {
                                                                hour: "2-digit",
                                                                minute: "2-digit",
                                                            })}, {state.showtime_start.toLocaleDateString("en-GB")}

                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td className="label">Phòng chiếu:</td>
                                                            <td>{state.movie[0].name_room}</td>
                                                        </tr>
                                                        <tr className="block-seats" style={{ "display": "table-row" }}>
                                                            <td className="label">Ghế</td>
                                                            <td className="data">
                                                                <span style={{
                                                                    "clear": "both",
                                                                    "float": "left",
                                                                }}>{state.type_chair}</span>
                                                                <span style={{
                                                                    "clear": "both",
                                                                    "float": "left",
                                                                }} >{state.name_chair}</span>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </li>
                                        <li className="item">
                                            <div className="product-details">
                                                <table className="info-wrapper">
                                                    <thead>
                                                        <tr className="block-box">
                                                            <td className="label">Giá phim:</td>
                                                            <td className="price" id="total1">{currency}</td>
                                                            <td className="data">
                                                                <div className="truncated">
                                                                    <div className="truncated_full_value">
                                                                        <dl className="item-options">
                                                                            <dt>Thường:</dt>
                                                                            <dd>2</dd>
                                                                        </dl>
                                                                    </div>
                                                                    <a className="details">I</a>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr className="block-con">
                                                            <td className="label">
                                                                Combo
                                                            </td>
                                                            <td className="price"></td>
                                                            <td className="data">
                                                                <div className="truncated">
                                                                    <div className="truncated_full_value"></div>
                                                                    <a className="details">I</a>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                    <tfoot className="block-price">
                                                        <tr>
                                                            <td className="label">Tổng:</td>
                                                            <td className="price" id="total">{currency}</td>
                                                        </tr>
                                                    </tfoot>
                                                </table>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                                <a className="btn-rights box" title="Next" onClick={payment}></a>
                                <div className="format-bg-bottom"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AuthPayment;