const express = require("express");
const router = express.Router();
const Restaurant = require("../models/restaurant");
const Country = require("../models/country");

// Get List of Restaurants with Pagination, Filters, and Search
router.get("/", async (req, res) => {
  try {
    let {
      page = 1,
      limit = 9,
      countryCode,
      search,
      cost,
      cuisines,
    } = req.query;
    page = parseInt(page);
    limit = parseInt(limit);

    if (isNaN(page) || page <= 0) {
      page = 1;
    }

    if (isNaN(limit) || limit <= 0) {
      limit = 9;
    }

    const query = {};
    if (countryCode) {
      query["location.country_id"] = parseInt(countryCode);
    }
    if (search) {
      const regex = new RegExp(search, "i");
      query.$or = [{ name: regex }];
    }
    if (cost) {
      query["average_cost_for_two"] = { $lte: parseInt(cost) };
    }
    if (cuisines) {
      query["cuisines"] = { $regex: cuisines, $options: "i" };
    }

    const restaurants = await Restaurant.find(query)
      .limit(limit)
      .skip((page - 1) * limit)
      .exec();
    const totalRestaurants = await Restaurant.countDocuments(query);

    res.json({
      restaurants,
      currentPage: page,
      totalPages: Math.ceil(totalRestaurants / limit),
      totalRestaurants,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
// available costs
router.get("/cost-options", async (req, res) => {
  try {
    const costs = await Restaurant.distinct("average_cost_for_two");
    res.json(costs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get country options
router.get("/country-options", async (req, res) => {
  try {
    const countryOptions = await Country.find().sort({ name: 1 }); // Sort alphabetically
    res.json(countryOptions);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get available cuisines
router.get("/cuisine-options", async (req, res) => {
  const { country_id } = req.query;
  try {
    if (!country_id) {
      return res.status(400).json({ message: "Country ID is required" });
    }

    const cuisines = await Restaurant.distinct("cuisines", {
      "location.country_id": country_id,
    });
    res.json(cuisines);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get a specific restaurant by ID
router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id.trim();
    console.log(id);
    const restaurant = await Restaurant.findOne({ id: id });
    if (!restaurant) {
      return res.status(404).json({ message: "Restaurant not found" });
    }
    res.json(restaurant);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
