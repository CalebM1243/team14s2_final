// src/components/ListRecipes.js
import React, { useState, useEffect } from 'react';
import { Card, Button, Row, Col, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const ListRecipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await fetch('/api/recipes'); // Replace with your actual API endpoint
        const data = await response.json();
        setRecipes(data);
      } catch (error) {
        console.error('Error fetching recipes:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, []);

  if (loading) {
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" variant="primary" />
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Recipes</h1>
      <Row>
        {recipes.length > 0 ? (
          recipes.map((recipe) => (
            <Col md={6} lg={4} key={recipe.id} className="mb-4">
              <Card>
                <Card.Img variant="top" src={recipe.image} alt={recipe.title} style={{ height: '200px', objectFit: 'cover' }} />
                <Card.Body>
                  <Card.Title>{recipe.title}</Card.Title>
                  <Card.Text>{recipe.description}</Card.Text>
                  <Link 
                    to={{
                      pathname: `/recipe/${recipe.id}`,
                      state: { recipe }  // Pass recipe data here
                    }}
                  >
                    <Button variant="primary">View Recipe</Button>
                  </Link>
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          <div className="text-center">
            <p>No recipes found.</p>
          </div>
        )}
      </Row>
    </div>
  );
};

export default ListRecipes;
