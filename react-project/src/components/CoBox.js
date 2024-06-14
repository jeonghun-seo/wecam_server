import React from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';
import './CoBox.css';

const CoBox = ({ latestData, riskLevel, chartData, chartOptions }) => {
  return (
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
      <div className="chart-container">
        <Line data={chartData} options={chartOptions} />
      </div>
      <button className="info-button">더 많은 정보 보기</button>
    </div>
  );
};

export default CoBox;
