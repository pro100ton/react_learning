import React, {useEffect, useState} from 'react';
import classes from './HeaderCartButton.module.css'
import CartIcon from "../Cart/CartIcon";
import {useContext} from "react";
import CartContext from "../../store/cart-context";

function HeaderCartButton(props) {
    const [btnIsHighlighted, setBtnIsHighlighted] = useState(false)
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
    // Destructuring context for getting only items array from it so we can add it to the useEffect
    // dependency to trigger it only when items is changed
    const {items} = cartCtx
    const btnClasses = `${classes.button} ${btnIsHighlighted ? classes.bump : ''}`
    useEffect(() => {
        if (cartCtx.items.length === 0) {
            return
        }
        setBtnIsHighlighted(true);
        const timer = setTimeout(()=>{
            setBtnIsHighlighted(false)
        }, 300);

        // Firing up cleanup function to remove existing timers
        return () => {
            clearTimeout(timer);
        }
    }, [items])

    return (
        <button className={btnClasses} onClick={props.onClick}>
            <span className={classes.icon}> <CartIcon/> </span>
            <span>Your cart</span>
            <span className={classes.badge}>{numberOfCartItems}</span>
        </button>
    );
}

export default HeaderCartButton;