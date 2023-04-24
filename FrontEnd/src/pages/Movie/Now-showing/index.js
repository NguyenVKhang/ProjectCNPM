import "./style.css";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BsFillHandThumbsUpFill } from "react-icons/bs"
import { Col, Row } from "react-bootstrap";
import { useMediaQuery } from 'react-responsive';
function MovieNowShowing() {
  const isLaptop = useMediaQuery({ query: '(max-width: 960px)' });
  const isIpad = useMediaQuery({ query: '(max-width: 770px)' });

  const [showTimes, setShowTimes] = useState([]);
  const [place, setPlace] = useState(1);
  const [calendar, setCalendar] = useState(1);
  const [type, setType] = useState(1);
  const [names, setNames] = useState("");

  const navigate = useNavigate();

  //call api to get data movie
  const [movie, setMovie] = useState([]);
  useEffect(() => {
    fetch("http://localhost:3001/movie/now-showing")
      .then((res) => res.json())
      .then((data) => {
        setMovie(data.data.moviesNowShowing);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const showDetailMovie = (e) => {
    const name = e.target.title
    fetch('http://localhost:3001/movie/getdetailnow', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: name }),
    })
      .then((res) => res.json())
      .then((data) => {
        navigate(`/movie/${data.data.movie.title}`, { state: data.data.movie })
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //add event click button to show modal
  const handleShow = (e) => {
    setNames(e.target.title);
    const name = e.target.title;
    fetch('http://localhost:3001/movie/getmovie', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: name }),
    })
      .then((res) => res.json())
      .then((data) => {
        setShowTimes(data.data.date);
      });


    const modal = document.getElementById("exampleModal");
    modal.classList.add("show");
    modal.setAttribute(
      "style",
      "display: block; padding-right: 16px; background-color: rgba(0, 0, 0, 0.9);"
    );
  };

  const user = JSON.parse(localStorage.getItem("token"));


  const chooseShowTimes = (e) => {
    if (!user) {
      window.location.href = "/login";
      return;
    }

    const Day = document.querySelector('.current .day').getAttribute('title')
    const Place = document.querySelector('.toggle-tabs-city .appear .current-location span').innerHTML
    const Type = document.querySelector('.toggle-tabs-type .appear .appear .current-type span').innerHTML
    const Cinema = e.target.closest('.cinema').querySelector('span').innerHTML
    const Site = e.target.closest('.site').querySelector('span').innerHTML
    const TimeSt = e.target.title

    fetch('http://localhost:3001/movie/getposition', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: names, day: Day, location: Place, type: Type, cinema: Cinema, site: Site, time: TimeSt }),
    })
      .then((res) => res.json())
      .then((data) => {
        navigate('/ticket', { state: data.data })
      });

  }


  //add event click button to hide modal
  const handleClose = () => {
    const modal = document.getElementById("exampleModal");
    modal.classList.remove("show");
    modal.setAttribute(
      "style",
      "display: none; padding-right: 0px; background-color: rgba(0, 0, 0, 0.5);"
    );
  };

  //add event when click outside modal to hide modal
  const handleOutsideClick = (e) => {
    if (e.target.id === "exampleModal") {
      handleClose();
    }
  };





  const Day = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const minutes = ["00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20"
    , "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31", "32", "33", "34", "35", "36", "37", "38", "39", "40",
    "41", "42", "43", "44", "45", "46", "47", "48", "49", "50", "51", "52", "53", "54", "55", "56", "57", "58", "59"
  ];


  return (
    <div className="page-phim" id="now-movie">
      <div className="page-title category-title">
        <h1>Phim Đang Chiếu</h1>
      </div>
      <div className="flex-container category-products cgv-movies">
        <Row className="products-grid " md={isLaptop ? (isIpad ? 2 : 3) : 4}>
          {movie.map((item, index) => {
            return (
              <Col className="film-lists item last " key={index}>
                <div className="product-images">
                  <span className={`nmovie-rating nmovie-rating-${item.itemRate}`}></span>
                  <a
                    onClick={showDetailMovie}
                    className="product-image"
                    cursorshover="true"
                  >
                    <img
                      title={item.name}
                      src={item.image}
                      alt={item.name}
                      cursorshover="true"
                    />
                  </a>
                </div>
                <div
                  className="product-info"
                  style={{
                    minHeight: "0px",
                    maxHeight: "none",
                    height: "121px",
                  }}
                >
                  <h2 className="product-name" title={item.name} onClick={showDetailMovie}>
                    {item.name}
                  </h2>
                  <div className="cgv-movie-info">
                    <span className="cgv-info-bold">Thể loại: </span>
                    <span className="cgv-info-normal">{item.category}</span>
                  </div>
                  <div className="cgv-movie-info">
                    <span className="cgv-info-bold">Thời lượng: </span>
                    <span className="cgv-info-normal">{item.time} phút</span>
                  </div>
                  <div className="cgv-movie-info">
                    <span className="cgv-info-bold">Khởi chiếu: </span>
                    <span className="cgv-info-normal">{item.timeStart}</span>
                  </div>
                </div>
                <ul className="add-to-links">
                  <li>
                    <button
                      type="button"
                      title="Thích"
                      className="button btn-like"
                    >
                      <BsFillHandThumbsUpFill />
                      <span>like</span>
                    </button>
                  </li>

                  <li>
                    <button
                      type="button"
                      title="Mua vé"
                      className="button btn-booking"
                      data-bs-toggle="modal"
                      data-bs-target="#exampleModal"
                    >
                      <span onClick={handleShow} title={item.name}>MUA VÉ</span>
                    </button>
                    <div
                      className="modal fade "
                      onClick={handleOutsideClick}
                      id="exampleModal"
                      tabIndex="-1"
                      aria-labelledby="exampleModalLabel"
                      aria-hidden="true"
                    >
                      <div className="modal-dialog modal-xl modal-fullscreen-xl-down modal-dialog-scrollable ">
                        <div className="modal-content">
                          <div className="modal-header">
                            <ul className="toggle-tabs">
                              {showTimes.map((DATE) => {
                                const dAte = new Date(DATE.day);
                                return (
                                  <li key={DATE.id} className={`${DATE.id === calendar ? "date current" : "date"}`} onClick={() => {
                                    setCalendar(DATE.id);
                                    setPlace(1);
                                    setType(1);
                                  }}>
                                    <div className="day" title={DATE.day}>
                                      <span>{dAte.getMonth() + 1}</span>
                                      <em>{Day[dAte.getDay()]}</em>
                                      <strong>{dAte.getDate()}</strong>
                                    </div>
                                  </li>
                                )
                              })}
                            </ul>
                          </div>
                          <div className="modal-body">
                            <ul className="toggle-tabs-city">
                              {showTimes.map((Date) => (
                                <li key={Date.id} className={`${Date.id === calendar ? "appear" : "hide"}`}>
                                  <ul>
                                    {Date.Location.map((Location) => (
                                      <li key={Location.id} className={`${Location.id === place ? "location current-location" : "location"}`} onClick={() => {
                                        setPlace(Location.id);
                                        setType(1);
                                      }}>
                                        <span>{Location.place}</span>
                                      </li>
                                    ))}
                                  </ul>
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div className="modal-body type-watch">
                            <ul className="toggle-tabs-type">
                              {showTimes.map((Date) => (
                                <li key={Date.id} className={`${Date.id === calendar ? "appear" : "hide"}`}>
                                  <ul>
                                    {Date.Location.map((Location) => (
                                      <li key={Location.id} className={`${Location.id === place ? "appear" : "hide"}`}>
                                        <ul>
                                          {Location.Movie_Type.map((Movie_Type) => (
                                            <li key={Movie_Type.id} className={`${Movie_Type.id === type ? "type current-type" : "type"}`} onClick={() => setType(Movie_Type.id)}>
                                              <span>{Movie_Type.type_name}</span>
                                            </li>
                                          ))}
                                        </ul>
                                      </li>
                                    ))}
                                  </ul>
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div className="modal-footer">
                            <ul>
                              {showTimes.map((DATE) => (
                                <li key={DATE.id} className={`${DATE.id === calendar ? "appear" : "hide"}`}>
                                  <ul>
                                    {DATE.Location.map((Location) => (
                                      <li key={Location.id} className={`${Location.id === place ? "appear" : "hide"}`}>
                                        <ul>
                                          {Location.Movie_Type.map((Movie_Type) => (
                                            <li key={Movie_Type.id} className={`${Movie_Type.id === type ? "appear" : "hide"}`}>
                                              <ul>
                                                {Movie_Type.Cinema.map((Cinema) => (
                                                  <li style={{
                                                    'textAlign': 'left'
                                                  }} key={Cinema.id} className="cinema">
                                                    <span>{Cinema.cinema_name}</span>
                                                    <ul>
                                                      {Cinema.Site.map((Site) => (
                                                        <li style={{
                                                          'textAlign': 'left'
                                                        }} key={Site.id} className="site">
                                                          <span>{Site.site_name}</span>
                                                          <ul>
                                                            {Site.Time.map((Time) => {
                                                              const hour = new Date(Time.timeSt);
                                                              return (
                                                                <li style={{
                                                                  'border': '1px solid #cbcabe',
                                                                  'color': '#222',
                                                                  'textAlign': 'center',
                                                                  'float': 'left',
                                                                  'padding': '5px 20px',
                                                                  'margin': '2px',
                                                                  'display': 'block',
                                                                }} key={Time.id} className="time">
                                                                  <span title={Time.timeSt} onClick={chooseShowTimes}>{hour.getHours()}:{minutes[hour.getMinutes()]}</span>
                                                                </li>
                                                              )
                                                            })}
                                                          </ul>
                                                        </li>
                                                      ))}
                                                    </ul>
                                                  </li>
                                                ))}
                                              </ul>
                                            </li>
                                          ))}
                                        </ul>
                                      </li>
                                    ))}
                                  </ul>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                </ul>
              </Col>
            );
          })}
        </Row>
      </div>
    </div >
  );
}

export default MovieNowShowing;



