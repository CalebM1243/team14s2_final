// RecipePage.jsx
import React, { useState } from "react";
import { Button, Row, Col, Form, Modal } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";

const goBack = () => {
  if (window.history.length > 1) {
    window.history.back();
  } else {
    window.location.href = "/";
  }
};

const RecipePage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const recipes = location.state.recipe;

  const [editModal, setEditModal] = useState(false);
  const [updatedRecipe, setUpdatedRecipe] = useState({ ...recipes });

  if (!recipes) {
    return <div>Recipe not found</div>;
  }

  const handleEditClick = () => {
    setEditModal(true);
  };

  const handleSaveChanges = async () => {
    try {
      const response = await fetch(`http://localhost:8081/api/recipes/${recipes.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedRecipe),
      });

      if (!response.ok) {
        throw new Error("Failed to update recipe");
      }

      const data = await response.json();
      alert("Recipe updated successfully!");
      setEditModal(false);
      navigate("/home"); // Redirect to home after successful edit
    } catch (error) {
      console.error("Error updating recipe:", error);
      alert("An error occurred while updating the recipe. Please try again.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedRecipe({ ...updatedRecipe, [name]: value });
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
          <img src={recipes.image} alt={recipes.title} className="img-fluid recipe-image" />
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
                <li key={index} className="ingredient-item">
                  {ingredient}
                </li>
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
                <li key={index} className="instruction-item">
                  {instruction}
                </li>
              ))}
            </ol>
          </div>
        </Col>
      </Row>

      {/* Buttons Section */}
      <div className="d-flex justify-content-between">
        <Button
          variant="secondary"
          size="lg"
          onClick={goBack}
        >
          Go Back
        </Button>
        <Button
          variant="warning"
          size="lg"
          onClick={handleEditClick}
        >
          <i className="bi bi-pencil"></i> Edit
        </Button>
      </div>

      {/* Edit Modal */}
      <Modal show={editModal} onHide={() => setEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Recipe</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formTitle">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                name="title"
                value={updatedRecipe.title}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="description"
                value={updatedRecipe.description}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formIngredients">
              <Form.Label>Ingredients</Form.Label>
              <Form.Control
                type="text"
                name="ingredients"
                value={updatedRecipe.ingredients.join(", ")}
                onChange={(e) =>
                  setUpdatedRecipe({
                    ...updatedRecipe,
                    ingredients: e.target.value.split(",").map((item) => item.trim()),
                  })
                }
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formDirections">
              <Form.Label>Directions</Form.Label>
              <Form.Control
                type="text"
                name="directions"
                value={updatedRecipe.directions.join(", ")}
                onChange={(e) =>
                  setUpdatedRecipe({
                    ...updatedRecipe,
                    directions: e.target.value.split(",").map((item) => item.trim()),
                  })
                }
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formImage">
              <Form.Label>Image URL</Form.Label>
              <Form.Control
                type="url"
                name="image"
                value={updatedRecipe.image}
                onChange={handleChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setEditModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSaveChanges}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default RecipePage;
