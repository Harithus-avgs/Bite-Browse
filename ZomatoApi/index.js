const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
require('dotenv').config();


const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors());

const restaurantRoutes = require("./routes/restaurants");
const countryRoutes = require("./routes/countries");
app.use("/restaurants", restaurantRoutes);
app.use("/countries", countryRoutes);

// MongoDB connection
const URI = process.env.MONGODB_URL;
mongoose
  .connect( "mongodb+srv://admin:root@cluster0.rxhohcp.mongodb.net/zomato?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong!" });
});

app.use((req, res, next) => {
  res.status(404).json({ message: "Route not found" });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${3000}`);
});
