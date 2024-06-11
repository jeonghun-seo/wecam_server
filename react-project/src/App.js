import React, { useState, useEffect } from 'react';
import Slider from "react-slick";
import './App.css';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import parts from './data/parts';
import coData from './data/co';

function App() {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [currentCOValue, setCurrentCOValue] = useState(null);
  const [pastCOValues, setPastCOValues] = useState([]);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    arrows: false,
  };

  const handleCircleClick = (title) => {
    setModalTitle(title);
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  useEffect(() => {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0') + ":00";
    const currentData = coData.find(data => data.time === hours);
    if (currentData) {
      setCurrentCOValue(currentData.value);
    }

    const pastValues = [];
    for (let i = 1; i <= 6; i++) {
      const pastHour = new Date(now.getTime() - i * 60 * 60 * 1000);
      const pastHours = pastHour.getHours().toString().padStart(2, '0') + ":00";
      const pastData = coData.find(data => data.time === pastHours);
      if (pastData) {
        pastValues.push({ time: pastHours, value: pastData.value });
      }
    }
    setPastCOValues(pastValues.reverse());
  }, []);

  const getStatus = (value) => {
    if (value <= 50) return '양호';
    if (value <= 70) return '위험';
    return '매우 위험';
  };

  const getStatusColor = (value) => {
    if (value <= 50) return 'green';
    if (value <= 70) return 'orange';
    return 'red';
  };

  const getStatusDescription = (value) => {
    if (value <= 50) return '현재 CO 상태는 양호입니다. 공기를 깨끗하게 유지하고, 실내 환기를 자주 해주세요.';
    if (value <= 70) return '현재 CO 상태는 위험입니다. 가능하면 외출을 자제하고, 실내 공기 청정기를 사용하세요.';
    return '현재 CO 상태는 매우 위험합니다. 즉시 실내로 들어가 환기를 시키고, 공기 청정기를 사용하세요.';
  };

  return (
    <div className="App">
      <nav className="navbar">
        <div className="navbar-left">
          <h1>Wecam</h1>
        </div>
        <div className="navbar-center">
          <h2>햇살아래캠핑장</h2>
        </div>
      </nav>
      <div className="slider-container">
        <Slider {...settings}>
          {parts.map((part, index) => (
            <div className="part" key={index}>
              <div className="part-circle" onClick={() => handleCircleClick(part)}>{part}</div>
            </div>
          ))}
        </Slider>
      </div>
      {modalVisible && (
        <div className="modal-overlay" onClick={handleCloseModal}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <h3>{modalTitle}</h3>
            <p>이곳에 {modalTitle}의 모달 내용을 추가하세요.</p>
            <button onClick={handleCloseModal}>닫기</button>
          </div>
        </div>
      )}
      <div className="co-box">
        {currentCOValue !== null ? (
          <h1>
            현재 시간대의 CO 값: {currentCOValue}
            <span
              className="status-box"
              style={{ backgroundColor: getStatusColor(currentCOValue) }}
            >
              {getStatus(currentCOValue)}
            </span>
          </h1>
        ) : (
          <h1>현재 시간대의 CO 값을 찾을 수 없습니다.</h1>
        )}
        <div className="past-co-values">
          {pastCOValues.map((data, index) => (
            <div key={index} className="past-co-value">
              <span>{data.value}</span><br />
              <span>{data.time}</span>
            </div>
          ))}
        </div>
        <div className="description">
          {currentCOValue !== null && (
            <p>{getStatusDescription(currentCOValue)}</p>
          )}
        </div>
        <button className="info-button">더 많은 정보 보기</button>
      </div>
    </div>
  );
}

export default App;