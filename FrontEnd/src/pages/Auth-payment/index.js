import { useNavigate, useLocation } from "react-router-dom"
import Countdown from "react-countdown-now";
import "./style.css";
function AuthPayment() {
    const { state } = useLocation()

    const navigate = useNavigate()
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

        window.history.back()
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

    const payment = () => {

        const method = document.querySelector('input[name="payment"]:checked')

        if (method === null) {
            alert("Vui lòng chọn hình thức thanh toán");
        }
        else if (method.value === 'MoMo') {
            navigate("/payment/momo", { state })
        }
        else {
            alert("Chức năng đang được bảo trì")
        }

    }


    const showtime_start = new Date(state.time);




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
                                        <h3>Countdown Clock</h3>
                                        <div id="countdown">
                                            <Countdown
                                                date={Date.now() + 500000}
                                                renderer={renderer}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="voucher-payment">
                                    <h3>Bước 1: GIẢM GIÁ</h3>
                                    <h6>Mã khuyến mãi</h6>
                                    <span>Nhập mã khuyến mãi</span>
                                    <input type="text"></input>
                                    <button className="use">Sử dụng</button>
                                </div>
                                <div className="type-payment">
                                    <h3>Bước 2: HÌNH THỨC THANH TOÁN</h3>
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
                                            <input type="radio" name="payment" id="payment3" value="MoMo"></input>
                                            <label htmlFor="payment3">Ví MoMo</label>
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
                                                                <img src="https://www.cgv.vn/media/catalog/product/cache/1/thumbnail/dc33889b0f8b5da88052ef70de32f1cb/n/b/nbn_main-poster_2_1_.jpg" />
                                                            </td>
                                                            <td>
                                                                <table className="info-wrapper">
                                                                    <tbody>
                                                                        <tr>
                                                                            <td className="label">{state.name}</td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td className="label">{state.site}</td>
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
                                                            <td className="label">Rạp</td>
                                                            <td>{state.cinema}</td>
                                                        </tr>
                                                        <tr>
                                                            <td className="label">Suất chiếu</td>
                                                            <td>{showtime_start.toLocaleTimeString("en-GB", {
                                                                hour: "2-digit",
                                                                minute: "2-digit",
                                                            })}, {showtime_start.toLocaleDateString("en-GB")}

                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td className="label">Phòng chiếu</td>
                                                            <td>Cinema 2</td>
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
                                                            <td className="label">Tên phim</td>
                                                            <td className="price" id="total1">{state.price} đ</td>
                                                            <td className="data">
                                                                <div className="truncated">
                                                                    <div className="truncated_full_value">
                                                                        <dl className="item-options">
                                                                            <dt>Thường</dt>
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
                                                            <td className="label">Tổng</td>
                                                            <td className="price" id="total">{state.price} đ</td>
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