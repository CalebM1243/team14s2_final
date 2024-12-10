// src/components/RecipePage.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Card, Button } from 'react-bootstrap';

const RecipePage = () => {
  // State to store the recipe data
  const [recipe, setRecipe] = useState(null);
  
  // Get the recipe ID from the URL params
  const { id } = useParams();

  useEffect(() => {
    // Fetch the recipe data based on the ID
    const fetchRecipe = async () => {
      // Replace with your actual API call or mock data
      const response = await fetch(`/api/recipes/${id}`);
      const data = await response.json();
      setRecipe(data);
    };

    fetchRecipe();
  }, [id]);

  if (!recipe) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mt-5">
      <Card>
        <Card.Img variant="top" src={recipe.image} alt={recipe.title} style={{ height: '400px', objectFit: 'cover' }} />
        <Card.Body>
          <Card.Title>{recipe.title}</Card.Title>
          <Card.Text>{recipe.description}</Card.Text>

          <Card.Text><strong>Ingredients:</strong></Card.Text>
          <ul>
            {recipe.ingredients.map((ingredient, index) => (
              <li key={index}>{ingredient}</li>
            ))}
          </ul>

          <Card.Text><strong>Instructions:</strong></Card.Text>
          <ol>
            {recipe.instructions.map((step, index) => (
              <li key={index}>{step}</li>
            ))}
          </ol>

          <Button variant="primary">Make {recipe.title}</Button>
        </Card.Body>
      </Card>
    </div>
  );
};

export default RecipePage;
