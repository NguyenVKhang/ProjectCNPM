function Nocart() {
    const goHome = () => {
        window.location.href = "/"
    }
    return (
        <div className="main-containers col1-layout">
            <div className="main">
                <div className="col-main">
                    <div className="std">
                        <div className="page-head-alt">
                            <h5 style={{
                                "fontWeight": "bold",
                            }}>Giỏ hàng chưa có sản phẩm</h5>
                            <br></br>
                            <span>Không có sản phẩm nào</span>
                            <br></br>
                            <span><em style={{
                                "color": "red"
                            }} onClick={goHome}>
                                Click vào đây </em>để tiếp tục mua hàng</span>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default Nocart