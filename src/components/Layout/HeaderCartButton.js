import React from 'react';
import classes from './HeaderCartButton.module.css'
import CartIcon from "../Cart/CartIcon";
import {useContext} from "react";
import CartContext from "../../store/cart-context";

function HeaderCartButton(props) {
    const cartCtx = useContext(CartContext);

    // reduce() - method that allows us to transform the array of data into a single value (number in this case)
    // first arg - function that will be used
    // second arg - starting value
    const numberOfCartItems = cartCtx.items.reduce(
        // currentNumber - value that will carry on executions, initially - 0
        (currentNumber, item)=>{
            return currentNumber + item.amount
        },
        0
    )

    return (
        <button className={classes.button} onClick={props.onClick}>
            <span className={classes.icon}> <CartIcon/> </span>
            <span>Your cart</span>
            <span className={classes.badge}>{numberOfCartItems}</span>
        </button>
    );
}

export default HeaderCartButton;