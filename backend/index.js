const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { MongoClient } = require("mongodb");
const bcrypt = require("bcryptjs"); // Use bcrypt to hash passwords

const app = express();
app.use(cors());
app.use(bodyParser.json());

const port = "8081";
const host = "localhost";

// MongoDB configuration
const url = "mongodb://127.0.0.1:27017";
const dbName = "secoms319";
const client = new MongoClient(url);
let db;

const connectToDB = async () => {
  if (!db) {
    await client.connect();
    db = client.db(dbName);
    console.log("Connected to MongoDB");
  }
};

app.get("/", (req, res) => {
  res.send("Welcome to the server. Use /listRecipes or other endpoints.");
});

// CRUD Methods for Users

// List users (Note: Usually, you wouldn't expose all users in production)
app.get("/listUsers", async (req, res) => {
  try {
    await connectToDB(); // Ensure MongoDB connection
    const users = await db.collection("user").find({}).toArray(); // Fetch from the 'user' collection
    console.log("Users fetched:", users); // Log the results
    res.status(200).json(users);
  } catch (error) {
    console.error("Error in GET /listUsers:", error);
    res.status(500).send({ error: "Internal Server Error" });
  }
});

// Get a user by ID
app.get("/api/users/:id", async (req, res) => {
  try {
    await connectToDB();
    const id = req.params.id;

    // Fetch the user by ID
    const user = await db.collection("user").findOne({ _id: new MongoClient.ObjectId(id) }); // Corrected to 'user' collection

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching user by ID:", error);
    res.status(500).json({ error: "Failed to fetch user" });
  }
});

// Add a new user (Sign up)
app.post("/api/users", async (req, res) => {
  try {
    await connectToDB();
    const newUser = req.body;

    if (!newUser || !newUser.username || !newUser.password) {
      return res.status(400).json({ error: "Username and password are required" });
    }

    // Hash the password before storing it
    const hashedPassword = await bcrypt.hash(newUser.password, 10);
    newUser.password = hashedPassword;

    const result = await db.collection("user").insertOne(newUser); // Corrected to 'user' collection
    console.log("User added:", result); // Log the result
    res.status(201).json(result);
  } catch (error) {
    console.error("Error adding user:", error);
    res.status(500).json({ error: "Failed to add user" });
  }
});

// CRUD Methods for Recipes

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

// Get a recipe by ID
app.get("/api/recipes/:id", async (req, res) => {
  try {
    await connectToDB();
    const id = Number(req.params.id);
    
    // Fetch the recipe by ID
    const recipe = await db.collection("recipe").findOne({ id: id });

    if (!recipe) {
      return res.status(404).json({ error: "Recipe not found" });
    }

    res.status(200).json(recipe);
  } catch (error) {
    console.error("Error fetching recipe by ID:", error);
    res.status(500).json({ error: "Failed to fetch recipe" });
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
