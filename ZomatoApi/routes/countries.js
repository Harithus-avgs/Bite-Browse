const express = require("express");
const router = express.Router();
const Country = require("../models/country");

router.get("/:name", async (req, res) => {
  const countryName = req.params.name;
  console.log(countryName);
  try {
    const country = await Country.findOne({ country: countryName });
    console.log(`Found country: ${JSON.stringify(country)}`);
    if (!country) {
      return res.status(404).json({ message: "country not found" });
    }
    const code = country.code;
    if (code === undefined) {
      console.log("code not found");
    }

    res.json({ code });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
