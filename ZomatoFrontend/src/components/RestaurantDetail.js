import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import "./RestaurantDetail.css";

const defaultImage =
  "https://images.pexels.com/photos/67468/pexels-photo-67468.jpeg";

const BackArrowIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    width="24"
    height="24"
    style={{ marginRight: "4px" }}
  >
    <path d="M15 18l-6-6 6-6" />
  </svg>
);

const RestaurantDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [restaurant, setRestaurant] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(`https://zomato-clone-t5zc.onrender.com/restaurants/${id}`)
      .then((response) => {
        setRestaurant(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("There was an error fetching the restaurant!", error);
        setError(error);
        setLoading(false);
      });
  }, [id]);

  const handleBackClick = () => {
    navigate(`/?page=${searchParams.get("page") || 1}`);
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (error)
    return <div className="error">Error loading restaurant details.</div>;

  return (
    <div className="restaurant-detail">
      <button className="back-button" onClick={handleBackClick}>
        <BackArrowIcon />
      </button>
      <div className="header">
        <img
          src={restaurant.featured_image || defaultImage}
          alt={restaurant.name}
          className="featured-image"
        />
      </div>
      <div className="details-container">
        <div className="restaurant-info">
          <h1 className="restaurant-name">{restaurant.name}</h1>
          <div className="info-item">
            <strong>Address:</strong>
            <p>{restaurant.location.address}</p>
          </div>
          <div className="info-item">
            <strong>Cuisines:</strong>
            <p>{restaurant.cuisines}</p>
          </div>
          <div className="info-item">
            <strong>Average Cost for Two:</strong>
            <p>
              {restaurant.currency}
              {restaurant.average_cost_for_two}
            </p>
          </div>
          <div className="info-item">
            <strong>Rating:</strong>
            <p>
              {restaurant.user_rating.aggregate_rating} (
              {restaurant.user_rating.rating_text})
              <span className="star-rating">&#9733;</span>
            </p>
          </div>
          <div className="info-item">
            <strong>Opening Hours:</strong>
            <p>{restaurant.opening_hours || "Not Available"}</p>
          </div>
          <div className="info-item">
            <strong>Phone Number:</strong>
            <p>{restaurant.phone_number || "Not Available"}</p>
          </div>
        </div>
        <div className="extras-container">
          <div className="info-item">
            {restaurant.url ? (
              <a
                href={restaurant.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                <button className="action-button">Visit Zomato</button>
              </a>
            ) : (
              <p>Not Available</p>
            )}
          </div>
          <div className="info-item">
            {restaurant.photos_url ? (
              <a
                href={restaurant.photos_url}
                target="_blank"
                rel="noopener noreferrer"
              >
                <button className="action-button">View Photos</button>
              </a>
            ) : (
              <p>Not Available</p>
            )}
          </div>
          <div className="info-item">
            {restaurant.menu_url ? (
              <a
                href={restaurant.menu_url}
                target="_blank"
                rel="noopener noreferrer"
              >
                <button className="action-button">View Menu </button>
              </a>
            ) : (
              <p>Not Available</p>
            )}
          </div>
          <div className="info-item">
            {restaurant.events_url ? (
              <a
                href={restaurant.events_url}
                target="_blank"
                rel="noopener noreferrer"
              >
                <button className="action-button">View Events</button>
              </a>
            ) : (
              <p>Not Available</p>
            )}
          </div>
          <div className="info-item">
            <strong>Book a Table:</strong>
          </div>
          <div className="info-item">
            {restaurant.book_url ? (
              <a
                href={restaurant.book_url}
                target="_blank"
                rel="noopener noreferrer"
              >
                <button className="action-button">Book Now</button>
              </a>
            ) : (
              <p>Not Available</p>
            )}
          </div>
        </div>
        <div className="reviews-container">
          <h2>Reviews:</h2>
          {restaurant.reviews && restaurant.reviews.length > 0 ? (
            restaurant.reviews.map((review, index) => (
              <div key={index} className="review">
                <p>
                  <strong>{review.reviewer_name}:</strong> {review.text}
                </p>
                <p>
                  <strong>Rating:</strong> {review.rating}
                </p>
              </div>
            ))
          ) : (
            <p>No reviews available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default RestaurantDetail;
