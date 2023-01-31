import { React, useState, useEffect} from "react";
import RadioButtonGroup from "./components/RadioButtonGroup";
import RecommendedRecipePicker from "./components/RecommendedRecipePicker";
import { recipesData } from "./components/RecipeData";
import { moodsData } from "./components/MoodsData";
import Header from "./components/Header";
import "./styles.css"
import LoginCard from "./components/LoginCard";

function App() {
  useEffect(() => {
    initializeMoodsValue()
    initializeSimilarity()
    findRecommendations()
  })

  const [moods, setMoods] = useState(moodsData)
  const [recipes, setRecipes] = useState()
  const [recipeSimilarity, setSimilarity] = useState(new Map())
  const [searchedRecipes, setSearchedRecipes] = useState([-1])
  const [renderedRecipe, setRenderedRecipe] = useState(null)
  const [recommendedRecipes, setRecommendedRecipes] = useState([-1])
  const [login, setLogin] = useState(null)
  
  function handleLoginChange(login) {
    if(login != null){
      console.log("ch")
      setLogin(login)
    }
  }

  function initializeMoodsValue() {
    recipesData.forEach(recipe => {
      let moodsData = new Map()
      recipe.Data.moods.forEach(mood => {
        moodsData.set(mood, 1)
      })
      recipe.Data.moodsRating = moodsData
    })
    setRecipes(recipesData)
  }

  function handleRenderedRecipeChange(r) {
    setRenderedRecipe(r)
  }

  function changeRecipeRating(id, newRating, prevRating, addToTot){
    let curRecipe = recipes.filter(r=> r.id == id)[0]
    curRecipe.Data.totRating += newRating-prevRating
    curRecipe.Data.numberOfRatings += addToTot
    var allRecipes = recipes.filter(function(r) {
      return r.id !== id;
    });
    allRecipes.push(curRecipe)
    setRecipes(allRecipes)
  }

  function initializeSimilarity() {
    let m = recipeSimilarity
    recipesData.forEach(a =>
      {
        if(!m.has(a)) m.set(a.id, new Map())
        let aM = new Map()
        recipesData.forEach(b =>
          {
            const setB = new Set(b.Data.moods);
            aM.set(b.id, a.Data.moods.filter(value => setB.has(value)).length)
          })
        aM = new Map([...aM.entries()].sort((a, b) => b[1]-a[1]))
        m.set(a.id, aM);
      })
    setSimilarity(m)
  }

  function findRecommendations(){
    let ratedRecipes = new Map()
    let unRatedRecipes = []
    recipesData.forEach(r => (
      r.Data.numberOfRatings != 0 ? ratedRecipes.set(r.id, r.Data.totRating/r.Data.numberOfRatings) : unRatedRecipes.push(r.id)
    ))

    let foundRecipeId = recommendedRecipes
    foundRecipeId.length = 0
    if(ratedRecipes.length != 0){
      ratedRecipes = new Map([...ratedRecipes.entries()].sort((a, b) => b[1]-a[1]))
      let combinedRecipeSimilarity = new Map()
      for(let m of ratedRecipes){
        const mRS = recipeSimilarity.get(m[0])
        mRS.forEach((value, key) => {
          if(key != m[0] && unRatedRecipes.includes(key)) {
            if(!combinedRecipeSimilarity.has(key)) 
              combinedRecipeSimilarity.set(key, 0)
            combinedRecipeSimilarity.set(key, value*(m[1]) + combinedRecipeSimilarity.get(key))
          }
        })
      }
      combinedRecipeSimilarity = new Map([...combinedRecipeSimilarity.entries()].sort((a, b) => b[1]-a[1]))
      for(let  m of combinedRecipeSimilarity){
        if(m[1] == 0 || foundRecipeId.length == 3) break;
        foundRecipeId.push(m[0])
      }
    }
    for(let m of ratedRecipes){
      // if(foundRecipeId.length == 3) break
      if(foundRecipeId.includes(m[0])) continue
      foundRecipeId.push(m[0])
    }
    for(let m of unRatedRecipes){
      // if(foundRecipeId.length == 3) break
      if(foundRecipeId.includes(m)) continue
      foundRecipeId.push(m)
    }
    console.log(foundRecipeId)
    setRecommendedRecipes(foundRecipeId)
  }

  function searchRecipes(tags){
    if(tags.length == 0){
      setSearchedRecipes([-1])
      return
    }

    let RValues = new Map()
    recipes.forEach(r=>{
      let valid = true
      let value = 0
      
      tags.forEach(tag=>{
        if(!r.Data.moods.includes(tag)){
          valid = false
        }
        value+=r.Data.moodsRating.get(tag)
      })
      if(valid)
        RValues.set(r.id, value)
    })

    let foundRecipeId = []
    if(RValues.length != 0){
      RValues =  new Map([...RValues.entries()].sort((a, b) => b[1]-a[1]))
      for(let m of RValues){
        if(foundRecipeId.length == 3) break;
        foundRecipeId.push(m[0])
      }
    }
    setRenderedRecipe(null)
    setSearchedRecipes(foundRecipeId)
  }

  function getRecipeFromId(id){
    return recipes.filter(r => r.id == id)[0]
  }
  
  return (
    <div className="App">
      {
      login == null ?
        <div>
          <LoginCard handleLoginChange={handleLoginChange}/>
          <div id="triangle"></div>
          <div id="triangle2"></div>
          <div id="loginFooter"></div>
        </div> : 
        <div>
          <div id="sBG"></div>
          <div id="headerContainer">
            <Header loginName={login}/>
          </div>
          <div className="functionContainer">
            <RadioButtonGroup search={searchRecipes} options={moods}/>
            <RecommendedRecipePicker recommendedRecipes={recommendedRecipes} renderedRecipe={renderedRecipe} handleRenderedRecipeChange={handleRenderedRecipeChange} searchedRecipes={searchedRecipes} getRecipeFromId={getRecipeFromId} changeRecipeRating={changeRecipeRating}/>
          </div>
        </div>
      }
    </div>
  );
}

export default App;
