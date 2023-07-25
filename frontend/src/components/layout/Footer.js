import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <Fragment>
      <footer className="footer">
        {/* Footer Top */}
        <br/>
        <div className="footer-top section">
          <div className="container">
            <div className="row">
              <div className="col-lg-5 col-md-6 col-12">
                {/* Single Widget */}
                <div className="single-footer about">
                    <Link to="/">
                        <img src="/images/logo2.jpg" alt='' />
                    </Link>
                  <p className="text">Cửa hàng điện tử Văn Lang là một trang web bán hàng trực tuyến đầy đủ tính năng, được hỗ trợ 24/7 và cung cấp nhiều ưu đãi hấp dẫn. Chúng tôi cam kết cập nhật liên tục các sản phẩm mới nhất để đáp ứng nhu cầu mua sắm của khách hàng.</p>
                  <p className="text">Cần hỗ trợ liên hệ với chúng tôi: <span><a href="tel:0839998413">+84 83 999 8413</a></span></p>
                </div>
                {/* End Single Widget */}
              </div>
              <div className="col-lg-2 col-md-6 col-12">
                {/* Single Widget */}
                <div className="single-footer links">
                  <h4>Thông tin</h4>
                  <ul>
                    <li><Link to=''>Về chúng tôi</Link></li>
                    <li><Link to=''>Chính sách và Điều khoản</Link></li>
                    <li><Link to=''>Liên hệ</Link></li>
                    <li><Link to=''>Trung tâm hỗ trợ</Link></li>
                    <li><Link to=''>Đánh giá chung</Link></li>
                  </ul>
                </div>
                {/* End Single Widget */}
              </div>
              <div className="col-lg-2 col-md-6 col-12">
                {/* Single Widget */}
                <div className="single-footer links">
                  <h4>Dịch vụ chăm sóc khách hàng</h4>
                  <ul>
                    <li><Link to=''>Phương thức thanh toán</Link></li>
                    <li><Link to=''>Hoàn tiền</Link></li>
                    <li><Link to=''>Dịch vụ vận chuyển</Link></li>
                    <li><Link to=''>Cam Kết Bảo Mật Thông Tin</Link></li>
                  </ul>
                </div>
                {/* End Single Widget */}
              </div>
              <div className="col-lg-3 col-md-6 col-12">
                {/* Single Widget */}
                <div className="single-footer social">
                  <h4>Thông tin</h4>
                  {/* Single Widget */}
                  <div className="contact">
                    <ul>
                      <li>Trường Đại học Văn Lang Cơ Sở 3</li>
                      <li>69/68 Đặng Thùy Trâm, P.13, Q.Bình Thạnh, TP.HCM</li>
                      <li>Nhóm G03</li>
                      <li>ducmanghoangthieu@gmail.com</li>
                      <li>+84 83 999 8413</li>
                    </ul>
                  </div>
                  {/* End Single Widget */}
                  <ul>
                  </ul>
                </div>
                {/* End Single Widget */}
              </div>
            </div>
          </div>
        </div>
        {/* End Footer Top */}
        <div className="copyright">
          <div className="container">
            <div className="inner">
              <div className="row">
                <div className="col-lg-12 col-12">
                  <div className="text-center">
                    <p>Copyright © 2023 By Nhóm G03</p>
                  </div>
                </div>
                <div className="col-lg-6 col-12">
                  <div className="right">
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </Fragment>
  )
}

export default Footer
