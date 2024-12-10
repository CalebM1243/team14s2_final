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

const connectToDB = async () => {
  if (!db) {
    await client.connect();
    db = client.db(dbName);
    console.log("Connected to MongoDB");
  }
};

// CRUD Methods for Recipes

app.get("/", (req, res) => {
  res.send("Welcome to the server. Use /listRecipes or other endpoints.");
});

// List recipes
app.get("/listRecipes", async (req, res) => {
  try {
    await connectToDB(); // Ensure MongoDB connection
    const recipes = await db.collection("recipe").find({}).toArray();
    console.log("Recipes fetched:", recipes); // Log the results
    res.status(200).json(recipes);
  } catch (error) {
    console.error("Error in GET /listRecipes:", error);
    res.status(500).send({ error: "Internal Server Error" });
  }
});

// Add a new recipe
app.post("/api/recipes", async (req, res) => {
  try {
    await connectToDB();
    const newRecipe = req.body;

    if (!newRecipe || Object.keys(newRecipe).length === 0) {
      return res.status(400).json({ error: "No data provided" });
    }

    const result = await db.collection("recipe").insertOne(newRecipe); // Use 'recipe' collection
    console.log("Recipe added:", result); // Log the result
    res.status(201).json(result);
  } catch (error) {
    console.error("Error adding recipe:", error);
    res.status(500).json({ error: "Failed to add recipe" });
  }
});


// Update a recipe by ID
app.put("/api/recipes/:id", async (req, res) => {
  try {
    await connectToDB();
    const id = Number(req.params.id);
    const updatedRecipe = req.body;

    const result = await db
      .collection("recipes")
      .updateOne({ id: id }, { $set: updatedRecipe });

    res.status(200).json(result);
  } catch (error) {
    console.error("Error updating recipe:", error);
    res.status(500).json({ error: "Failed to update recipe" });
  }
});

// Delete a recipe by ID
app.delete("/api/recipes/:id", async (req, res) => {
  try {
    await connectToDB();
    const id = Number(req.params.id);

    const result = await db.collection("recipes").deleteOne({ id: id });
    res.status(200).json(result);
  } catch (error) {
    console.error("Error deleting recipe:", error);
    res.status(500).json({ error: "Failed to delete recipe" });
  }
});

// Start the server
app.listen(port, () => {
  console.log("App listening at http://%s:%s", host, port);
});
