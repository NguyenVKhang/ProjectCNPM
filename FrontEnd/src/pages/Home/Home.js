/* eslint-disable jsx-a11y/anchor-is-valid */
import { Swiper, SwiperSlide } from "swiper/react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useMediaQuery } from 'react-responsive';
import "./home.css";


import { Autoplay, Navigation, Pagination } from "swiper";

export default function Home() {
  const isScreen = useMediaQuery({ query: '(max-width: 770px)' });
  const isPhone = useMediaQuery({ query: '(max-width: 600px)' });
  const [movie, setMovie] = useState([]);
  
  const [movieBackDrop, setMovieBackDrop] = useState([]);
  
  const navigate = useNavigate();
  const showDetailMovie = (e, film_id) => {
    const id = film_id;
    fetch('http://localhost:3001/movie/getdetailnow', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: id }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data.data)
        navigate(`/movie/${data.data.movie[0].name}`, { state: data.data.movie[0] })
      })
      .catch((err) => {
        console.log(err);
      });
  };




  

  useEffect(() => {
    fetch("http://localhost:3001/movie/now-showing")
      .then((res) => res.json())
      .then((data) => {
        setMovie(data.data.moviesNowShowing);
        
        setMovieBackDrop(data.data.moviesNowShowing.slice(0, 4));
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div className="main-container">
      <div className="main">
      
        <div className="slideshow-container">
          <Swiper

            slidesPerView={1}
            spaceBetween={30}
            loop={true}
            autoplay={{
              delay: 4000,
              disableOnInteraction: false,
            }}
            pagination={{
              clickable: true,
            }}
            navigation={true}
            modules={[Autoplay, Pagination, Navigation]}
            className="mySwiper"

          >


          
            {movieBackDrop.map((Movie, index) => {
              return (
                <SwiperSlide 
                key={index} className="swiper-slide" onClick={(e) => showDetailMovie(e, Movie.film_id)}
                style={{height: "500px" }}
                >

                    <img
                      src={Movie.backdrop_path}
                      alt=""
                    />
                  
                </SwiperSlide>
              );
            })
          }


          </Swiper>
        </div>
        <div className="home-movie-selection">
          <div className="home-title">
            <h2>movie selection</h2>
          </div>
          <Swiper
            slidesPerView={isScreen ? (isPhone ? 2 : 3) : 4}
            spaceBetween={15}
            slidesPerGroup={1}
            loop={true}
            loopFillGroupWithBlank={true}
            navigation={true}
            modules={[Pagination, Navigation]}
            className="mySwiper"
            id="slider2"
          >
            
            {movie.map((Movie, index) => {
              return (
                <SwiperSlide 
                  key={index} 
                  title={Movie.name}
                  className="swiper-slide-with-overlay"
                >
                  <img
                    src={Movie.poster}
                    alt=""
                  />
                  <div className="feature_film_content">
                    <h3>{Movie.name}</h3>
                    <a title="Xem chi tiết" className="button_" onClick={(e) => showDetailMovie(e, Movie.film_id)}>
                      Xem chi tiết
                    </a>
                    <button type="button" title="Mua vé" className="button_ btn-booking_" onClick={(e) => showDetailMovie(e, Movie.film_id)}>
                      <span>
                        <span>Mua vé</span>
                      </span>
                    </button>
                  </div>


                       
                </SwiperSlide>
              )
            })}
            
          </Swiper>
        </div>

      </div>

    </div>
  );
}

