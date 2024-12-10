const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { MongoClient } = require("mongodb");

const app = express();
app.use(cors());
app.use(bodyParser.json());

const port = "8081";
const host = "localhost";

// MongoDB configuration
const url = "mongodb://127.0.0.1:27017";
const dbName = "secoms3190";
const client = new MongoClient(url);
let db;

async function connectToDB() {
  if (!db) {
    await client.connect();
    db = client.db(dbName);
    console.log("Connected to MongoDB");
  }
}

// Endpoint to list robots
app.get("/listRobots", async (req, res) => {
  try {
    await connectToDB();
    console.log("Node connected successfully to GET MongoDB");

    const query = {};
    const results = await db
      .collection("robot")
      .find(query)
      .limit(100)
      .toArray();
    console.log(results);

    res.status(200).send(results);
  } catch (error) {
    console.error("Error in GET /listRobots:", error);
    res.status(500).send({ error: "Internal Server Error" });
  }
});

// Endpoint to add a new robot
app.post("/robot", async (req, res) => {
  try {
    await connectToDB();

    // Validate request body
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).send({ error: "Bad request: No data provided." });
    }

    const newDocument = {
      id: req.body.id,
      name: req.body.name,
      price: req.body.price,
      description: req.body.description,
      imageUrl: req.body.imageUrl,
    };

    console.log("New robot data:", newDocument);

    // Check for duplicate ID
    const existingDoc = await db
      .collection("robot")
      .findOne({ id: newDocument.id });
    if (existingDoc) {
      return res
        .status(409)
        .send({ error: "Conflict: A robot with this ID already exists." });
    }

    // Insert new document
    const result = await db.collection("robot").insertOne(newDocument);
    console.log("Insert result:", result);

    res.status(201).send(result);
  } catch (error) {
    console.error("Error in POST /robot:", error);
    res.status(500).send({ error: "Internal Server Error" });
  }
});

app.delete("/robot/:id", async (req, res) => {
  // read data from robot to delete to send it to frontend
  const robotDeleted = await db.collection("robot").findOne(query);
  
  try {
    // Read parameter id
    const id = Number(req.params.id);
    console.log("Robot to delete :", id);
    // Connect Mongodb
    await client.connect();
    // Delete by its id
    const query = { id: id };
    // Delete
    const results = await db.collection("robot").deleteOne(query);
    // Response to Client
    res.status(200);
    res.send(results);

    // Response to Client
    res.status(200);
    res.send(robotDeleted);
  } catch (error) {
    console.error("Error deleting robot:", error);
    res.status(500).send({ message: "Internal Server Error" });
  }
});

app.put("/robot/:id", async (req, res) => {
  // read data from robot to update to send to frontend
  const robotUpdated = await db.collection("robot").findOne(query);

  const id = Number(req.params.id); // Read parameter id
  console.log("Robot to Update :", id);
  await client.connect(); // Connect Mongodb
  const query = { id: id }; // Update by its id
  // Data for updating the document, typically comes from the request body
  console.log(req.body);
  const updateData = {
    $set: {
      name: req.body.name,
      price: req.body.price,
      description: req.body.description,
      imageUrl: req.body.imageUrl,
    },
  };
  // Add options if needed, for example { upsert: true } to create a document if it doesn't exist
  const options = {};
  const results = await db
    .collection("robot")
    .updateOne(query, updateData, options);
  res.status(200); // Response to Client
  res.send(results);

  // Response to Client
  res.status(200);
  res.send(robotUpdated);
});

// Start the server
app.listen(port, () => {
  console.log("App listening at http://%s:%s", host, port);
});
