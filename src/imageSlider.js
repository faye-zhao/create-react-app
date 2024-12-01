import React, { useState, useEffect } from 'react';
import './ImageSlider.css';

const ImageSlider = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? images.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const goToNext = () => {
    const isLastSlide = currentIndex === images.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  useEffect(() => {
    const slideInterval = setInterval(goToNext, 5000); // Auto-slide every 5 seconds
    return () => clearInterval(slideInterval);
  }, [currentIndex]);

  return (
    <div className="slider-container">
      <div 
        className="slider" 
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {images.map((image, index) => (
          <img key={index} src={image} alt={`Slide ${index + 1}`} className="slide" />
        ))}
      </div>
      <button className="prev-btn" onClick={goToPrevious}>Previous</button>
      <button className="next-btn" onClick={goToNext}>Next</button>
    </div>
  );
};

export default ImageSlider;