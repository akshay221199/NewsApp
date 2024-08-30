import React from 'react';
import PropTypes from 'prop-types';

const NewsItems = ({ title, description, imageUrl, newsUrl }) => {
    return (
        <div className="container">
            <div className="card" style={{ width: "18rem" }}>
                <img 
                    src={imageUrl || "https://c.ndtvimg.com/2023-10/a28qorko_volcano-that-spews-blue-flames_625x300_30_October_23.jpg"} 
                    className="card-img-top" 
                    alt={title || "News image"} 
                />
                <div className="card-body">
                    <h5 className="card-title">{title}</h5>
                    <p className="card-text">{description}</p>
                    <a href={newsUrl} rel="noreferrer" target="_blank" className="btn btn-sm btn-primary">Read more</a>
                </div>
            </div>
        </div>
    );
};

NewsItems.propTypes = {
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    imageUrl: PropTypes.string,
    newsUrl: PropTypes.string.isRequired
};

export default NewsItems;
