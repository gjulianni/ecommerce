import React, { useState, useEffect } from "react";
import styled from "styled-components";

interface ImageBannerProps {
  images: string[];
  interval?: number; // Tempo entre transições automáticas (em ms)
}

// Estilização com styled-components
const BannerContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 1500px;
  margin: 10px auto;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
`;

const BannerImage = styled.img`
  width: 100%;
  height: 300px;
  transition: opacity 0.5s ease-in-out;
`;

const ArrowButton = styled.button<{ position: "left" | "right" }>`
  position: absolute;
  top: 50%;
  ${({ position }) => (position === "left" ? "left: 10px;" : "right: 10px;")}
  transform: translateY(-50%);
  background: rgba(0, 0, 0, 0.5);
  color: white;
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  font-size: 30px;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 10;

  &:hover {
    background: rgba(0, 0, 0, 0.8);
  }
`;

const DotsContainer = styled.div`
  position: absolute;
  bottom: 10px;
  display: flex;
  justify-content: center;
  width: 100%;
`;

const Dot = styled.div<{ active: boolean }>`
  width: 10px;
  height: 10px;
  margin: 0 5px;
  border-radius: 50%;
  background-color: ${({ active }) => (active ? "white" : "black")};
  transition: background-color 0.3s;
`;

const ImageBanner: React.FC<ImageBannerProps> = ({ images, interval = 3000 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const totalImages = images.length;

  const nextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % totalImages);
  };

  const prevImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + totalImages) % totalImages);
  };

  useEffect(() => {
    const autoSlide = setInterval(() => {
      nextImage();
    }, interval);

    return () => clearInterval(autoSlide);
  }, [currentIndex, interval]);

  return (
    <BannerContainer>
      <ArrowButton position="left" onClick={prevImage}>
        &#8249;
      </ArrowButton>
      <BannerImage src={images[currentIndex]} alt={`Slide ${currentIndex + 1}`} />
      <ArrowButton position="right" onClick={nextImage}>
        &#8250;
      </ArrowButton>
      <DotsContainer>
        {images.map((_, index) => (
          <Dot key={index} active={index === currentIndex} />
        ))}
      </DotsContainer>
    </BannerContainer>
  );
};

export default ImageBanner;
