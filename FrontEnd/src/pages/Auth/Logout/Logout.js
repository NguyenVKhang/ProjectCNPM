import "./style.css";

function Logout() {
  setTimeout(() => {
    window.location.href = "/";
  }, 5000);

  return (
    <div className="exit-succ">
      <h6>Thoát khỏi hệ thống thành công</h6>
      <h6>Bạn đã thoát khỏi tài khoản thành công. Hệ thống sẽ chuyển về trang chủ trong 5 giây, bạn vui lòng đợi</h6>
    </div>
  )
}

export default Logout;
