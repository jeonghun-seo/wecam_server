import React, { useState, useEffect } from 'react';
import Slider from "react-slick";
import './App.css';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import parts from './data/parts'; // parts 데이터를 사용하는 경우
import axios from 'axios';

function App() {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('http://RainB6735.iptime.org:3000/getData')
      .then(response => {
        setData(response.data);
        setLoading(false);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

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
              <div className="part-circle" onClick={() => handleCircleClick(`Part ${index + 1}`)}>
                <img src={`${process.env.PUBLIC_URL}/tent/tent${index + 1}.jpg`} alt={`Tent ${index + 1}`} />
              </div>
              <div className="part-label">Part {index + 1}</div>
            </div>
          ))}
        </Slider>
      </div>
      {modalVisible && (
        <div className="modal-overlay" onClick={handleCloseModal}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <h3>{modalTitle}</h3>
            <p>이곳에 {modalTitle}의 모달 내용을 추가하세요.</p>
            <h1>Fetched Data</h1>
            <ul>
              {data.map(item => (
                <li key={item.sensor_id}>
                  <p>Sensor ID: {item.sensor_id}</p>
                  <p>Average PPM: {item.avg_ppm}</p>
                  <p>Timestamp: {new Date(item.timestamp).toLocaleString()}</p>
                </li>
              ))}
            </ul>
            <button onClick={handleCloseModal}>닫기</button>
          </div>
        </div>
      )}
      <div className="co-box">
        <button className="info-button">더 많은 정보 보기</button>
      </div>
    </div>
  );
}

export default App;