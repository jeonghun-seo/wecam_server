import React from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import parts from '../data/parts'; // parts 데이터를 사용하는 경우
import './SliderComponent.css';

const SliderComponent = ({ handleCircleClick }) => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    arrows: false,
  };

  return (
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
  );
};

export default SliderComponent;
