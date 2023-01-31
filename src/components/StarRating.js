import { useState } from "react";
import './StarRating.css'

const StarRating = ({currentRating, recipe, interactable, changeRecipeRating}) => {
  const [rating, setRating] = useState(currentRating);
  const [hover, setHover] = useState(0);

  function handleRatingChange(index){
    if(!interactable) return;
    changeRecipeRating(recipe.id, index, rating == null ? 0 : rating, rating == null ? 1 : 0)
    setRating(index)
  }

  return (
    <div className="star-rating">
      {[...Array(5)].map((star, index) => {
        index += 1;
        return (
          <button
            type="button"
            key={index}
            id={"transparent"}
            className={index <= (hover || rating) ? "on" : "off"}
            onClick={() => handleRatingChange(index)}
            onMouseEnter={() => setHover(interactable ? index : rating)}
            onMouseLeave={() => setHover(rating)}
          >
            <span><img src="https://i.ibb.co/7bTP9cg/beet-Rating.png" alt="beet-Rating" border="0" className="beetRating"></img></span>
          </button>
        );
      })}
    </div>
  );
};
export default StarRating