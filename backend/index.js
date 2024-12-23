const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { MongoClient, ObjectId } = require("mongodb");

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

app.get("/", (req, res) => {
  res.send("Welcome to the server. Use /listRecipes or other endpoints.");
});



// CRUD Methods for Users

// List users (for admin/debug purposes, restrict in production)
app.get("/listUsers", async (req, res) => {
  try {
    await connectToDB();
    const users = await db.collection("user").find({}).toArray();
    res.status(200).json(users);
  } catch (error) {
    console.error("Error in GET /listUsers:", error);
    res.status(500).send({ error: "Internal Server Error" });
  }
});

// User login
app.post("/api/login", async (req, res) => {
  try {
    await connectToDB();
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ error: "Username and password are required" });
    }

    const user = await db.collection("user").findOne({ username });
    if (!user || user.password !== password) {
      return res.status(401).json({ error: "Invalid username or password" });
    }

    res.status(200).json({ message: "Login successful" });
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ error: "Login failed" });
  }
});

app.post("/api/users", async (req, res) => {
  try {
    await connectToDB();
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ error: "Username and password are required" });
    }

    const existingUser = await db.collection("user").findOne({ username });
    if (existingUser) {
      return res.status(400).json({ error: "Username already exists" });
    }

    const newUser = {
      username,
      password,
      recipes: [], // Initialize an empty recipes array
      ratings: []
    };

    const result = await db.collection("user").insertOne(newUser);
    res.status(201).json(result);
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ error: "Registration failed" });
  }
});



// CRUD Methods for Recipes

// List recipes
app.get("/listRecipes", async (req, res) => {
  try {
    await connectToDB();
    const recipes = await db.collection("recipe").find({}).toArray();
    res.status(200).json(recipes);
  } catch (error) {
    console.error("Error in GET /listRecipes:", error);
    res.status(500).send({ error: "Internal Server Error" });
  }
});

// // Get a recipe by ID
// app.get("/api/recipes/:id", async (req, res) => {
//   try {
//     await connectToDB();
//     const id = req.params.id;
//     const recipe = await db.collection("recipe").findOne({ _id: new MongoClient.ObjectId(id) });

//     if (!recipe) {
//       return res.status(404).json({ error: "Recipe not found" });
//     }

//     res.status(200).json(recipe);
//   } catch (error) {
//     console.error("Error fetching recipe by ID:", error);
//     res.status(500).json({ error: "Failed to fetch recipe" });
//   }
// });

// Add recipe to a user's collection
app.post("/api/recipes", async (req, res) => {
  try {
    await connectToDB();
    
    const newRecipe = req.body;
    
    // Generate a custom id for the new recipe, if needed
    
    // Insert the new recipe into the collection
    const result = await db.collection("recipe").insertOne({
      creator: newRecipe.creator,
      title: newRecipe.title,
      description: newRecipe.description,
      image: newRecipe.image,
      ingredients: newRecipe.ingredients,
      directions: newRecipe.directions,
      ratings: newRecipe.ratings,
    });

    res.status(201).json({ message: "Recipe created successfully" });
  } catch (error) {
    console.error("Error creating recipe:", error);
    res.status(500).json({ error: "Failed to create recipe" });
  }
});


// Update a recipe by ID
app.put("/api/recipes/:id", async (req, res) => {
  try {
    await connectToDB();
    const id = req.params.id;
    const updatedRecipe = req.body;

    // Prevent modifying the '_id' field in the update
    if (updatedRecipe._id) {
      delete updatedRecipe._id; // Remove the _id field if it exists in the request body
    }

    // Perform the update operation using the custom 'id' (not _id)
    const result = await db
      .collection("recipe")
      .updateOne({ _id: new ObjectId(id) }, { $set: updatedRecipe });

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
    const id = req.params.id;

    // Perform the delete operation using the _id field
    const result = await db.collection("recipe").deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      res.status(404).json({ message: "Recipe not found" });
    } else {
      res.status(200).json({ message: "Recipe deleted successfully" });
    }
  } catch (error) {
    console.error("Error deleting recipe:", error);
    res.status(500).json({ error: "Failed to delete recipe" });
  }
});



// Start the server
app.listen(port, () => {
  console.log("App listening at http://%s:%s", host, port);
});
