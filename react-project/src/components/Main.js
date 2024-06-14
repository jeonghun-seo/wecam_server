import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import Modal from './Modal';
import CoBox from './CoBox';
import SliderComponent from './SliderComponent';
import useDataFetcher from './DataFetcher';
import './Main.css';

const Main = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const { data, loading, error } = useDataFetcher('http://RainB6735.iptime.org:3000/getData');

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
        min: 0,
        max: 100,
        ticks: {
          stepSize: 10
        }
      }
    },
    maintainAspectRatio: false,
  };

  const getRiskLevel = (ppm) => {
    if (ppm < 10) return '정상';
    if (ppm < 30) return '저위험';
    if (ppm < 50) return '중위험';
    if (ppm < 70) return '고위험';
    return '매우 고위험';
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  const latestData = data[data.length - 1];
  const riskLevel = latestData ? getRiskLevel(latestData.avg_ppm) : '데이터 없음';

  return (
    <div className={`Main ${modalVisible ? 'modal-open' : ''}`}>
      <Navbar />
      <SliderComponent handleCircleClick={handleCircleClick} />
      <Modal
        visible={modalVisible}
        title={modalTitle}
        data={data}
        onClose={handleCloseModal}
      />
      <CoBox
        latestData={latestData}
        riskLevel={riskLevel}
        chartData={chartData}
        chartOptions={chartOptions}
      />
      <div className="camera-box">
        <h3>실시간 캠</h3>
        <img src={`${process.env.PUBLIC_URL}/cameraExample.jpg`} alt="Camera Example" />
      </div>
    </div>
  );
};

export default Main;
