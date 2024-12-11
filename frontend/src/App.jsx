import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import RecipeList from "./components/RecipeList";
import RecipePage from "./components/RecipePage";
function App() {
  const [activePage, setActivePage] = useState("home");
  const [recipes, setRecipes] = useState([]);
  
  return (
    <div>
      <Header setActivePage={setActivePage} />
      <main>
        {activePage === "home" && (<RecipeList recipes={recipes} setRecipes = {setRecipes} setActivePage={setActivePage}/>)}
        {activePage === "recipe" && (<RecipePage recipes={recipes} setActivePage={setActivePage}/>)}
      </main>
      <Footer/>
    </div>
  );
}

export default App;
