import "./header.css";
import { Link, useNavigate } from "react-router-dom";
import { BsJustify } from "react-icons/bs"
function Header() {
  const user = JSON.parse(localStorage.getItem("token"));
  const navigate = useNavigate();
  const logoutOnclick = () => {
    localStorage.removeItem("token");
    navigate("/logout");
  };
  return (
    <>
      <div id="header-container">
        <div id="header_btn">
          <div className="btn-cover btn-cover1 ">
            <img
              className="icon"
              src="https://www.cgv.vn/skin/frontend/cgv/default/images/bg-cgv/recruitment_icon1.png"
              alt="icon"
            />

            <a id="btn-zoom" href="https://www.facebook.com/">
              Tuyển dụng
            </a>
          </div>
          <div className="btn-cover btn-cover1">
            <img
              className="icon"
              src="https://www.cgv.vn/skin/frontend/cgv/default/images/bg-cgv/icon_promotion25.png"
              alt="icon"
            />
            <a id="btn-zoom" href="https://www.facebook.com/">
              Tin mới và ưu đãi
            </a>
          </div>
          <div className="btn-cover btn-cover1">
            <img
              className="icon"
              src="https://www.cgv.vn/skin/frontend/cgv/default/images/bg-cgv/icon_ticket25.png"
              alt="icon"
            />
            <a id="btn-zoom" href="https://www.facebook.com/">
              Vé của tôi
            </a>
          </div>
          <div className="btn-cover ">
            <img
              className="icon"
              src="https://www.cgv.vn/skin/frontend/cgv/default/images/bg-cgv/icon_login25.png"
              alt="icon"
            />
            {!user ? (
              <Link to="/login">Đăng nhập/Đăng ký</Link>
            ) : (
              <>
                <Link to="/profile/general">Xin chào, {user.user.name}</Link>
                <Link
                  to="/logout"
                  onClick={logoutOnclick}
                  style={{ marginLeft: "20px" }}
                >
                  Thoát
                </Link>
              </>
            )}
          </div>
        </div>
        <div id="bg-top">
          <div className="top-container">
            <Link to="/">
              <img
                className="logo"
                src="https://www.cgv.vn/skin/frontend/cgv/default/images/cgvlogo.png"
                alt="logo"
              />
            </Link>
            <div className="menubartop">
              <ul>
                <li className="menu">
                  Phim
                  <ul className="subMenu">
                    <li>
                      <Link to="/movies/now-showing">Phim Đang Chiếu</Link>
                    </li>
                    <li>
                      <Link to="/movies/coming-soon">Phim Sắp Chiếu</Link>
                    </li>
                  </ul>
                </li>
                <li className="menu">
                  Rạp cgv
                  <ul
                    className="subMenu"
                    style={{
                      marginLeft: " -10px",
                    }}
                  >
                    <li>
                      <Link to="/cinema">Tất cả các rạp</Link>
                    </li>
                    <li>
                      <a href=""> Rạp Đặc Biệt</a>
                    </li>
                    <li>
                      <a href=""> Rạp 3D</a>
                    </li>
                  </ul>
                </li>
                <li className="menu" style={{ margin: "40px 13px" }}>
                  Thành viên
                  <ul className="subMenu" style={{ marginLeft: "-20px" }}>
                    {/* <div
                      style={{ position: "absolute", border: "2px solid #fff" }}
                    ></div> */}
                    <li>
                      <a href=""> Tài khoản CGV</a>
                    </li>
                    <li>
                      <a href=""> Quyền Lợi</a>
                    </li>
                  </ul>
                </li>
                <li className="menu" style={{ margin: "40px 50px auto 13px" }}>
                  Cultureplex
                  <ul className="subMenu" style={{ marginLeft: " -20px" }}>
                    <div style={{}}></div>
                    <li>
                      <a href=""> Quầy Online</a>
                    </li>
                    <li>
                      <a href=""> Thuê Rạp và Vé Nhóm</a>
                    </li>
                    <li>
                      <a href=""> E-CGV</a>
                    </li>
                    <li>
                      <a href=""> Thẻ Quà Tặng</a>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>


            <img
              id="kenhCine"
              src="https://www.cgv.vn/media/wysiwyg/2019/AUG/kenhcine.gif"
              alt="kênh cine"
            />
            <img
              id="muaVe"
              src="https://www.cgv.vn/media/wysiwyg/news-offers/mua-ve_ngay.png"
              alt="mua vé"
            />
          </div>
        </div>

        <div className="dropdown">
          <button id="btn-menu" data-bs-toggle="dropdown" aria-expanded="false">
            <BsJustify /> Menu
          </button>
          <button id="btn-tiket">
            <span className="icon"><a href="https://www.cgv.vn/default/sales/order/history/"></a></span>
          </button>
          <ul className="dropdown-menu">
            <li><Link to="/movies/now-showing">PHIM ĐANG CHIẾU</Link></li>
            <li><Link to="/movies/coming-soon">PHIM SẮP CHIẾU</Link></li>
            <li><Link to="/cinema">RẠP CGV</Link></li>
            <li><a href=""> THÀNH VIÊN</a></li>
            <li><a href=""> CULTUREPLEX</a></li>
            <li><a href=""> TUYỂN DỤNG</a></li>
            <li><a href=""> TIN MỚI VÀ ƯU ĐÃI</a></li>
          </ul>
        </div>

      </div>
    </>
  );
}

export default Header;
