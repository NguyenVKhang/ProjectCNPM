import { useLocation, useNavigate } from "react-router-dom";
import "./style.css";


function Ticket() {
    const { state } = useLocation();
    console.log(state);

    const Position = state.position
    let sum_chair = 0;
    Position.forEach(element => {
        element.forEach(element => {
            sum_chair++;
        });
    });

    let sum_chair_disable = 0;
    Position.forEach(element => {
        element.forEach(element => {
            if (element.status === "disable") {
                sum_chair_disable++;
            }
        });
    });


    let sum_chair_available = sum_chair - sum_chair_disable;


    const check = (e) => {
        //set not allow click on seat-disable
        if (e.target.classList.contains("seat-disable")) {
            return;
        }

        if (e.target.classList.contains("seat-unavailable")) {
            return;
        }

        e.target.classList.toggle("checked");

        //If you choose a different type of seat, please notify to select the same type of seat
        const type = e.target.getAttribute("type");
        const types = document.getElementsByClassName("checked");
        for (let i = 0; i < types.length; i++) {
            if (types[i].getAttribute("type") !== type) {
                alert("Vui lòng chọn tất cả ghế cùng loại");
                e.target.classList.remove("checked");
                return;
            }
        }

        //can choose up to 8 seats
        const seats = document.getElementsByClassName("checked");
        if (seats.length > 8) {
            alert("Bạn có thể chọn tối đa 8 ghế");
            e.target.classList.remove("checked");
            return;
        }


        let name = "";
        for (let i = 0; i < seats.length; i++) {
            if (i === seats.length - 1) {
                name += seats[i].innerHTML;
            } else {
                name += seats[i].innerHTML + ", ";
            }
        }

        document.getElementById("Name_Chair").innerHTML = name;

        //set id Type_Chair = type of seat and remove when uncheck seat
        if (document.getElementsByClassName("checked").length !== 0) {
            document.getElementById("Type_Chair").innerHTML = type;
        } else {
            document.getElementById("Type_Chair").innerHTML = "";
        }


        let total = 0;
        for (let i = 0; i < seats.length; i++) {
            total += parseInt(seats[i].getAttribute("price"));
        }
        //show the total price
        document.getElementById("total1").innerHTML = `${total} đ`;
        document.getElementById("total").innerHTML = `${total} đ`
    }

    const navigate = useNavigate();
    const Next = () => {
        //if no choose seat, alert error
        if (document.getElementsByClassName("checked").length === 0) {
            alert("Please choose your seats first.");
            return;
        }


        const positions = document.querySelectorAll(".checked");
        let position = [];
        for (let i = 0; i < positions.length; i++) {
            position.push(positions[i].innerHTML);
        }



        // update Temporarily status
        fetch("http://localhost:3001/movie/updateStatus", {
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
                position: position,
            }),
        })
            .then((res) => res.json())
            .then((data) => {
            })
            .catch((err) => {
                console.log(err);
            });

        navigate("/payment", {
            state: {
                name: state.name,
                day: state.day,
                location: state.location,
                type: state.type,
                cinema: state.cinema,
                site: state.site,
                position: position,
                time: state.time,
                total_showtime: state.total_showtime,
                price: document.getElementById("total").innerHTML.split(" ")[0],
                type_chair: document.getElementById("Type_Chair").innerHTML,
                name_chair: document.getElementById("Name_Chair").innerHTML,
            },
        });
    }



    const showtime_start = new Date(state.time);
    const showtime_end = new Date(showtime_start.getTime() + state.total_showtime * 60000);





    return (
        <div className="main-containers col1-layout">
            <div className="main">
                <div className="col-main">
                    <div className="booking-progress">
                        <div className="pages-title">
                            <h1>Booking online</h1>
                        </div>
                        <div className="top-content">
                            <ol className="products-list" id="products-list">
                                <li className="item">
                                    <div className="product-shop">
                                        <div className="f-fix">
                                            <div className="product-primary">
                                                <p>
                                                    {state.cinema} | {state.site} | Cinema 7 | So ghe (<em>{sum_chair_available}</em>/{sum_chair})
                                                </p>
                                                <p>
                                                    {showtime_start.toLocaleDateString("en-GB")} {showtime_start.toLocaleTimeString("en-GB", {
                                                        hour: "2-digit",
                                                        minute: "2-digit",
                                                    })} ~ {showtime_end.toLocaleDateString("en-GB")} {showtime_end.toLocaleTimeString("en-GB", {
                                                        hour: "2-digit",
                                                        minute: "2-digit",
                                                    })}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            </ol>
                        </div>
                        <div className="main-content">
                            <ul className="progress" style={{
                                "position": "relative",
                                "height": "565px",
                            }}>
                                <li className="booking-step cycle-slide cycle-slide-active"
                                    style={{
                                        "position": "absolute",
                                        "top": "0px",
                                        "left": "0px",
                                        "zIndex": "99",
                                        "opacity": "1",
                                        "visibility": "visible",
                                        "display": "block",
                                    }}
                                >
                                    <label className="h1">Người / Ghế</label>
                                    <div className="ticketbox">
                                        <div className="screen">
                                        </div>
                                        {state.position.map((item1, index1) => (
                                            <div className="rows" key={index1}>
                                                {item1.map((item, index) => (
                                                    <div className={`${item.status === "disable" ? "seat seat-disable disable" : `seat seat-${item.status} active`}`} key={index} type={item.status} price={item.price} onClick={check}>
                                                        {item.position}
                                                    </div>
                                                ))}
                                            </div>
                                        ))}

                                    </div>
                                    <div className="ticketbox-notice">
                                        <div className="iconlist">
                                            <div className="icon Checked">Checked</div>
                                            <div className="icon Occupied">Đã chọn</div>
                                            <div className="icon Unavailabel">Không thể chọn</div>
                                        </div>
                                        <div className="iconlist">
                                            {state.type_chair.map((item, index) => {
                                                return (
                                                    <div className={`icon zone-${item.type_chair_name}`} key={index}>{item.name_chair}</div>
                                                )
                                            })}
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>

                        <div className="bottom-content">
                            <div className="format-bg-top"></div>
                            <a href="/" className="btn-left" title="Previous">{null}</a>
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
                                                            <img src={state.image} alt='' />
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
                                                            minute: "2-digit"
                                                        })}, {showtime_start.toLocaleDateString("en-GB")}</td>
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
                                                            }} id="Type_Chair"></span>
                                                            <span style={{
                                                                "clear": "both",
                                                                "float": "left",
                                                            }} id="Name_Chair"></span>
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
                                                        <td className="price" id="total1">0,00 đ</td>
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
                                                        <td className="price" id="total">0,00 đ</td>
                                                    </tr>
                                                </tfoot>
                                            </table>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                            <a className="btn-right box" title="Next" onClick={Next}></a>
                            <div className="format-bg-bottom"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )

}

export default Ticket;



{/* <div className="seat seat-gold active">A15</div> */ }
{/* <div className="seat seat-vipprime active">A15</div> */ }
{/* <div className="seat seat-4d active">A15</div> */ }
{/* <div className="seat seat-sw active">A10</div> */ }
