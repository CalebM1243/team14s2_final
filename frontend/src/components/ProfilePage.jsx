import React from 'react';
import { useUser } from '../UserContext';
import { Card, Row, Col, Container } from 'react-bootstrap';
import '../css/ProfilePage.css';

const ProfilePage = ({ recipes }) => {
  const { username } = useUser();

  // Filter recipes by the current user's username
  const userRecipes = recipes.filter(recipe => recipe.creator === username);

  // Calculate the average rating for all the user's recipes
  const calculateAverageRating = () => {
    const ratedRecipes = userRecipes.filter(recipe => recipe.ratings.length > 0);
    if (ratedRecipes.length === 0) return 'No recipes with ratings yet';

    const totalRatings = ratedRecipes.reduce((acc, recipe) => {
      const recipeAverage = recipe.ratings.reduce((sum, r) => sum + r.rating, 0) / recipe.ratings.length;
      return acc + recipeAverage;
    }, 0);

    return (totalRatings / ratedRecipes.length).toFixed(1);
  };

  return (
    <Container className="mt-5">
      {/* Profile Header */}
      <Row className="mb-4">
        <Col className="text-center">
          <h1 className="profile-username">{username}</h1>
        </Col>
      </Row>
      <Row className="mb-4">
        <Col className="text-center">
            <h2 className="profile-average-rating">Average Recipe Rating: {calculateAverageRating()}</h2>
        </Col>
      </Row>

      {/* User Recipes */}
      <Row>
        {userRecipes.map((recipe, index) => (
          <Col md={4} key={index} className="mb-4">
            <Card>
              <Card.Img variant="top" src={recipe.image} alt={recipe.title} />
              <Card.Body>
                <Card.Title>{recipe.title}</Card.Title>
                <Card.Text>{recipe.description}</Card.Text>
                <Card.Text>
                  <strong>Average Rating:</strong>{' '}
                  {recipe.ratings.length > 0
                    ? (recipe.ratings.reduce((sum, r) => sum + r.rating, 0) / recipe.ratings.length).toFixed(1)
                    : 'No ratings yet'}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default ProfilePage;
