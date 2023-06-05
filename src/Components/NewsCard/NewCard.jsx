import React, { useState, useEffect } from 'react';
import './newscard.css';

const NewsCard = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const fetchArticles = async () => {
      const API_URL = `https://newsapi.org/v2/everything?q=formula1&language=en&sortBy=publishedAt&apiKey=61b2b0a5681649e7a91e8dbdd8b4979e`;
      
      try {
        const response = await fetch(API_URL);
        const data = await response.json();
        setArticles(data.articles.slice(0,14));
      } catch (error) {
        console.error('Error fetching articles:', error);
      }
    };

    fetchArticles();
  }, []);

  return (
    <div className="grid-container">
      <h1>News</h1>
      <div className="grid">
        {articles.map((article, index) => (
          <a key={index} className="card" href={article.url} target="_blank">
            <img src={article.urlToImage} alt={article.title}/>
            <h3>{article.source.name}</h3>
            <h4>{article.title}</h4>
            <p>{article.description}</p>
          </a>
        ))}
      </div>
    </div>
  );
};

export default NewsCard;
