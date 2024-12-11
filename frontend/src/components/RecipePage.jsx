import React from 'react';
import { Button, Row, Col } from 'react-bootstrap';
import '../css/RecipePage.css'; // For custom styles
import { useLocation, useNavigate } from "react-router-dom";

const goBack = () => {
  if (window.history.length > 1) {
    window.history.back();
  } else {
    window.location.href = '/';
  }
};

const RecipePage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const recipes = location.state?.recipe;

  if (!recipes) {
    return <div>Recipe not found</div>; // In case no recipe is passed or error occurs
  }

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this recipe? This action cannot be undone."
    );

    if (confirmDelete) {
      try {
        const response = await fetch(`http://localhost:8081/api/recipes/${recipes.id}`, {
          method: 'DELETE',
        });

        if (!response.ok) {
          throw new Error('Failed to delete recipe');
        }

        alert('Recipe deleted successfully.');
        navigate('/home'); // Redirect to the home page after deletion
      } catch (error) {
        console.error('Error deleting recipe:', error);
        alert('An error occurred while deleting the recipe. Please try again.');
      }
    }
  };

  return (
    <div className="container mt-5">
      {/* Title Section */}
      <Row className="mb-5">
        <Col>
          <h1 className="text-center text-primary">{recipes.title}</h1>
        </Col>
      </Row>

      {/* Image and Description Section */}
      <Row className="mb-4">
        <Col md={6}>
          <img 
            src={recipes.image} 
            alt={recipes.title} 
            className="img-fluid recipe-image" 
          />
        </Col>
        <Col md={6}>
          <div className="description-box">
            <h3 className="mb-3">Description</h3>
            <p>{recipes.description}</p>
          </div>
        </Col>
      </Row>

      {/* Ingredients Section */}
      <Row className="mb-4">
        <Col>
          <div className="section-box">
            <h4>Ingredients:</h4>
            <ul className="list-unstyled">
              {recipes.ingredients.map((ingredient, index) => (
                <li key={index} className="ingredient-item">{ingredient}</li>
              ))}
            </ul>
          </div>
        </Col>
      </Row>

      {/* Instructions Section */}
      <Row className="mb-5">
        <Col>
          <div className="section-box">
            <h4>Instructions:</h4>
            <ol className="list-ordered">
              {recipes.directions.map((instruction, index) => (
                <li key={index} className="instruction-item">{instruction}</li>
              ))}
            </ol>
          </div>
        </Col>
      </Row>

      {/* Buttons */}
      <div className="d-flex justify-content-between">
        <Button
          variant="secondary"
          size="lg"
          onClick={goBack}
        >
          Go Back
        </Button>
        <Button
          variant="danger"
          size="lg"
          onClick={handleDelete}
        >
          Delete Recipe
        </Button>
      </div>
    </div>
  );
};

export default RecipePage;
