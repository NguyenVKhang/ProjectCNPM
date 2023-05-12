import React, { useState } from 'react';
import { FaPhone, FaEnvelope, FaFacebook } from 'react-icons/fa';
import './Hotline.css';

const Hotline = () => {
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <div className="hotline-container">
      <div className="hotline-icon" onClick={toggleModal}>
        <FaPhone className="hotline-icon-animate" />
      </div>

      {showModal && (
        <div className="hotline-modal">
          <div className="hotline-header">Liên hệ với chúng tôi qua:</div>
          <a href="tel:0123456789" className="hotline-option">
            <FaPhone />
            <span>0123 456 789</span>
          </a>
          <a href="mailto:khang12345khan@gmail.com" className="hotline-option">
            <FaEnvelope />
            <span>Gmail</span>
          </a>
          <a href="https://www.facebook.com/profile.php?id=100033353748879" className="hotline-option">
            <FaFacebook />
            <span>Facebook</span>
          </a>
        </div>
      )}
    </div>
  );
};

export default Hotline;
