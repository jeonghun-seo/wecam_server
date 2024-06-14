import React, { useState, useEffect } from 'react';
import Slider from "react-slick";
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';
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
        // 데이터를 가공하여 avg_ppm을 소수점 3자리까지만 변환
        const formattedData = response.data.map(item => ({
          ...item,
          avg_ppm: item.avg_ppm.toFixed(3),
          timestamp: new Date(item.timestamp).toLocaleTimeString('ko-KR', { hour12: false })
        }));
        setData(formattedData);
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

  const chartData = {
    labels: data.map((_, index) => index + 1),
    datasets: [
      {
        label: 'PPM',
        data: data.map(item => item.avg_ppm),
        borderColor: 'rgba(75,192,192,1)',
        backgroundColor: 'rgba(75,192,192,0.2)',
        fill: true,
      },
    ],
  };

  const chartOptions = {
    scales: {
      x: {
        display: false
      },
      y: {
        ticks: {
          stepSize: 10
        }
      }
    }
  };

  const getRiskLevel = (ppm) => {
    if (ppm < 10) return '정상';
    if (ppm < 30) return '저위험';
    if (ppm < 50) return '중위험';
    if (ppm < 70) return '고위험';
    return '매우 고위험';
  };

  const latestData = data[data.length - 1];
  const riskLevel = latestData ? getRiskLevel(latestData.avg_ppm) : '데이터 없음';

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
            <h1>가져온 데이터</h1>
            <ul>
              {data.map(item => (
                <li key={item.timestamp}>
                  <p>평균 PPM: {item.avg_ppm}</p>
                  <p>시간: {item.timestamp}</p>
                </li>
              ))}
            </ul>
            <button onClick={handleCloseModal}>닫기</button>
          </div>
        </div>
      )}
      <div className="co-box">
        <div className="risk-level">
          <h3>현재 위험 수준: {riskLevel}</h3>
          {latestData && (
            <>
              <p>평균 PPM: {latestData.avg_ppm}</p>
              <p>시간: {latestData.timestamp}</p>
            </>
          )}
        </div>
        <Line data={chartData} options={chartOptions} />
        <button className="info-button">더 많은 정보 보기</button>
      </div>
      <div className="camera-box">
        <h3>실시간 캠</h3>
        <img src={`${process.env.PUBLIC_URL}/cameraExample.jpg`} alt="Camera Example" />
      </div>
    </div>
  );
}

export default App;
