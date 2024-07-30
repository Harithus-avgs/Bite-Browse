const { MongoClient } = require("mongodb");
const fs = require("fs");

const url =
  "mongodb+srv://admin:root@cluster0.rxhohcp.mongodb.net/?retryWrites=true&w=majority";
const dbName = "zomato";
const collectionName = "restaurants";
const jsonFilePath = "rated_restaurants.json";
const data = JSON.parse(fs.readFileSync(jsonFilePath, "utf8"));

async function uploadData() {
  const client = new MongoClient(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  try {
    await client.connect();
    console.log("Connected successfully to server");

    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    const result = await collection.insertMany(data);
    console.log(`${result.insertedCount} documents were inserted`);
  } catch (err) {
    console.error(err);
  } finally {
    await client.close();
  }
}

uploadData().catch(console.error);
