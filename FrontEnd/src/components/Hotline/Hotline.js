import React, { useState } from 'react';
import { FaPhone, FaEnvelope } from 'react-icons/fa';
import "./Hotline.css"
const Hotline = () => {
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <div className="hotline-container">
      <div className="hotline-icon" onClick={toggleModal}>
        <FaPhone />
      </div>

      {showModal && (
        <div className="hotline-modal">
          <a href="tel:0123456789" className="hotline-option">
            <FaPhone />
            <span>0123 456 789</span>
          </a>
          <a href="mailto:example@gmail.com" className="hotline-option">
            <FaEnvelope />
            <span>example@gmail.com</span>
          </a>
        </div>
      )}
    </div>
  );
};

export default Hotline;
