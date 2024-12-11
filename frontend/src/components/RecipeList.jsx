import React, { useState, useEffect } from 'react';
import { Card, Button, Row, Col, Spinner, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const ListRecipes = ({ recipes, setRecipes }) => {
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  useEffect((recipes) => {
    fetch("http://localhost:8081/listRecipes")
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setRecipes(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching recipes:", error);
      });
  }, []);

  const handleViewRecipe = (recipe) => {
    navigate("/recipe", { state: { recipe } }); 
  };
  

  const handleCreateRecipe = () => {
    navigate("/createRecipe");
  };

  const filteredRecipes = recipes.filter(recipe =>
    recipe.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" variant="primary" />
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="text-center">Recipes</h1>
        <Button variant="success" onClick={handleCreateRecipe}>+ Add Recipe</Button>
      </div>
      <Form.Group className="mb-4">
        <Form.Control
          type="text"
          placeholder="Search for a recipe..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </Form.Group>
      <Row>
        {filteredRecipes.length > 0 ? (
          filteredRecipes.map((recipe) => (
            <Col md={6} lg={4} key={recipe.id} className="mb-4">
              <Card>
                <Card.Img
                  variant="top"
                  src={recipe.image}
                  alt={recipe.title}
                  style={{ height: '200px', objectFit: 'cover' }}
                />
                <Card.Body>
                  <Card.Title>{recipe.title}</Card.Title>
                  <Card.Text>{recipe.description}</Card.Text>
                  <Button
                    variant="primary"
                    onClick={() => handleViewRecipe(recipe)}
                  >
                    View Recipe
                  </Button>
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
