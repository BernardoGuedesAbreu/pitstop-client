import { useState, useEffect } from "react";
import "./newscard.css";

const NewsCard = () => {
  const images = [
    {
      id: 1,
      imagePath: "https://i.ibb.co/6tTkxQ9/card1.png",
      clickUrl: "https://biztoc.com/x/d7ce1df5f927d43f",
    },
    {
      id: 2,
      imagePath: "https://i.ibb.co/xD5qf1n/card2.png",
      clickUrl:
        "https://www.digitaltrends.com/movies/watch-f1-live-stream-online/",
    },
    {
      id: 3,
      imagePath: "https://i.ibb.co/gRK519j/card3.png",
      clickUrl:
        "https://robbreport.com/motors/cars/delage-competing-2023-le-mans-lmp2-class-1234850452/",
    },
    // Add more images with their respective paths and click URLs
  ];

  const handleClick = (url) => {
    window.open(url, "_blank");
  };

  return (
    <div className="image-grid">
      {images.map((image) => (
        <img
          key={image.id}
          src={image.imagePath}
          alt={`Image ${image.id}`}
          onClick={() => handleClick(image.clickUrl)}
        />
      ))}
    </div>
  );
};

export default NewsCard;
