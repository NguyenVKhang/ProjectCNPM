import "./style.css"
import { Swiper, SwiperSlide } from "swiper/react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Autoplay, Navigation, Pagination } from "swiper";
function Cinema() {
    const [Cinema, setCinema] = useState([]);
    const [Cinplex, setCinplex] = useState('');
    const [province, setProvince] = useState('');
    const [movie, setMovie] = useState('');



    const chooseProvince = (e) => {
        setProvince(e.target.innerText);
        setCinplex('');
        //find the active class and remove it, add active to the class that is being clicked
        const active = document.querySelector('.siteactive');
        if (active) {
            active.classList.remove('siteactive');
        }
        e.target.classList.add('siteactive');

        const cinplexactive = document.querySelector('.cinplexactive');
        if (cinplexactive) {
            cinplexactive.classList.remove('cinplexactive');
        }

        const theaterContainer = document.querySelector('.theater-container');
        theaterContainer.style.display = 'none';
    }

    const chooseCinplex = (e) => {
        setCinplex(e.target.innerText);
        //theater-container display none
        const active = document.querySelector('.cinplexactive');
        if (active) {
            active.classList.remove('cinplexactive');
        }
        e.target.classList.add('cinplexactive');
        const theaterContainer = document.querySelector('.theater-container');
        theaterContainer.style.display = 'block';

        document.querySelector('.theater-title h3').innerHTML = e.target.innerText;

        fetch("http://localhost:3001/movie/getMovieByCinplex", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                cinplex: e.target.innerText,
                place: province
            }),
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data.data.movieByCinplex);
                setMovie(data.data.movieByCinplex)
            }
            )
            .catch((err) => {
                console.log(err);
            }
            );
    }

    useEffect(() => {
        fetch("http://localhost:3001/cinema/getAllCinema", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((res) => res.json())
            .then((data) => {
                setCinema(data.data.cinema);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);


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
    }



    const user = JSON.parse(localStorage.getItem('token'));
    const testClick = (e) => {
        if (!user) {
            window.location.href = "/login";
            return;
        }
        //get atribute name
        const name = e.target.getAttribute('name');
        const day = e.target.getAttribute('date');
        const location = province
        const type = e.target.getAttribute('type');
        const cinema = Cinplex;
        const site = e.target.getAttribute('site');
        const time = e.target.getAttribute('time');

        fetch('http://localhost:3001/movie/getposition', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name: name, day: day, location: location, type: type, cinema: cinema, site: site, time: time }),
        })
            .then((res) => res.json())
            .then((data) => {
                navigate('/ticket', { state: data.data })
            });
    }


    return (
        <div className="main-container" id="all_cinema">
            <div className="main">
                <div className="col-main">
                    <div className="showtimes-wrap">
                        <div className="showtimes-container">
                            <div className="theatre-wrap">
                                <div className="theatre-list product-view">
                                    <div className="cgv-showtime-top"></div>
                                    <div className="theatre-city-tabs cgv-showtime-center">
                                        <div className="content-list-cinema">
                                            <div className="title-cgv-cinema">
                                                <h1>CGV CINEMAS</h1>
                                            </div>
                                            <div className="cinemas-area">
                                                <ul>
                                                    {Cinema.map((Province, index) => {
                                                        return (
                                                            <li key={index} >
                                                                <span cursorshover="true" onClick={chooseProvince}>
                                                                    {Province.province}
                                                                </span>
                                                            </li>
                                                        );
                                                    })}
                                                </ul>

                                            </div>
                                            <div className="cinemas-list">
                                                <ul>
                                                    {province === '' ? null : Cinema.find((Province) => Province.province === province).cinema.map((theater, index) => {
                                                        return (
                                                            <li key={index}>
                                                                <span onClick={chooseCinplex}>{theater.cinema_name} </span>
                                                            </li>
                                                        );
                                                    })}
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="cgv-showtime-bottom"></div>
                                </div>


                                <div className="theater-container product-view" >
                                    <div className="heater-head">
                                        <div className="home-title">
                                            <h3>Rạp</h3>
                                        </div>
                                        <div className="page-title theater-title" >
                                            <h3></h3>
                                        </div>
                                    </div>
                                    <div className="theater-gallery">
                                        <div className="theater-thumb-image">
                                            <div className="slideshow-theater slideshow-container">
                                                <Swiper
                                                    slidesPerView={1}
                                                    spaceBetween={30}
                                                    loop={true}
                                                    autoplay={{
                                                        delay: 3500,
                                                        disableOnInteraction: false,
                                                    }}
                                                    navigation={true}
                                                    modules={[Autoplay, Pagination, Navigation]}
                                                    className="mySwiper">
                                                    <SwiperSlide className="swiper-slide">
                                                        <a href="">
                                                            <img
                                                                src="https://www.cgv.vn/media/site/cache/1/980x415/b58515f018eb873dafa430b6f9ae0c1e/i/m/img_2893a_2_1.jpg"
                                                                alt="" />
                                                        </a>
                                                    </SwiperSlide>
                                                    <SwiperSlide className="swiper-slide">
                                                        <a href="">
                                                            <img
                                                                src="https://www.cgv.vn/media/site/cache/1/980x415/b58515f018eb873dafa430b6f9ae0c1e/i/m/img_0027_2a_2_1.jpg"
                                                                alt="" />
                                                        </a>
                                                    </SwiperSlide>
                                                    <SwiperSlide className="swiper-slide">
                                                        <a href="">
                                                            <img
                                                                src="https://www.cgv.vn/media/site/cache/1/980x415/b58515f018eb873dafa430b6f9ae0c1e/i/m/img_9935_2a_2_1.jpg"
                                                                alt="" />
                                                        </a>
                                                    </SwiperSlide>
                                                    <SwiperSlide className="swiper-slide">
                                                        <a href="">
                                                            <img
                                                                src="https://www.cgv.vn/media/site/cache/1/980x415/b58515f018eb873dafa430b6f9ae0c1e/i/m/img_2915a_2_1.jpg"
                                                                alt="" />
                                                        </a>
                                                    </SwiperSlide>
                                                </Swiper>
                                            </div>
                                        </div>
                                        <div className="theater-infomation">
                                            <div className="left-info-theater">
                                                <div className="theater-left-content">
                                                    <div className="theater-address">
                                                        {Cinplex === '' ? null : Cinema.find((Province) => Province.province === province).cinema.find((theater) => theater.cinema_name === Cinplex).address}
                                                    </div>
                                                    <div className="fax">
                                                        <label>Fax : </label>
                                                        <div className="fax-input" style={{ display: 'inline' }}>
                                                            +84 4 6 275 5240
                                                        </div>
                                                    </div>
                                                    <div className="hotline">
                                                        <label >Hotline : </label>
                                                        <div className="fax-input" style={{ display: 'inline' }}>
                                                            1900 6017
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="right-info-theater">
                                                <div className="theater-right-content">
                                                    <div className="location">
                                                        <a className="iframe cboxElement" title="CGV Hùng Vương Plaza" href="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1959.8605272140667!2d106.66259586811066!3d10.755968268574438!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752ef08a32cf6f%3A0x796d8897cb4e6b59!2sCGV+Hung+Vuong+Plaza!5e0!3m2!1sen!2s!4v1423115214982" >
                                                            Xem bản đồ</a>
                                                    </div>
                                                    <div className="contact-us">
                                                        <a className="cotact-us-link" href="https://www.cgv.vn/default/contacts/" >
                                                            Liên hệ CGV
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="product-collateral toggle-content tabs tabs-format-cgv cgv-schedule-v2">
                                        <div className="tabs">
                                            <Tabs
                                                defaultActiveKey="time"
                                                variant="pills"
                                                id="uncontrolled-tab-example"
                                                className="mb-3 tabss">
                                                <Tab eventKey="time" title="Lịch chiếu phim hôm nay">
                                                    <div className="tab-content">
                                                        <div className="product-collateral tabs tabs-cgv-showtimes">
                                                            {movie === '' ? null : movie.map((Movie, index) => {
                                                                return (
                                                                    <div className="film-list" key={index}>
                                                                        <div className="film-label">
                                                                            <h3 >
                                                                                <a style={{ 'cursor': 'pointer' }} title={Movie.name} onClick={showDetailMovie} >
                                                                                    {Movie.name}
                                                                                </a>
                                                                            </h3>
                                                                        </div>
                                                                        <div className="film-left">
                                                                            <div className="film-poster">
                                                                                <a style={{ 'cursor': 'pointer' }}><img src={Movie.image} width="190" height="250" onClick={showDetailMovie} title={Movie.name} /></a>
                                                                            </div>
                                                                        </div>
                                                                        <div className="film-right">
                                                                            {Movie.type.flatMap((Type) => Type.Cinema[0].Site.map((Site) => {
                                                                                return (
                                                                                    <div style={{
                                                                                        'marginLeft': '10px',
                                                                                        'marginBottom': '60px',
                                                                                    }}>
                                                                                        <strong className="film-screen std">
                                                                                            {Type.type_name} | {Site.site_name}
                                                                                        </strong>
                                                                                        <div className="film-showtimes">
                                                                                            <ul className="products-girl-movie tab-showtime">
                                                                                                {Site.Time.map((Time, index) => {
                                                                                                    const date = new Date(Time.timeSt);
                                                                                                    return (
                                                                                                        <li className="item" key={index}>
                                                                                                            <span style={{ 'cursor': 'pointer' }} onClick={testClick} name={Movie.name} date={Movie.day} type={Type.type_name} site={Site.site_name} time={Time.timeSt}>
                                                                                                                {date.toLocaleTimeString("en-US", { hour: '2-digit', minute: '2-digit' })}
                                                                                                            </span>
                                                                                                        </li>
                                                                                                    )
                                                                                                })}
                                                                                            </ul>
                                                                                        </div>
                                                                                    </div>
                                                                                )
                                                                            }))}
                                                                        </div>
                                                                    </div>
                                                                )
                                                            })}
                                                        </div>
                                                    </div>
                                                </Tab>
                                                <Tab eventKey="ticket_price" title="Giá vé phim">
                                                    <div className="tab-content">
                                                        <div className="information-ticket-new">
                                                            <div className="u22-price">
                                                                <h3>u22</h3>
                                                            </div>
                                                            <div className="box-table-price">
                                                                <div className="title-table-price">
                                                                    <h2>BẢNG GIÁ VÉ</h2>
                                                                </div>
                                                                <table border="1">
                                                                    <tbody>
                                                                        <tr className="title-day">
                                                                            <td>
                                                                                <p>Từ thứ hai đến thứ sáu</p>
                                                                            </td>
                                                                            <td colSpan="3">
                                                                                <p>thứ hai, thứ ba, thứ năm</p>
                                                                            </td>
                                                                            <td className="w12-5" rowSpan="2">
                                                                                <p>thứ tư vui vẻ</p>
                                                                            </td>
                                                                            <td colSpan="3">
                                                                                <p>thứ sáu, thứ bảy,chủ nhật và ngày lễ</p>
                                                                            </td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td className="w12-5">
                                                                                <p>Thành Viên Từ 22 Tuổi Trở Xuống, Sở Hữu Thẻ U22, Tại Rạp</p>
                                                                            </td>
                                                                            <td className="w12-5">
                                                                                <p>trẻ em</p>
                                                                            </td>
                                                                            <td className="w12-5">
                                                                                <p>Học sinh, sinh viên, người cao tuổi</p>
                                                                            </td>
                                                                            <td className="w12-5">
                                                                                <p>người lớn</p>
                                                                            </td>
                                                                            <td className="w12-5">
                                                                                <p>trẻ em</p>
                                                                            </td>
                                                                            <td className="w12-5">
                                                                                <p>học sinh, sinh viên (trước 17:00), người cao tuổi</p>
                                                                            </td>
                                                                            <td className="w12-5">
                                                                                <p>người lớn</p>
                                                                            </td>
                                                                        </tr>
                                                                        <tr className="value">
                                                                            <td>65.000</td>
                                                                            <td>70.000</td>
                                                                            <td>80.000</td>
                                                                            <td>100.000</td>
                                                                            <td>75.000</td>
                                                                            <td>80.000</td>
                                                                            <td>90.000</td>
                                                                            <td>120.000</td>
                                                                        </tr>
                                                                        <tr className="sur">
                                                                            <td colSpan="8">
                                                                                <p className="title-surcharge">
                                                                                    <strong>PHỤ THU:</strong>
                                                                                </p>
                                                                                <ul className="price-sub-table">
                                                                                    <li className="sub-charge">
                                                                                        <p>Ghế VIP:</p>
                                                                                        +5.000 ( miễn phụ thu cho U22 )

                                                                                    </li>
                                                                                    <li className="sub-charge">
                                                                                        <p>Atmos:</p>
                                                                                        +15.000

                                                                                    </li>
                                                                                    <li className="sub-charge">
                                                                                        <p>Sweetbox :</p>
                                                                                        <ul>
                                                                                            <li>+25.000 (Thứ Hai, Thứ Ba, Thứ Năm, Thứ Sáu, Thứ Bảy, Chủ Nhật )</li>
                                                                                            <li>+15.000 (Thứ Tư )</li>
                                                                                        </ul>
                                                                                    </li>
                                                                                    <li className="sub-charge">
                                                                                        <p>3D :</p>
                                                                                        <ul>
                                                                                            <li>+30.000 (Thứ Hai, Thứ Ba, Thứ Năm, Thứ Tư)</li>
                                                                                            <li>+50.000 (Thứ Sáu, Thứ Bảy, Chủ Nhật và Ngày Lễ )</li>
                                                                                        </ul>
                                                                                    </li>
                                                                                    <li className="sub-charge">
                                                                                        <p>Lễ/Tết:</p>
                                                                                        <ul>
                                                                                            <li>+10.000</li>
                                                                                        </ul>
                                                                                    </li>
                                                                                </ul>
                                                                            </td>
                                                                        </tr>
                                                                    </tbody>
                                                                </table>
                                                            </div>
                                                            <div className="box-table-price">
                                                                <div className="title-table-price">
                                                                    <h2>BẢNG GIÁ VÉ 4DX</h2>
                                                                </div>
                                                                <table border="1">
                                                                    <tbody>
                                                                        <tr className="title-day">
                                                                            <td className="w9" rowSpan="2">&nbsp;</td>

                                                                            <td className="w36" colSpan="1">
                                                                                <p>thứ hai, thứ ba, thứ năm</p>
                                                                            </td>
                                                                            <td className="w9" colSpan="1">
                                                                                <p>thứ tư

                                                                                    <br /> vui vẻ

                                                                                </p>
                                                                            </td>
                                                                            <td className="w36" colSpan="1">
                                                                                <p>thứ sáu, thứ bảy,

                                                                                    <br /> chủ nhật và ngày lễ

                                                                                </p>
                                                                            </td>
                                                                        </tr>
                                                                        <tr className="title-time">

                                                                        </tr>
                                                                        <tr className="value-1">
                                                                            <td className="text">
                                                                                <p style={{ fontSize: '12px' }}>phim 3D</p>
                                                                            </td>

                                                                            <td>
                                                                                <p>200.000</p>
                                                                            </td>
                                                                            <td>
                                                                                <p>200.000</p>
                                                                            </td>
                                                                            <td>
                                                                                <p>240.000</p>
                                                                            </td>
                                                                        </tr>
                                                                        <tr className="value-1">
                                                                            <td className="text">
                                                                                <p style={{ fontSize: '12px' }}>phim 2D</p>
                                                                            </td>

                                                                            <td>
                                                                                <p>170.000</p>
                                                                            </td>
                                                                            <td>
                                                                                <p>170.000</p>
                                                                            </td>
                                                                            <td>
                                                                                <p>190.000</p>
                                                                            </td>
                                                                        </tr>
                                                                    </tbody>
                                                                </table>
                                                            </div>
                                                            <div className="box-table-price">
                                                                <div className="title-table-price">
                                                                    <h2>BẢNG GIÁ VÉ SCREENX</h2>
                                                                </div>
                                                                <table border="1">
                                                                    <tbody>
                                                                        <tr className="title-day">
                                                                            <td className="w9" rowSpan="2">&nbsp;</td>

                                                                            <td className="w36" colSpan="1">
                                                                                <p>thứ hai, thứ ba, thứ năm</p>
                                                                            </td>
                                                                            <td className="w9" colSpan="1">
                                                                                <p>thứ tư

                                                                                    <br /> vui vẻ

                                                                                </p>
                                                                            </td>
                                                                            <td className="w36" colSpan="1">
                                                                                <p>thứ sáu, thứ bảy,

                                                                                    <br /> chủ nhật và ngày lễ

                                                                                </p>
                                                                            </td>
                                                                        </tr>
                                                                        <tr className="title-time">

                                                                        </tr>
                                                                        <tr className="value-1">
                                                                            <td className="text">
                                                                                <p style={{ fontSize: '12px' }}>phim 3D</p>
                                                                            </td>

                                                                            <td>
                                                                                <p>150.000</p>
                                                                            </td>
                                                                            <td>
                                                                                <p>150.000</p>
                                                                            </td>
                                                                            <td>
                                                                                <p>190.000</p>
                                                                            </td>

                                                                        </tr>
                                                                        <tr className="value-1">
                                                                            <td className="text">
                                                                                <p style={{ fontSize: '12px' }}>phim 2D</p>
                                                                            </td>

                                                                            <td>
                                                                                <p>120.000</p>
                                                                            </td>
                                                                            <td>
                                                                                <p>120.000</p>
                                                                            </td>
                                                                            <td>
                                                                                <p>140.000</p>
                                                                            </td>
                                                                        </tr>
                                                                    </tbody>
                                                                </table>
                                                            </div>

                                                            <div className="goldlass-price-new">
                                                                <h3>goldlass</h3>
                                                            </div>
                                                            <div className="notice-info-ticket">
                                                                <h3>
                                                                    <strong>Lưu ý :</strong>
                                                                </h3>
                                                                <ul>
                                                                    <li>- Dành cho khách hàng tại rạp L'amour (Goldclass), buffet không giới hạn được phục vụ tại buffet counter trong 30 phút bao gồm: 20 phút đầu phim (10 phút trước khi phim chiếu và tiếp tục trong 10 phút sau khi phim bắt đầu chiếu) và 10 phút giữa phim.</li>
                                                                    <li>- Vui lòng xuất trình thẻ thành viên CGV trước khi mua vé để được tích điểm.</li>
                                                                    <li>- Giá vé khi đặt vé trực tuyến trên website và ứng dụng CGV là giá vé người lớn. Các loại vé như học sinh-sinh viên, vé trẻ em, vé người cao tuổi, vé U22 vui lòng mua trực tiếp tại quầy.</li>
                                                                    <li>- Vé trẻ em chỉ xuất khi có sự hiện diện của trẻ dưới 1m3 và trên 2 tuổi.</li>
                                                                    <li>- Vé người cao tuổi chỉ dành cho khách hàng từ 55 tuổi trở lên. Vui lòng xuất trình CMND khi mua vé.</li>
                                                                    <li>- Vui lòng xuất trình thẻ học sinh-sinh viên để mua vé ưu đãi.</li>
                                                                </ul>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </Tab>
                                            </Tabs>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

            </div>

        </div >
    )
}
export default Cinema;
