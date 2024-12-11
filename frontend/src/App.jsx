import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom"; // Import useLocation to check the current route
import Header from "./components/Header";
import Footer from "./components/Footer";
import RecipeList from "./components/RecipeList";
import Authors from "./components/Authors";
import Login from "./components/Login";
import Register from "./components/Register";

function App() {
  const [activePage, setActivePage] = useState("home");
  const arrayRecipes = [
    {
      id: 1,
      image:
        "https://images.unsplash.com/photo-1633337474564-1d9478ca4e2e?q=80&w=2971&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      title: "Spaghetti Carbonara",
      description:
        "A classic Italian pasta dish made with eggs, cheese, pancetta, and pepper.",
      ingredients: [
        "200g spaghetti",
        "100g pancetta",
        "2 large eggs",
        "50g Parmesan cheese",
        "Salt and pepper to taste",
      ],
      directions: [
        "Cook spaghetti in a large pot of salted boiling water until al dente.",
        "In a pan, cook the pancetta until crispy.",
        "Beat the eggs in a bowl and mix with grated Parmesan cheese.",
        "Drain the spaghetti and combine it with the pancetta.",
        "Remove the pan from heat and quickly stir in the egg mixture.",
        "Season with salt and pepper, then serve.",
      ],
    },
    {
      id: 2,
      image:
        "https://images.unsplash.com/photo-1582034986517-30d163aa1da9?q=80&w=2980&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      title: "Chicken Caesar Salad",
      description:
        "A fresh salad with crispy romaine lettuce, grilled chicken, croutons, and Caesar dressing.",
      ingredients: [
        "2 chicken breasts",
        "1 head of romaine lettuce",
        "50g croutons",
        "Caesar dressing",
        "Parmesan cheese for garnish",
      ],
      directions: [
        "Grill the chicken breasts until fully cooked, then slice into strips.",
        "Chop the romaine lettuce and place it in a large bowl.",
        "Add the sliced chicken, croutons, and Caesar dressing.",
        "Toss the salad to mix all ingredients.",
        "Garnish with Parmesan cheese and serve.",
      ],
    },
    {
      id: 3,
      image:
        "https://images.unsplash.com/photo-1640983743761-4f0e0204bc58?q=80&w=2971&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      title: "Beef Tacos",
      description:
        "Delicious beef tacos with seasoned ground beef, fresh toppings, and soft tortillas.",
      ingredients: [
        "500g ground beef",
        "1 packet taco seasoning",
        "8 small tortillas",
        "Lettuce, tomatoes, and cheese for toppings",
        "Sour cream and salsa",
      ],
      directions: [
        "Cook the ground beef in a skillet until browned.",
        "Add taco seasoning and simmer for a few minutes.",
        "Warm the tortillas in a separate pan or microwave.",
        "Assemble the tacos by adding beef and your favorite toppings.",
        "Serve with sour cream and salsa on the side.",
      ],
    },
    {
      id: 4,
      image:
        "https://images.unsplash.com/photo-1543826173-70651703c5a4?q=80&w=2979&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      title: "Vegetable Stir-Fry",
      description:
        "A quick and healthy stir-fry made with fresh vegetables and soy sauce.",
      ingredients: [
        "1 cup broccoli florets",
        "1 red bell pepper, sliced",
        "1 carrot, sliced",
        "2 tablespoons soy sauce",
        "1 tablespoon olive oil",
      ],
      directions: [
        "Heat olive oil in a large pan or wok.",
        "Add the broccoli, bell pepper, and carrot to the pan.",
        "Stir-fry the vegetables for about 5-7 minutes.",
        "Add soy sauce and cook for another 2 minutes.",
        "Serve hot with rice or noodles.",
      ],
    },
    {
      id: 5,
      image:
        "https://images.unsplash.com/photo-1573821663912-6df460f9c684?q=80&w=3174&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      title: "Margherita Pizza",
      description:
        "A simple and classic pizza with tomato sauce, mozzarella, and fresh basil.",
      ingredients: [
        "1 pizza dough",
        "1/2 cup tomato sauce",
        "200g mozzarella cheese, sliced",
        "Fresh basil leaves",
        "Olive oil for drizzling",
      ],
      directions: [
        "Preheat the oven to 220°C (430°F).",
        "Roll out the pizza dough on a floured surface.",
        "Spread tomato sauce evenly on the dough.",
        "Top with mozzarella slices and fresh basil.",
        "Drizzle with olive oil and bake for 12-15 minutes.",
      ],
    },
    {
      id: 6,
      image:
        "https://images.unsplash.com/photo-1619592982904-ef0a0da5b7e6?q=80&w=2970&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      title: "Blueberry Pancakes",
      description:
        "Fluffy pancakes loaded with fresh blueberries, perfect for breakfast.",
      ingredients: [
        "1 cup flour",
        "2 tablespoons sugar",
        "1 tablespoon baking powder",
        "1/2 cup blueberries",
        "1 cup milk",
      ],
      directions: [
        "In a bowl, mix flour, sugar, and baking powder.",
        "Add milk to the dry ingredients and stir to combine.",
        "Gently fold in the blueberries.",
        "Heat a pan and pour small amounts of batter to form pancakes.",
        "Cook until bubbles form on the surface, then flip and cook the other side.",
      ],
    },
  ];

  const location = useLocation(); // Get the current route location

  // Conditionally render Header only if not on the login or register pages
  const shouldDisplayHeader =
    location.pathname !== "/register" && location.pathname !== "/login";

  return (
    <div>
      {shouldDisplayHeader && <Header setActivePage={setActivePage} />}{" "}
      {/* Conditionally render Header */}
      <main>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<RecipeList recipes={arrayRecipes} />} />
          <Route path="/authors" element={<Authors />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default function AppWrapper() {
  return (
    <Router>
      {" "}
      {/* Ensure the Router wraps the entire App */}
      <App />
    </Router>
  );
}
