import React, { useState, useEffect } from 'react';

const NewsCard = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const fetchArticles = async () => {
      const API_URL = `https://newsapi.org/v2/everything?q=formula1&language=en&sortBy=publishedAt&apiKey=61b2b0a5681649e7a91e8dbdd8b4979e`;
      
      try {
        const response = await fetch(API_URL);
        const data = await response.json();
        setArticles(data.articles);
      } catch (error) {
        console.error('Error fetching articles:', error);
      }
    };

    fetchArticles();
  }, []);

  return (
    <div>
      {articles.map((article, index) => (
        <div key={index} className="card">
          <img src={article.urlToImage} alt={article.title} />
          <h3>{article.source.name}</h3>
          <h4>{article.title}</h4>
          <p>{article.description}</p>
        </div>
      ))}
    </div>
  );
};

export default NewsCard;
