/* eslint-disable jsx-a11y/anchor-is-valid */
import "./header.css";
import { Link, useNavigate } from "react-router-dom";
import logo from "./D3K.png";

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
          <div className="btn-cover btn-cover1">
            <img
              className="icon"
              src="https://www.cgv.vn/skin/frontend/cgv/default/images/bg-cgv/icon_promotion25.png"
              alt="icon"
            />
            <a id="btn-zoom">
              <Link to="/newsoffer">Tin mới và ưu đãi</Link>
            </a>
          </div>
          <div className="btn-cover btn-cover1">
            <img
              className="icon"
              src="https://www.cgv.vn/skin/frontend/cgv/default/images/bg-cgv/icon_ticket25.png"
              alt="icon"
            />
            <a id="btn-zoom">
              <Link to="profile/history">Vé của tôi</Link>

            </a>
          </div>
          <div className="btn-cover ">
            <img
              className="icon"
              src="https://www.cgv.vn/skin/frontend/cgv/default/images/bg-cgv/icon_login25.png"
              alt="icon"
            />
            {!user ? (
              <><Link to="/login">Đăng nhập/</Link><Link to="register">Đăng ký</Link></>
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
                src={logo}

                alt="logo"
              />
            </Link>
            <div className="menubartop">
              <ul>
                <li className="menu">
                  <Link to="/movies/now-showing">Phim Đang Chiếu 
                  </Link>
                </li>
                <li className="menu">
                  
                  <Link to="/movies/coming-soon">Phim Sắp Chiếu</Link>
                </li>
                <li className="menu">
                  {user ? ( 
                    <Link to="/profile/general">Tài khoản</Link>
                  ) : (
                    <Link to="/login">Tài khoản</Link>
                  )}
                </li>
                <li className="menu">
                  <Link to="/contact">Liên hệ D3K</Link>
                </li>

              </ul>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}

export default Header;
