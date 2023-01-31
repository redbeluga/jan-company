import React from 'react'
import RecipeCard from './RecipeCard'
import RecipeInfo from './RecipeInfo'
import { Typography } from '@mui/material'

const RecommendedRecipePicker = ({recommendedRecipes, searchedRecipes, getRecipeFromId, changeRecipeRating, renderedRecipe, handleRenderedRecipeChange}) => {
  return (
    <div id="recommendationWrapper">
      <div id="recommendationContainer">
        {searchedRecipes.length == 0 ? 
          <div>
            <Typography variant="h6">Search Results</Typography>
            <Typography variant="body1" style={{color: "grey"}}>Sorry there are no recipes that fits your search</Typography>
          </div>
          : 
          searchedRecipes[0] != -1 && renderedRecipe == null ? 
            <div>
              <Typography variant="h6">Search Results</Typography>
              <div className='recipeCardContainer'>
              {searchedRecipes.map(id => (
                <div key={"recipe" + id} className='recDiv'>
                  <RecipeCard
                    recipeData = {getRecipeFromId(id)}
                    image = {getRecipeFromId(id).img}
                    title = {getRecipeFromId(id).name}
                    time = {getRecipeFromId(id).timeToPrep}
                    ingredients = {getRecipeFromId(id).ingredients}
                    handleRenderedRecipeChange = {handleRenderedRecipeChange}
                  />
                </div>
              ))}
              </div>
            </div>
            : 
            <div>
              <Typography variant="h6">Recommendations</Typography>
              {
                recommendedRecipes[0] == -1 ?
                <div>No recipes at this time</div> : 
                <div className='recipeCardContainer'>
                  {recommendedRecipes.map(id => (
                    <div key={"recipe" + id} className='recDiv'>
                      <RecipeCard
                        recipeData = {getRecipeFromId(id)}
                        image = {getRecipeFromId(id).img}
                        title = {getRecipeFromId(id).name}
                        time = {getRecipeFromId(id).timeToPrep}
                        ingredients = {getRecipeFromId(id).ingredients}
                        handleRenderedRecipeChange = {handleRenderedRecipeChange}
                      />
                    </div>
                  ))}
                </div>
              }
            </div>
        }
        <div id="recipeCardFooter"></div>
        {(renderedRecipe != null) && <RecipeInfo handleRenderedRecipeChange={handleRenderedRecipeChange} recipe={renderedRecipe} changeRecipeRating = {changeRecipeRating}/>}
      </div>
    </div>
  )
}

export default RecommendedRecipePicker