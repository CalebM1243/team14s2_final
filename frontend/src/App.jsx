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
import RecipePage from "./components/RecipePage";
import CreateRecipe from "./components/CreateRecipe";
import ProfilePage from "./components/ProfilePage";
function App() {
  const [activePage, setActivePage] = useState("home");
  const [recipes, setRecipes] = useState([]);
  const location = useLocation(); // Get the current route location

  // Conditionally render Header only if not on the login or register pages
  const shouldDisplayHeader =
    location.pathname !== "/register" && location.pathname !== "/login" && location.pathname !== "/";

  return (
    <div>
      {shouldDisplayHeader && <Header setActivePage={setActivePage} />}{" "}
      {/* Conditionally render Header */}
      <main>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<RecipeList recipes={recipes} setRecipes={setRecipes} />} />
          <Route path="/recipe" element={<RecipePage recipes={recipes} setRecipes = {setRecipes}/>}/>
          <Route path="/authors" element={<Authors />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/createRecipe" element={<CreateRecipe  recipes={recipes} setRecipes={setRecipes}/>}/>
          <Route path="/profile" element={<ProfilePage recipes={recipes}/>}/>
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