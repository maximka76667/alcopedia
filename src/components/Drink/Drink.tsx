import React, { useEffect, useState } from 'react'
import { DrinkInterface } from '../../interfaces';
import Ingredient from '../Ingredient/Ingredient';
import "./Drink.sass"

const Drink = ({ drink }: { drink: DrinkInterface }) => {

  const [ingredientList, setIngredientList] = useState<{ name: string, amount: number }[]>([]);
  const [ingredientCount, setIngredientCount] = useState<number>(0);

  useEffect(() => {
    setIngredientList([]);
    setIngredientCount(0);
    for (const ingridient in drink.ingredients) {
      setIngredientCount((ingredientCount) => ingredientCount + drink.ingredients[ingridient]);
      setIngredientList((ingredientList) => [...ingredientList, { name: ingridient, amount: drink.ingredients[ingridient] }]);
    }
  }, [drink])

  return (
    <div className='drink'>
      <h2 className='drink__name'>{drink.name}</h2>
      <p>{drink.description}</p>
      <h3>Drinks:</h3>
      <ul>
        {
          ingredientList.map((ingredient) => {
            return (
              <li key={ingredient.name}>
                {ingredient.name}
              </li>
            )
          })
        }
      </ul>
      <h3>Extra Ingredients:</h3>
      <ul>
        {
          drink.extra.map((extra) => {
            return (
              <li key={extra}>
                {extra}</li>
            )
          })
        }
      </ul>
      <div className='glass'>
        <div className='glass__content'>
          {
            ingredientList.map((ingredient) => {
              return (
                <Ingredient ingredient={ingredient} ingredientCount={ingredientCount}></Ingredient>
              )
            })
          }
        </div>
      </div>
    </div >
  )
}

export default Drink