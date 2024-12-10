// src/components/RecipePage.js
import React from 'react';
import { useLocation } from 'react-router-dom';
import { Card, Button } from 'react-bootstrap';

const RecipePage = () => {
  const location = useLocation();
  const { recipe } = location.state || {}; // Retrieve passed recipe data

  if (!recipe) {
    return <div>Recipe not found</div>;  // In case no recipe is passed or error occurs
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
            {recipe.instructions.map((instruction, index) => (
              <li key={index}>{instruction}</li>
            ))}
          </ol>

          <Button variant="primary">Make {recipe.title}</Button>
        </Card.Body>
      </Card>
    </div>
  );
};

export default RecipePage;
