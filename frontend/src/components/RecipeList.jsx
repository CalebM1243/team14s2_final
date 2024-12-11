import React, { useState, useEffect } from 'react';
import { Card, Button, Row, Col, Spinner } from 'react-bootstrap';

const ListRecipes = ({recipes,setRecipes, setActivePage}) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:8081/listRecipes")
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setRecipes(data); // Assuming you're storing the recipes in state
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching recipes:", error);
      });
  }, []);
  
  const handleViewRecipe = (recipe) => {
    // Navigate to the recipe page by updating window.location

    setRecipes(recipe);
    setActivePage("recipe");
  };

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
      {Array.isArray(recipes) && recipes.length > 0 ? (
        recipes.map((recipe) => {
          return (
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
                    onClick={() => handleViewRecipe(recipe)}  // Programmatically navigate
                  >
                    View Recipe
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          );
        })
      ) : (
        <div className="text-center">
          <p>No recipes found.</p>
        </div>
      )}
    </Row>
  </div>
);

}
export default ListRecipes;
