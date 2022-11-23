import React, { useState } from "react";
import { spicyFoods, getNewRandomSpicyFood } from "../data";

function SpicyFoodList() {
  const [foods, setFoods] = useState(spicyFoods);
  const [filterBy, setFilterBy] = useState("All");//we never use setFilterBy because ???
  // console.log(spicyFoods);
  function handleAddFood() {
    const newFood = getNewRandomSpicyFood();
    // console.log(newFood);
    const newFoodArray = [...foods, newFood];
    setFoods(newFoodArray);
  }

  const foodsToDisplay = foods.filter((food) => {
    if (filterBy === "All") {
      return true;
//this is a way to make new foodsToDisplay a copy of all foods by comparing a KNOWN filterBy IS set to "All"
    }
    else {
      return food.cuisine === filterBy;
    }
  })

  function handleListClick(id) {
    const newFoodArray = foods.map((food) => {
      if (food.id === id) {
        return {
          ...food,
          heatLevel: food.heatLevel + 1,
        };
      } else {
        return food;
      }
    });
    setFoods(newFoodArray);
  }

  const foodList = foodsToDisplay.map((food) => (
    <li key={food.id} onClick={ () => handleListClick(food.id)}>
      {food.name} | Heat: {food.heatLevel} | Cuisine: {food.cuisine}
    </li>
  ));

  return (
    <div>
      <button onClick={handleAddFood}>Add New Food</button>
      <ul>{foodList}</ul>
    </div>
  );

  function handleFilterChange(event) {
    setFilterBy(event.target.value);
  }

  return (
    <select name="filter" onChange={handleFilterChange}>
      <option value="All">All</option>
      <option value="American">American</option>
      <option value="Sichuan">Sichuan</option>
      <option value="Thai">Thai</option>
      <option value="Mexican">Mexican</option>
    </select>
  )
}

export default SpicyFoodList;
