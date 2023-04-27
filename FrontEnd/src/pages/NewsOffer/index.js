import { Swiper, SwiperSlide } from "swiper/react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useMediaQuery } from 'react-responsive';
import "./style.css";


// import required modules
import { Autoplay, Navigation, Pagination } from "swiper";

export default function NewsOffer() {
  const isScreen = useMediaQuery({ query: '(max-width: 770px)' });
  const isPhone = useMediaQuery({ query: '(max-width: 600px)' });
  const [movie, setMovie] = useState([]);

  const navigate = useNavigate();
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
  return (
    <div className="main-container">
      <div className="main">
        {/* <div className="sect-person">
          <ul>
            <li>
              <a
                className="threater"
                href="/cinema"
              >
                cgv threater
              </a>
            </li>
            <li>
              <a
                className="now-sh"
                href="/movies/now-showing"
              >
                now showing
              </a>
            </li>
            <li>
              <a
                className="special"
                href="/"
              >
                cgv special
              </a>
            </li>
            <li>
              <a
                className="event"
                href="/"
              >
                mua voucher, thẻ quà tặng CGV
              </a>
            </li>
            <li>
              <a
                className="ticket requied-login"
                href="/"
              >
                my ticket infor
              </a>
            </li>
            <li>
              <a className="dc" href="/">
                discount infor
              </a>
            </li>
            <li>
              <a
                className="login-header"
                href="/register"
              >
                create account quick
              </a>
            </li>
          </ul>
        </div>
        <div className="slideshow-container">
          <Swiper

            slidesPerView={1}
            spaceBetween={30}
            loop={true}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            pagination={{
              clickable: true,
            }}
            navigation={true}
            modules={[Autoplay, Pagination, Navigation]}
            className="mySwiper"
          >
            <SwiperSlide className="swiper-slide">
              <a href="https://www.cgv.vn/default/newsoffer/cgv-cnp-promo/">
                <img
                  src="https://www.cgv.vn/media/banner/cache/1/b58515f018eb873dafa430b6f9ae0c1e/c/n/cnp_banner_adapt_980x448-01_1_.jpg"
                  alt=""
                />
              </a>
            </SwiperSlide>
            <SwiperSlide className="swiper-slide">
              <a href="https://www.cgv.vn/default/nct-dream.html">
                <img
                  src="https://www.cgv.vn/media/banner/cache/1/b58515f018eb873dafa430b6f9ae0c1e/z/4/z4105039481752_70674110ac9e8cff8156032e00cd88b2.jpg"
                  alt=""
                />
              </a>
            </SwiperSlide>
            <SwiperSlide className="swiper-slide">
              <a href="https://www.cgv.vn/default/newsoffer/late-shift/">
                <img
                  src="https://www.cgv.vn/media/banner/cache/1/b58515f018eb873dafa430b6f9ae0c1e/r/s/rsz_tcb-inspire-bakv-980x448.jpg"
                  alt=""
                />
              </a>
            </SwiperSlide>
            <SwiperSlide className="swiper-slide">
              <a href="">
                <img
                  src="https://www.cgv.vn/media/banner/cache/1/b58515f018eb873dafa430b6f9ae0c1e/9/8/980x448_78.png"
                  alt=""
                />
              </a>
            </SwiperSlide>

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
                <SwiperSlide key={index} onClick={showDetailMovie} title={Movie.name}>
                  <img
                    src={Movie.image}
                    alt=""
                  />
                </SwiperSlide>
              )
            })}
          </Swiper>
        </div> */}
        <div className="product-collateral toggle-content tabs home-event">
          <div className="home-title">
            <h2>Tin mới và ưu đãi</h2>

          </div>
          <div className="tabs">
            {/* <Tabs
              defaultActiveKey="profile"
              variant="pills"
              id="uncontrolled-tab-example"
              className="mb-3 tabss"
            > */}
              {/* <Tab eventKey="profile" title="Tin Mới & Ưu Đãi"> */}
                <Swiper
                  // slidesPerView={4}
                  slidesPerView={isScreen ? (isPhone ? 2 : 3) : 4}
                  spaceBetween={5}
                  slidesPerGroup={1}
                  loop={true}
                  loopFillGroupWithBlank={true}
                  navigation={true}
                  modules={[Pagination, Navigation]}
                  className="mySwiper"
                >
                  <SwiperSlide>
                    <a href="https://www.cgv.vn/default/newsoffer/cgv-momo-promo-t10/">
                      <img src="https://ocwckgy6c1obj.vcdn.cloud/media/banner/cache/1/b58515f018eb873dafa430b6f9ae0c1e/2/4/240x201_36.jpg" alt="" />
                    </a>
                  </SwiperSlide>
                  <SwiperSlide>
                    <a href="https://www.cgv.vn/default/newsoffer/cgv-msb-promo/">
                      <img src="https://ocwckgy6c1obj.vcdn.cloud/media/banner/cache/1/b58515f018eb873dafa430b6f9ae0c1e/c/g/cgv_240x241_1.png" alt="" />
                    </a>
                  </SwiperSlide>
                  <SwiperSlide>
                    <a href="https://www.cgv.vn/default/newsoffer/cgv-techcombank-promo/">
                      <img src="https://ocwckgy6c1obj.vcdn.cloud/media/banner/cache/1/b58515f018eb873dafa430b6f9ae0c1e/2/4/240x201_5.png" alt="" />
                    </a>
                  </SwiperSlide>
                  <SwiperSlide>
                    <a href="https://www.cgv.vn/default/newsoffer/cgv-ban-viet-bank/">
                      <img src="https://ocwckgy6c1obj.vcdn.cloud/media/banner/cache/1/b58515f018eb873dafa430b6f9ae0c1e/a/d/adapt_kenh_doi_tac_240x201_1.png" alt="" />
                    </a>
                  </SwiperSlide>
                  <SwiperSlide>
                    <a href="https://www.cgv.vn/default/newsoffer/cgv-citi-bank-promo/">
                      <img src="https://ocwckgy6c1obj.vcdn.cloud/media/banner/cache/1/b58515f018eb873dafa430b6f9ae0c1e/2/4/240x201_7.png" alt="" />
                    </a>
                  </SwiperSlide>
                  <SwiperSlide>
                    <a href="https://www.cgv.vn/default/newsoffer/zalopay-promotion-1222/">
                      <img src="https://ocwckgy6c1obj.vcdn.cloud/media/banner/cache/1/b58515f018eb873dafa430b6f9ae0c1e/c/g/cgv_t12_240x201_1.jpg" alt="" />
                    </a>
                  </SwiperSlide>
                  <SwiperSlide>
                    <a href="https://www.cgv.vn/default/newsoffer/zalopay-promotion-u22/">
                      <img src="https://ocwckgy6c1obj.vcdn.cloud/media/banner/cache/1/b58515f018eb873dafa430b6f9ae0c1e/c/g/cgvu22-main_240x201_1.jpg" alt="" />
                    </a>
                  </SwiperSlide>
                  <SwiperSlide>
                    <a href="https://www.cgv.vn/default/newsoffer/ocb-promo/">
                      <img src="https://ocwckgy6c1obj.vcdn.cloud/media/banner/cache/1/b58515f018eb873dafa430b6f9ae0c1e/c/g/cgv-omni-240x201_1.png" alt="" />
                    </a>
                  </SwiperSlide>
                  <SwiperSlide>
                    <a href="https://www.cgv.vn/default/newsoffer/cgv-woori-bank/">
                      <img src="https://ocwckgy6c1obj.vcdn.cloud/media/banner/cache/1/b58515f018eb873dafa430b6f9ae0c1e/2/4/240x201_3.png" alt="" />
                    </a>
                  </SwiperSlide>
                </Swiper>
              {/* </Tab>
            </Tabs> */}
          </div>

        </div>
        {/* <div className="home-promotion-card">
          <ul className="promos">
            <li className="col-ad">
              <div className="format-border">
                <a href="https://www.cgv.vn/default/newsoffer/dream-party-package/">
                  <img
                    alt=""
                    src="https://ocwckgy6c1obj.vcdn.cloud/media/wysiwyg/packages/214x245.jpg"
                  />
                </a>
              </div>
            </li>
            <li className="col-hd">
              <div className="format-border">
                <a href="https://www.cgv.vn/default/newsoffer/u22-vn/">
                  <img src="https://ocwckgy6c1obj.vcdn.cloud/media/wysiwyg/2022/022022/u22_homepage.jpg" alt="" />
                </a>
              </div>
            </li>
            <li className="col-ad">
              <div className="format-border">
                <a
                  href="https://www.cgv.vn/default/newsoffer/hall-rental-cgv/"
                  target="_blank"
                >
                  <img src="https://ocwckgy6c1obj.vcdn.cloud/media/wysiwyg/2021/CGV-DIGITAL-HALL-RENTAL-214x245.png" alt="" />
                </a>
              </div>
            </li>
          </ul>
        </div> */}
      </div>

    </div>
  );
}

