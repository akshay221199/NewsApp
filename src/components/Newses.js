import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import NewsItems from './NewsItems';

const Newses = ({ country, pageSize, category }) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  const fetchNews = async (page) => {
    setLoading(true);
    let url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=100cf3514d2c4dcca19877c952cac93c&page=${page}&pageSize=${pageSize}`;
    let data = await fetch(url);
    let parsedData = await data.json();
    setArticles(parsedData.articles);
    setTotalResults(parsedData.totalResults);
    setLoading(false);
  };

  useEffect(() => {
    fetchNews(page);
  }, [page, country, category]);

  const handlePrevClick = async () => {
    if (page > 1) {
      setPage(page - 1);
      fetchNews(page - 1);
    }
  };

  const handleNextClick = async () => {
    if (page + 1 <= Math.ceil(totalResults / pageSize)) {
      setPage(page + 1);
      fetchNews(page + 1);
    }
  };

  return (
    <div className="container">
      <h1 className="my-3">DailyNews - Top Headlines</h1>
      {loading && <div>Loading...</div>}
      <div className="row my-3">
        {articles.map((element) => (
          <div className="col-md-4 mt-2" key={element.url}>
            <NewsItems
              newsUrl={element.url}
              title={element.title ? element.title.slice(0, 50) : "Click to read complete news"}
              description={element.description ? element.description.slice(0, 100) : "To read description open in a new page"}
              imageUrl={element.urlToImage}
            />
          </div>
        ))}
      </div>
      <div className="container d-flex justify-content-between">
        <button disabled={page <= 1} onClick={handlePrevClick} className="btn btn-dark">
          &larr; Previous
        </button>
        <button disabled={page + 1 > Math.ceil(totalResults / pageSize)} onClick={handleNextClick} className="btn btn-dark">
          &rarr; Next
        </button>
      </div>
    </div>
  );
};

Newses.defaultProps = {
  country: 'in',
  pageSize: 5,
  category: 'general',
};

Newses.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
};

export default Newses;
