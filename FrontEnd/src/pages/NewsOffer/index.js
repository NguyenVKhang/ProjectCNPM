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
       
        <div className="product-collateral toggle-content tabs home-event">
          <div className="home-title">
            <h2>Tin mới và ưu đãi</h2>

          </div>
          <div className="tabs">
            
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

