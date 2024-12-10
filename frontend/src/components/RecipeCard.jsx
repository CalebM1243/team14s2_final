import React from 'react';
import { Card, Row, Col, Button } from 'react-bootstrap';

const RecipeCard = ({ recipe }) => {
  const { id, title, description, image } = recipe;

  return (
    <Col md={6} className="mb-3">
      <Card className="h-100">
        <Card.Img 
            variant="top" 
            src={image}
            alt={description}
            style={{ height: '300px', objectFit: 'cover' }} 
        />
        <Card.Body>
          <Card.Title>{title}</Card.Title>
          <Card.Text>{description}</Card.Text>
          <Button variant="primary" href={`recipe.html?id=${id}`}>
            Make {title}
          </Button>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default RecipeCard;
