import React, { useState } from 'react';
import './intro.css';
import Login from './login';

function Intro() {
  const [showModal, setShowModal] = useState(false);

  const handleLoginClick = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className="intro-container">
      <div className="intro-box">
        <img src={`${process.env.PUBLIC_URL}/logo.png`} alt="Logo" className="logo" />
        <h1>FIRE FIT</h1>
        <p>Stay in shape, stay healthy</p>
        <button className="sign-up">Sign Up</button>
        <button className="login" onClick={handleLoginClick}>Login</button>
      </div>
      {showModal && <Login onClose={closeModal} />}
    </div>
  );
}

export default Intro;
