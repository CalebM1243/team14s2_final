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
import RecipePage from "./components/RecipePage";
function App() {
  const [activePage, setActivePage] = useState("home");
  const [recipes, setRecipes] = useState([]);
  
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
