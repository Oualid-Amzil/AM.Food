import React from "react";

import Wrapper from "../components/Wrapper";
import "animate.css";
import "./AboutScreen.css";

const AboutScreen = () => {
  return (
    <Wrapper>
      <div className="about__content">
        <h1 className="animate__animated animate__fadeInDown">About Us</h1>
        <h2 className="animate__animated animate__fadeInUp">
          {" "}
          This web gets data from spoonacular api
        </h2>
        <p className="animate__animated animate__fadeInUp">
          Spoonacular’s knowledge engineers spent years crafting a complex food
          ontology, which allows to understand the relationships between
          ingredients, recipes, nutrition, allergens, and more.
        </p>
        <p className="animate__animated animate__fadeInUp">
          Spoonacular understands “nut free” muffins can’t contain pecans (even
          if the recipe doesn't mention “nuts” anywhere!) and it automatically
          determines that a recipe with Worcestershire sauce isn’t vegetarian
          (we’re looking at you, anchovies.)
        </p>
      </div>
    </Wrapper>
  );
};

export default AboutScreen;
