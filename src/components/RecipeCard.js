import React, { useState } from "react";
import "./RecipeCard.css";

export default function RecipeCard(props) {
  function turnRecipeOn() {
    props.handleRenderedRecipeChange(props.recipeData)
  }
  return (
    <div className="card" onClick={turnRecipeOn}>
      <img className="card-image" src={props.image} style={{height: "200px", objectFit: "cover"}} alt="Logo" />
      <div className="card-header">
        <div className="card-title-group">
          <h5 className="card-title">{props.title}</h5>
          <div className="card-text">{props.time}</div>
        </div>
      </div>
    </div>
  );
}