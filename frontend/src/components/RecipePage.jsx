import React from 'react';
import { Button, Row, Col } from 'react-bootstrap';
import '../css/RecipePage.css'; // For custom styles
const goBack = () => {
  if (window.history.length > 1) {
    window.history.back();
  } else {
    // Navigate to a default page or home
    window.location.href = '/';
  }
};

const RecipePage = ({ recipes, setActivePage }) => {
  if (!recipes) {
    return <div>Recipe not found</div>;  // In case no recipe is passed or error occurs
  }

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

      {/* Go Back Button */}
      <Button
        variant="secondary"
        size="lg"
        style={{ marginBottom: '20px', marginTop: '10px', display: 'block', marginLeft: 'auto', marginRight: 'auto' }}
        onClick={() => goBack()}
      >
        Go Back
      </Button>
    </div>
  );
};

export default RecipePage;
