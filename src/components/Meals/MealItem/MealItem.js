import React from 'react';
import classes from './MealItem.module.css'
import MealItemForm from "./MealItemForm";

function MealItem(props) {
    const price = `$${props.mealPrice.toFixed(2)}`
    return (
        <li className={classes.meal}>
            <div>
                <h3>{props.mealName}</h3>
                <div className={classes.description}>{props.MealDescription}</div>
                <div className={classes.price}>{price}</div>
            </div>
            <div>
                <MealItemForm/>
            </div>
        </li>
    );
}

export default MealItem;