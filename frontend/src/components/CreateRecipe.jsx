import React, { useState, useEffect } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const CreateRecipe = ({ recipes, setRecipes }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [directions, setDirections] = useState('');
  const [image, setImage] = useState('');
  const navigate = useNavigate();



    const handleSubmit = async (e) => {
        const newId = await recipes.reduce((maxId, recipe) => Math.max(maxId, recipe.id), 0) + 1;
        e.preventDefault();
        try {
            const newRecipe = {
                id: newId,
                title,
                description,
                image,
                ingredients: ingredients.split(',').map((item) => item.trim()),
                directions: directions.split(',').map((item) => item.trim()),
              };
          const response = await fetch('http://localhost:8081/api/recipes', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newRecipe),
          });
      
          if (!response.ok) throw new Error('Failed to create recipe');
      
          // Fetch the updated list
          const updatedRecipes = await fetch('http://localhost:8081/listRecipes').then(res => res.json());
          setRecipes(updatedRecipes);

          navigate('/home');
        } catch (error) {
          console.error('Error creating recipe:', error);
          alert('An error occurred while creating the recipe. Please try again.');
        }
    };
      
 

  return (
    <Container className="mt-5">
      <h1 className="text-center mb-4">Create a New Recipe</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formTitle">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter the recipe title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formDescription">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Enter a description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formIngredients">
          <Form.Label>Ingredients</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter ingredients separated by commas"
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formDirections">
          <Form.Label>Directions</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter directions separated by commas"
            value={directions}
            onChange={(e) => setDirections(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formImage">
          <Form.Label>Image URL</Form.Label>
          <Form.Control
            type="url"
            placeholder="Enter an image URL"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit" className="mt-3">
          Create Recipe
        </Button>
      </Form>
    </Container>
  );
};

export default CreateRecipe;
