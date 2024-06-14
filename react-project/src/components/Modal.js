import React from 'react';
import './Modal.css';

const Modal = ({ visible, title, data, onClose }) => {
  if (!visible) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <button className="close-button" onClick={onClose}>×</button>
        <h3>{title}</h3>
        {title === 'Part 1' ? (
          <>
            <p>이곳에 {title}의 모달 내용을 추가하세요.</p>
            <h1>가져온 데이터</h1>
            <ul>
              {data.map(item => (
                <li key={item.timestamp}>
                  <p>평균 PPM: {item.avg_ppm}</p>
                  <p>시간: {item.timestamp}</p>
                </li>
              ))}
            </ul>
          </>
        ) : (
          <p>이곳에 {title}의 모달 내용을 추가하세요.</p>
        )}
      </div>
    </div>
  );
};

export default Modal;
