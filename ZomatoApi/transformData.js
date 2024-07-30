const fs = require("fs");
const path = require("path");

const jsonFiles = ["file5.json"];

const loadAndProcessFile = (filePath) => {
  const rawData = fs.readFileSync(filePath);
  const data = JSON.parse(rawData);

  let restaurants = [];
  data.forEach((entry) => {
    if (entry.restaurants && Array.isArray(entry.restaurants)) {
      entry.restaurants.forEach((restaurantEntry) => {
        if (restaurantEntry.restaurant) {
          restaurants.push(restaurantEntry.restaurant);
        }
      });
    }
  });

  return restaurants;
};

let allRestaurants = [];
jsonFiles.forEach((file) => {
  const filePath = path.join(__dirname, file);
  const restaurants = loadAndProcessFile(filePath);
  allRestaurants = allRestaurants.concat(restaurants);
});

const outputFilePath = path.join(__dirname, "flattened_restaurants5.json");
fs.writeFileSync(outputFilePath, JSON.stringify(allRestaurants, null, 4));

console.log(`Transformed data has been saved to ${outputFilePath}`);
