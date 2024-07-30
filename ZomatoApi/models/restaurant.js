const mongoose = require("mongoose");

const restaurantSchema = new mongoose.Schema({
  id: String,
  name: String,
  url: String,
  location: {
    address: String,
    locality: String,
    city: String,
    city_id: Number,
    latitude: String,
    longitude: String,
    zipcode: String,
    country_id: Number,
    locality_verbose: String,
  },
  switch_to_order_menu: Number,
  cuisines: String,
  average_cost_for_two: Number,
  price_range: Number,
  currency: String,
  offers: Array,
  thumb: String,
  user_rating: {
    aggregate_rating: String,
    rating_text: String,
    rating_color: String,
    votes: String,
  },
  photos_url: String,
  menu_url: String,
  featured_image: String,
  has_online_delivery: Number,
  is_delivering_now: Number,
  deeplink: String,
  has_table_booking: Number,
  events_url: String,
  establishment_types: Array,
});

const Restaurant = mongoose.model("Restaurant", restaurantSchema);

module.exports = Restaurant;
