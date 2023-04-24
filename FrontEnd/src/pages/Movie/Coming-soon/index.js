import "./style.css";
import React from "react";
import { BsFillHandThumbsUpFill } from "react-icons/bs"
import { useNavigate } from "react-router-dom";
import { Col, Row } from "react-bootstrap";
import { useMediaQuery } from 'react-responsive';
function MovieComingSoon() {
  const isLaptop = useMediaQuery({ query: '(max-width: 960px)' });
  const isIpad = useMediaQuery({ query: '(max-width: 770px)' });



  //fetch api to get data
  const [movie, setMovie] = React.useState([]);
  React.useEffect(() => {
    fetch("http://localhost:3001/movie/coming-soon")
      .then((res) => res.json())
      .then((data) => {
        setMovie(data.data.moviesComingSoon);
      })
      .catch((err) => {
        console.log("error");
      });
  }, []);


  const navigate = useNavigate();
  const showDetailMovie = (e) => {
    const name = e.target.title;
    fetch('http://localhost:3001/movie/getdatailcoming', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name: name })
    })
      .then(res => res.json())
      .then(data => {
        navigate(`/movie/${data.data.movie.title}`, { state: data.data.movie })
      }
      )
      .catch(err => console.log(err))
  };



  return (
    <div className="page-phim" id="soon-movie">
      <div className="page-title category-title">
        <h1>Phim Sắp Chiếu</h1>
      </div>
      <div className="flex-container category-products cgv-movies">
        <Row className=" products-grid " md={isLaptop ? (isIpad ? 2 : 3) : 4}>
          {movie.map((item, index) => {
            return (
              <Col className="film-lists item last " key={index}>
                <div className="product-images">
                  <a
                    onClick={showDetailMovie}
                    title={item.name}
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
                    <span className="cgv-info-bold">Khởi chiếu:</span>
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
                </ul>
              </Col>
            );
          })}
        </Row>
      </div>
    </div >
  );
}

export default MovieComingSoon;
