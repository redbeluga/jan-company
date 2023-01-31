import React from 'react';
import {List, ListItem, Button, Typography, Chip} from '@mui/material';
import Divider from './Divider';
import StarRating from './StarRating';
import { NavigateBefore } from '@mui/icons-material';

const RecipeInfo = ({recipe, changeRecipeRating, handleRenderedRecipeChange}) => {
  function returnBack() {
    handleRenderedRecipeChange(null)
  }

  function toTitleCase(str) {
    return str.toLowerCase().split(' ').map(function (word) {
      return (word.charAt(0).toUpperCase() + word.slice(1));
    }).join(' ');
  }

  let i = 1

  return (
    <div id="recipeInfoWrapper">
      <div id="recipeInfoContainer">
        <Button 
          variant='text'
          sx={{ color: 'grey', backgroundColor: 'white'}}
          id="returnBtn"
          startIcon={<NavigateBefore />}
          onClick={returnBack}
        >
            Back
        </Button>
        <div id="recipeTags">
          <Typography variant="subtitle2">
            TAGS:
            {
              recipe.Data.moods.map(m=>(
                <span key={"tag"+m} className="tags"><Chip label={toTitleCase(m)} size="small"/></span>
              ))
            }
          </Typography>
        </div> 
        <div id="recipeHeader">
          <Typography variant="h3">
            {recipe.name}
          </Typography>
        </div>
        <div id="recipeRating">
          <Typography variant="subtitle2" id="recipeRatingContainer">
            <div id="recipeRatingText">RECIPE RATING: </div>
            <div id="recipeRatingBeets">
              {recipe.Data.numberOfRatings == 0 ? 
                <StarRating recipe={recipe} currentRating={null} changeRecipeRating = {changeRecipeRating} interactable={true}/> :
                <StarRating recipe={recipe} currentRating={recipe.Data.totRating/recipe.Data.numberOfRatings} changeRecipeRating = {changeRecipeRating} interactable={true}/>
              }
            </div>
          </Typography>
        </div>
        <Divider width={"540px"} marginBottom={"50px"} marginLeft={"30px"} marginTop={"20px"}/>
        <div>
            <img src={recipe.img} id="recipeImage"></img>
        </div>
        <Divider width={"540px"} marginBottom={"45px"} marginLeft={"30px"} marginTop={"25px"}/>
        <div id="recipeIngredients">
          <Typography variant="h5">
            Ingredients
          </Typography>
          <List>
            {recipe.ingredients.map((ingredient) => (
              <Typography variant="subtitle1" key={ingredient}>
                <ListItem
                className="ingredient"
                sx={{
                  padding: 0,
                  listStyleType: "disc",
                  display: "list-item",
                  marginLeft: 2,
                }}
                >
                  <div className="ingredient">{ingredient}</div>
                </ListItem>
              </Typography>
            ))}
          </List>
        </div>
        <Divider width={"540px"} marginBottom={"35px"} marginLeft={"30px"} marginTop={"15px"}/>
        <div id="recipeInstructions">
          <Typography variant="h5">
            Directions
          </Typography>
          <Typography variant="subtitle1">
            {recipe.instructions.toString().split(/\r?\n/).map(instruction => (
              <div key={"instruction " + i} className="instruction"><b>{i++}. </b>{instruction.trim()}</div>
            ))}
          </Typography>
        </div>
        <Divider width={"540px"} marginBottom={"35px"} marginLeft={"30px"} marginTop={"20px"}/>
        <div id="recipeFooter">
          <img id="recipeFooterImg" src="https://i.ibb.co/GMM9rqQ/wavingbeet.png" alt="wavingbeet" border="0"></img>
        </div>
      </div>
    </div>
  )
}

export default RecipeInfo