import React, { useState } from 'react';
import { Checkbox, FormGroup, FormControlLabel, Typography } from '@mui/material';


function RadioButtonGroup({options, search}) {
  const [selectedOption, setSelectedOption] = useState(new Map());

  const handleChange = (e) => {
    const { value } = e.target;
    if (selectedOption.has(value)) {
        setSelectedOption(new Map(selectedOption.set(value, !selectedOption.get(value))));
    } else {
      setSelectedOption(new Map(selectedOption.set(value, true)));
    }
    searchRecipes()
  }

  function searchRecipes(){
    let tags = []
    for (let [key, value] of selectedOption) {
      if(value){
        tags.push(key)
      }
    }
    console.log(tags)
    search(tags)
  }

  function toTitleCase(str) {
    return str.toLowerCase().split(' ').map(function (word) {
      return (word.charAt(0).toUpperCase() + word.slice(1));
    }).join(' ');
  }
  
  return (
    <div id="searchContainer">
      <div id='sFG'>
        <div id="mood"></div>
        <Typography id="moodText" variant="h6"><b>Tags</b></Typography>
        <FormGroup id="checkListContainer">
        {options.map(option => (
          <div key={option} className="checklist">
            <FormControlLabel control={
            <Checkbox
              value ={option}
              onClick={handleChange}
              size="small"
              sx={{
                color: 'black',
                '&.Mui-checked': {
                  color: 'black',
                },
              }}
            />} label={toTitleCase(option)} />
          </div>
        ))}
        </FormGroup>
      </div>
    </div>
  );
}

export default RadioButtonGroup;