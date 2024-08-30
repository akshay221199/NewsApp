import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import NewsItems from './NewsItems';

const Newses = ({ country, pageSize, category }) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [error, setError] = useState(null); // New state for error handling

  const fetchNews = useCallback(async (page) => {
    setLoading(true);
    setError(null); // Clear previous errors
    try {
      const url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=002ef00f98974c7e8f49ffb6522fcc47&page=${page}&pageSize=${pageSize}`;      
      const response = await fetch(url);
      if (!response.ok) throw new Error('Network response was not ok');
      const parsedData = await response.json();
      setArticles(parsedData.articles);
      setTotalResults(parsedData.totalResults);
    } catch (error) {
      console.error('Fetch error:', error);
      setError('Failed to fetch news. Please try again later.');
      setArticles([]); // Clear articles on error
    } finally {
      setLoading(false);
    }
  }, [country, category, pageSize]); // Memoize the function with necessary dependencies

  useEffect(() => {
    fetchNews(page);
  }, [fetchNews, page]); // Added fetchNews to dependencies to avoid ESLint warnings

  const handlePrevClick = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const handleNextClick = () => {
    if (page + 1 <= Math.ceil(totalResults / pageSize)) {
      setPage(page + 1);
    }
  };

  return (
    <div className="container">
      <h1 className="my-3">DailyNews - Top Headlines</h1>
      {loading && <div>Loading...</div>}
      {error && <div className="alert alert-danger">{error}</div>} {/* Display error if present */}
      <div className="row my-3">
        {articles.length > 0 ? (
          articles.map((element) => (
            <div className="col-md-4 mt-2" key={element.url}>
              <NewsItems
                newsUrl={element.url}
                title={element.title ? element.title.slice(0, 50) : "Click to read complete news"}
                description={element.description ? element.description.slice(0, 100) : "To read description open in a new page"}
                imageUrl={element.urlToImage}
              />
            </div>
          ))
        ) : (
          !loading && <div>No news available</div> // Show message if no articles and not loading
        )}
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
