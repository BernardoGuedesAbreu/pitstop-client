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
    {
      id: 4,
      imagePath: "https://i.ibb.co/jZ4NT3H/card4.png",
      clickUrl:
        "https://biztoc.com/x/eae07a64e7542543",
    },
    {
      id: 5,
      imagePath: "https://i.ibb.co/xFC552T/card5.png",
      clickUrl:
        "https://www.reddit.com/r/formula1/comments/141jtll/were_joining_the_reddit_blackout_from_june_12th/",
    },
    {
      id: 6,
      imagePath: "https://i.ibb.co/mhGjwjp/card6.png",
      clickUrl:
        "https://www.cryptopolitan.com/red-bull-partners-with-sui-network-formula1/",
    },
    {
      id: 7,
      imagePath: "https://i.ibb.co/0m82DSh/card7.png",
      clickUrl:
        "https://biztoc.com/x/92d7a2c6fb0fc4f3",
    },
    {
      id: 8,
      imagePath: "https://i.ibb.co/KxJj3nK/card8.png",
      clickUrl:
        "https://biztoc.com/x/6904e817cef1d719",
    },
  ];

  const handleClick = (url) => {
    window.open(url, "_blank");
  };

  return (
    <div className="grid-container">
    <div>
      {images.map((image) => (
        
        <img
          key={image.id}
          src={image.imagePath}
          alt={`Image ${image.id}`}
          onClick={() => handleClick(image.clickUrl)}
          className="news-card"
        />
    
      ))}
      </div>
    </div>
  );
};

export default NewsCard;
