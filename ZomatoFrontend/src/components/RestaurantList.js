import React, { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import axios from "axios";
import "./RestaurantList.css";
import bannerImage from "./zomato_banner.jpg";
import zomatoLogo from "./zomato_text.png";

const defaultImage =
  "https://images.pexels.com/photos/67468/pexels-photo-67468.jpeg";

const StarIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="white"
    width="16"
    height="16"
    style={{ marginRight: "4px" }}
  >
    <path d="M12 17.27L18.18 21 16.54 13.97 22 9.24l-6.18-.53L12 2 8.18 8.71 2 9.24l5.46 4.73L5.82 21z" />
  </svg>
);

const RestaurantList = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [restaurants, setRestaurants] = useState([]);
  const [currentPage, setCurrentPage] = useState(
    parseInt(searchParams.get("page")) || 1
  );
  const [totalPages, setTotalPages] = useState(1);
  const [country, setCountry] = useState(searchParams.get("country") || "");
  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [cuisineOptions, setCuisineOptions] = useState([]);
  const [selectedCost, setSelectedCost] = useState("");
  const [selectedCuisine, setSelectedCuisine] = useState("");
  const [showCostModal, setShowCostModal] = useState(false);
  const [showCuisineModal, setShowCuisineModal] = useState(false);
  const [countryCode, setCountryCode] = useState("");

  useEffect(() => {
    const fetchCountryCode = async () => {
      if (country) {
        try {
          const response = await axios.get(
            `https://zomato-clone-t5zc.onrender.com/countries/${country}`
          );
          setCountryCode(response.data.code);
          console.log(response.data.code);
        } catch (error) {
          console.error("There was an error fetching the country code!", error);
        }
      } else {
        setCountryCode("");
      }
    };

    fetchCountryCode();
  }, [country]);

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const cuisineResponse = await axios.get(
          `https://zomato-clone-t5zc.onrender.com/restaurants/cuisine-options?country_id=${countryCode}`
        );
        setCuisineOptions(cuisineResponse.data);
      } catch (error) {
        console.error("There was an error fetching the filter options!", error);
      }
    };

    fetchOptions();
  }, [countryCode]);

  useEffect(() => {
    const page = parseInt(searchParams.get("page")) || 1;
    setCurrentPage(page);

    const queryParams = new URLSearchParams({
      page,
      limit: 9,
      search,
      cost: selectedCost,
      cuisines: selectedCuisine,
      countryCode,
    });

    axios
      .get(`https://zomato-clone-t5zc.onrender.com/restaurants?${queryParams.toString()}`)
      .then((response) => {
        setRestaurants(response.data.restaurants);
        setTotalPages(response.data.totalPages);
      })
      .catch((error) => {
        console.error("There was an error fetching the restaurants!", error);
      });
  }, [
    searchParams,
    country,
    search,
    selectedCost,
    selectedCuisine,
    countryCode,
  ]);

  const handlePageChange = (page) => {
    setSearchParams({
      page,
      country,
      search,
      cost: selectedCost,
      cuisines: selectedCuisine,
    });
    setCurrentPage(page);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      handlePageChange(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      handlePageChange(currentPage - 1);
    }
  };

  return (
    <div className="restaurant-list-container">
      <div
        className="banner-container"
        style={{ backgroundImage: `url(${bannerImage})` }}
      >
        <img src={zomatoLogo} alt="Zomato Logo" className="zomato-logo" />
        <div className="banner-text">
          Discover the best food & drinks in {country || "India"}
        </div>
        <div className="search-container">
          <select
            name="country"
            className="location-term"
            onChange={(e) => {setCountry(e.target.value);
            }}
          >
            <option value="">Select Country</option>
            <option value="India">India</option>
            <option value="Australia">Australia</option>
            <option value="Brazil">Brazil</option>
            <option value="Canada">Canada</option>
            <option value="Indonesia">Indonesia</option>
            <option value="New Zealand">New Zealand</option>
            <option value="Phillipines">Phillipines</option>
            <option value="Qatar">Qatar</option>
            <option value="Singapore">Singapore</option>
            <option value="South Africa">South Africa</option>
            <option value="Sri Lanka">Sri Lanka</option>
            <option value="Turkey">Turkey</option>
            <option value="UAE">UAE</option>
            <option value="United Kingdom">United Kingdom</option>
            <option value="United States">United States</option>
          </select>
          <input
            type="text"
            placeholder="Search for  a restaurant"
            className="search-term"
            onChange={(e) => {setSearch(e.target.value);
              
            }}
          />
        </div>
        <div className="filter-buttons">
          <button
            className="filter-button"
            onClick={() => setShowCostModal(true)}
          >
            Filter by Cost
          </button>
          <button
            className="filter-button"
            onClick={() => setShowCuisineModal(true)}
          >
            Filter by Cuisine
          </button>
        </div>
      </div>

      {/* Cost Modal */}
      {showCostModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Select Cost</h3>
            <select
              onChange={(e) => {
                setSelectedCost(e.target.value);

                setShowCostModal(false);
              }}
              defaultValue={selectedCost}
            >
              <option value="1000000000000">Select Cost</option>
              <option value="100">&lt;100</option>
              <option value="200">&lt;200</option>
              <option value="500">&lt;500</option>
              <option value="1000">&lt;1000</option>
              <option value="2000">&lt;2000</option>
              <option value="5000">&lt;5000</option>
              <option value="10000">&lt;10000</option>
              <option value="20000">&lt;20000</option>
              <option value="50000">&lt;50000</option>
              {/* {costOptions.map((option) => (
                <option key={option} value={option || "100000000000"}>{option || 'None'}</option>
              ))} */}
            </select>
            <button
              className="modal-close"
              onClick={() => setShowCostModal(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Cuisine Modal */}
      {showCuisineModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Select Cuisine</h3>
            <select
              onChange={(e) => {
                setSelectedCuisine(e.target.value);

                setShowCuisineModal(false);
              }}
              defaultValue={selectedCuisine}
            >
              <option value="">Select Cuisine</option>
              {cuisineOptions.map((option) => (
                <option key={option} value={option}>
                  {option || "All"}
                </option>
              ))}
            </select>
            <button
              className="modal-close"
              onClick={() => setShowCuisineModal(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}

      <div className="restaurant-list">
        {restaurants.map((restaurant) => (
          <Link
            to={`/restaurants/${restaurant.id}?page=${currentPage}`}
            key={restaurant.id}
            className="restaurant-link"
          >
            <div className="restaurant-item">
              <img
                src={restaurant.thumb || defaultImage}
                alt={restaurant.name}
              />
              <div className="info">
                <div className="restaurant-header">
                  <h3 className="restaurant-name">{restaurant.name}</h3>
                  <span className="restaurant-rating">
                    {restaurant.user_rating.aggregate_rating}
                    <StarIcon />
                  </span>
                </div>
                <div className="restaurant-details">
                  <p className="location">{restaurant.location.address}</p>
                  <p className="average-cost">
                    {restaurant.currency}
                    {restaurant.average_cost_for_two} for two
                  </p>
                </div>
                <p className="cuisines">{restaurant.cuisines}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="pagination">
        <button onClick={handlePreviousPage} disabled={currentPage === 1}>
          Previous
        </button>
        {[...Array(totalPages).keys()]
          .slice(
            Math.max(0, currentPage - 3),
            Math.min(currentPage + 2, totalPages)
          )
          .map((page) => (
            <button
              key={page + 1}
              onClick={() => handlePageChange(page + 1)}
              className={currentPage === page + 1 ? "active" : ""}
            >
              {page + 1}
            </button>
          ))}
        <button onClick={handleNextPage} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
    </div>
  );
};

export default RestaurantList;
