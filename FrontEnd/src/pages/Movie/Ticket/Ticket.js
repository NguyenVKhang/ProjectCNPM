import { useLocation, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import "./Ticket.css";


function Ticket() {
  
    const  {state}  = useLocation();
    console.log(state, 12345);
    const [isLoaded, setIsLoaded] = useState(false);
    const [movie, setMovie] = useState({});
    const navigate = useNavigate();
    const [showtime_start, setShowtime_start] = useState(new Date());
    const [showtime_end, setShowtime_end] = useState(new Date());
    const [sum_chair_available, setSum_chair_available]  = useState(0);
    const [sum_chair, setSum_chair] = useState(1);

    useEffect(() => {
        fetch('http://localhost:3001/movie/getposition', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id: state }),
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data, 1234);
                setMovie(data.data);
                setIsLoaded(true);
            });

    }, [state]);
    
    useEffect(() => {
        if (isLoaded) {
          const Position = movie.position;
          let sum_chair = 0;
          Position.forEach(element => {
            element.forEach(element1 => {
              if (element1.seat_type !== 'SPACE') {
                sum_chair++;
              }
            });
          });
          setSum_chair(sum_chair);
          let sum_chair_disable = 0;
          Position.forEach(element => {
            element.forEach(element => {
              if (element.status === "disable") {
                sum_chair_disable++;
              }
            });
          });
      
          const [hour, minute, second] = movie.movie[0].film_length.split(":");
          setShowtime_start(new Date(movie.movie[0].time));
          setShowtime_end(new Date(showtime_start.getTime() + hour * 3600000 + minute * 60000 + second * 1000));
      
          setSum_chair_available(sum_chair - sum_chair_disable);
        }
      // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [isLoaded, movie]); // Updated dependencies
    
    
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
        const currency = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(total);
        document.getElementById("total1").innerHTML = `${currency}`;
        document.getElementById("total").innerHTML = `${currency}`;
        const positions = document.querySelectorAll(".checked");
        // console.log(positions);
        let position = [];
        for (let i = 0; i < positions.length; i++) {
            position.push(positions[i].innerHTML);
        }
        // console.log(position);


    }
    const Back = () => {
        window.history.back();
    }

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

        const seats = document.getElementsByClassName("checked");

        let total = 0;
        for (let i = 0; i < seats.length; i++) {
            total += parseInt(seats[i].getAttribute("price"));
        }

         fetch('http://localhost:3001/movie/updateStatus', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify({
        movie: movie.movie,
        position: movie.position,
        position_booked: position
        }),
    })
        .then((res) => res.json())
        .then((data) => {
        console.log(data.type);
        if (data.type === 1) {
            navigate("/payment", {
            state: {
                movie: movie.movie,
                position: movie.position,
                position_booked: position,
                price: total,
                type_chair: document.getElementById("Type_Chair").innerHTML,
                name_chair: document.getElementById("Name_Chair").innerHTML,
                showtime_start
            },
            });
        } else {
            alert("Đã có người đặt trước vui lòng chọn lại ghế");
            fetch('http://localhost:3001/movie/getposition', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id: movie.movie[0].id }),
            })
            .then((res) => res.json())
            .then((data) => {
                setMovie(data.data);
            });
        }
        });
    }




    if(isLoaded) {
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
                                                        {movie.movie[0].cinema_name} | {movie.movie[0].name_room} | Số ghế (<em>{sum_chair_available}</em>/{sum_chair})
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
                                            {movie.position.map((item1, index1) => (
                                                <div className="rows" key={index1}>
                                                    {item1.map((item, index) => (
                                                        <>
                                                            {item.seat_type !== "SPACE" ? <div className={`${item.status === "disable" ? "seat seat-disable disable" : `seat seat-${item.seat_type} active`}`} key={index} type={item.seat_type} price={item.seat_fare} onClick={check}>
                                                                {item.seat_name}
                                                            </div>
                                                                :
                                                                <div className={`${item.status = `seat seat-${item.seat_type} `}`}>
                                                                </div>
                                                            }
    
                                                        </>
    
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
                                                {movie.type_chair.map((item, index) => {
                                                    return (
                                                        <>
                                                            {item.type_chair !== "SPACE" ? <div className={`icon zone-${item.type_chair}`} key={index}>{item.type_chair}</div> : <></>}
                                                        </>
                                                    )
                                                })}
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                            </div>
    
                            <div className="bottom-content">
                                <div className="format-bg-top"></div>
                                <p className="btn-left" title="Previous"  onClick={Back}></p>
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
                                                                <img src={movie.movie[0].poster} alt='' />
                                                            </td>
                                                            <td>
                                                                <table className="info-wrapper">
                                                                    <tbody>
                                                                        <tr>
                                                                            <td className="label">{movie.movie[0].film_name}</td>
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
                                                            <td>{movie.movie[0].cinema_name}</td>
                                                        </tr>
                                                        <tr>
                                                            <td className="label">Suất chiếu:</td>
                                                            <td>{showtime_start.toLocaleTimeString("en-GB", {
                                                                hour: "2-digit",
                                                                minute: "2-digit"
                                                            })}, {showtime_start.toLocaleDateString("en-GB")}</td>
                                                        </tr>
                                                        <tr>
                                                            <td className="label">Phòng chiếu: </td>
                                                            <td>{movie.movie[0].name_room}</td>
                                                        </tr>
                                                        <tr className="block-seats" style={{ "display": "table-row" }}>
                                                            <td className="label">Ghế:</td>
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
                                                            <td className="label">Tiền phim:</td>
                                                            <td className="price" id="total1">0,00 đ</td>
                                                            <td className="data">
                                                                <div className="truncated">
                                                                    <div className="truncated_full_value">
                                                                        <dl className="item-options">
                                                                            <dt>Thường</dt>
                                                                            <dd>2</dd>
                                                                        </dl>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr className="block-con">
                                                            <td className="label">
                                                                Combo:
                                                            </td>
                                                            <td className="price"></td>
                                                            <td className="data">
                                                                <div className="truncated">
                                                                    <div className="truncated_full_value"></div>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                    <tfoot className="block-price">
                                                        <tr>
                                                            <td className="label">Tổng:</td>
                                                            <td className="price" id="total">0,00 đ</td>
                                                        </tr>
                                                    </tfoot>
                                                </table>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                                <p className="btn-right box" title="Next" onClick={Next}></p>
                                <div className="format-bg-bottom"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        )
    } else {
        return <div>Loading...</div>;
    }
}

export default Ticket;
