import React from 'react';
import { Container, Row } from 'react-bootstrap';
import RecipeCard from './RecipeCard';

const RecipeList = ({ recipes }) => {
  return (
    <main>
      <section>
        <h1 className="text-center title">Recipes</h1>
      </section>
      <div className="album py-5 bg-body-tertiary">
        <Container>
          <Row>
            {recipes.map((recipe, index) => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
          </Row>
        </Container>
      </div>
    </main>
  );
};

export default RecipeList;
