import React, { useState } from 'react';
import { Button, Modal, Form, Row, Col } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import { useUser } from '../UserContext';
import '../css/RecipePage.css';

const goBack = () => {
  if (window.history.length > 1) {
    window.history.back();
  } else {
    window.location.href = '/';
  }
};

const RecipePage = () => {
  const { username } = useUser();
  const location = useLocation();
  const navigate = useNavigate();
  const recipe = location.state.recipe;

  const [showEditModal, setShowEditModal] = useState(false);
  const [updatedRecipe, setUpdatedRecipe] = useState({ ...recipe });
  const [rating, setRating] = useState(0);

  if (!recipe) {
    return <div>Recipe not found</div>;
  }

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this recipe?')) {
      try {
        const response = await fetch(`http://localhost:8081/api/recipes/${recipe._id}`, {
          method: 'DELETE',
        });

        if (!response.ok) {
          throw new Error('Failed to delete recipe');
        }

        alert('Recipe deleted successfully.');
        navigate('/home');
      } catch (error) {
        console.error('Error deleting recipe:', error);
        alert('An error occurred while deleting the recipe.');
      }
    }
  };

  const handleEdit = async () => {
    try {
      const response = await fetch(`http://localhost:8081/api/recipes/${recipe._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedRecipe),
      });

      if (!response.ok) {
        throw new Error('Failed to update recipe');
      }

      alert('Recipe updated successfully.');
      setShowEditModal(false);
      navigate('/home');
    } catch (error) {
      console.error('Error updating recipe:', error);
      alert('An error occurred while updating the recipe.');
    }
  };

  const handleInputChange = (field, value) => {
    setUpdatedRecipe((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleRating = async () => {
    if (username === recipe.creator) {
      alert('You cannot rate your own recipe.');
      return;
    }

    const hasRated = recipe.ratings.some((r) => r.username === username);
    if (hasRated) {
      alert('You have already rated this recipe.');
      return;
    }
    if(rating > 10.0){
      alert("Enter a number from 1-10");
      return;
    }

    try {
      const newRating = { username, rating };
      const updatedRatings = [...recipe.ratings, newRating];
      const response = await fetch(`http://localhost:8081/api/recipes/${recipe._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...recipe, ratings: updatedRatings }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit rating');
      }

      alert('Rating submitted successfully.');
      recipe.ratings = updatedRatings;
    } catch (error) {
      console.error('Error submitting rating:', error);
      alert('An error occurred while submitting your rating.');
    }
  };

  const calculateAverageRating = () => {
    if (recipe.ratings.length === 0) return 'No ratings yet';
    const total = recipe.ratings.reduce((sum, r) => sum + r.rating, 0);
    return (total / recipe.ratings.length).toFixed(1);
  };

  return (
    <div className="container mt-5">
      {/* Title Section */}
      <Row className="mb-3">
        <Col>
          <h1 className="text-center text-primary">{recipe.title}</h1>
        </Col>
      </Row>

      {/* Recipe Creator */}
      <Row className="mb-2">
        <Col>
          <p className="text-center text-muted">Created by: {recipe.creator}</p>
        </Col>
      </Row>

      <Row className="mb-2">
        <Col>
          <p className="text-center text-warning">Average Rating: {calculateAverageRating()}</p>
        </Col>
      </Row>

      {/* Image and Description Section */}
      <Row className="mb-4">
        <Col md={6}>
          <img 
            src={recipe.image} 
            alt={recipe.title} 
            className="img-fluid recipe-image" 
          />
        </Col>
        <Col md={6}>
          <div className="description-box">
            <h3 className="mb-3">Description</h3>
            <p>{recipe.description}</p>
          </div>
        </Col>
      </Row>

      {/* Ingredients Section */}
      <Row className="mb-3">
        <Col>
          <div className="section-box">
            <h4>Ingredients:</h4>
            <ul className="list-unstyled">
              {recipe.ingredients.map((ingredient, index) => (
                <li key={index} className="ingredient-item">{ingredient}</li>
              ))}
            </ul>
          </div>
        </Col>

      {/* Instructions Section */}
        <Col>
          <div className="section-box">
            <h4>Instructions:</h4>
            <ol className="list-ordered">
              {recipe.directions.map((instruction, index) => (
                <li key={index} className="instruction-item">{instruction}</li>
              ))}
            </ol>
          </div>
        </Col>
      </Row>

      {/* Buttons Section */}
      <div className="d-flex justify-content-center mb-4">
        <Button
          variant="secondary"
          size="lg"
          className="me-3"
          onClick={goBack}
        >
          Go Back
        </Button>

        {username === recipe.creator && (
          <>
            <Button
              variant="danger"
              size="lg"
              className="me-3"
              onClick={handleDelete}
            >
              Delete
            </Button>

            <Button
              variant="primary"
              size="lg"
              onClick={() => setShowEditModal(true)}
            >
              Edit
            </Button>
          </>
        )}
        {username !== recipe.creator && !recipe.ratings.some((r) => r.username === username) && (
          <>
            <Form.Control
              type="number"
              min="1"
              max="10"
              step="0.1"
              className="me-3"
              style={{ width: '100px' }}
              value={rating}
              onChange={(e) => setRating(parseFloat(e.target.value))}
            />
            <Button
              variant="success"
              size="lg"
              onClick={handleRating}
            >
              Rate
            </Button>
          </>
        )}
      </div>

      {/* Edit Modal */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Recipe</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                value={updatedRecipe.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={updatedRecipe.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Ingredients</Form.Label>
              <Form.Control
                type="text"
                value={updatedRecipe.ingredients.join(', ')}
                onChange={(e) => handleInputChange('ingredients', e.target.value.split(',').map((item) => item.trim()))}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Directions</Form.Label>
              <Form.Control
                type="text"
                value={updatedRecipe.directions.join(', ')}
                onChange={(e) => handleInputChange('directions', e.target.value.split(',').map((item) => item.trim()))}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Image URL</Form.Label>
              <Form.Control
                type="text"
                value={updatedRecipe.image}
                onChange={(e) => handleInputChange('image', e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEditModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleEdit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default RecipePage;
