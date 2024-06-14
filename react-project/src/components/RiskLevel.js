import React from 'react';
import './RiskLevel.css';

const RiskLevel = ({ riskLevel, latestData }) => (
  <div className="risk-level">
    <h3>현재 위험 수준: {riskLevel}</h3>
    {latestData && (
      <>
        <p>평균 PPM: {latestData.avg_ppm}</p>
        <p>시간: {latestData.timestamp}</p>
      </>
    )}
  </div>
);

export default RiskLevel;
