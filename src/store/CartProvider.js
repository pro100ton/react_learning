import React from 'react';
import CartContext from "./cart-context";
import {useReducer} from "react";

// Defining outside of component because reducer doesn't need anything from the component and it should be recreated
// all the time when the component reevaluated

const defaultCartState = {
    items: [],
    totalAmount: 0
}

// action will be defined by developer
// state is a snapshot of the state managed by the reducer
const cartReducer = (state, action) => {
    if (action.type === 'ADD'){

    }
    // Needs to return new state
    return defaultCartState;
}

function CartProvider(props) {
    // cartState - always your state snapshot
    // - function that allows you to dispatch an action to the reducer
    const [cartState, dispatchCartAction] = useReducer(cartReducer, defaultCartState)
    // Manage Cart context data and provide it to all components, that want use it

    // Добавляем логику для работы с датой контекста, чтобы все что с ней делалось
    // хранилось в одном компоненте и чтобы ни в каком другом компоненте не требовалось это делать

    // Хэлпер для получения объекта и проведения с ним каких-то манипуляций
    const addItemToCartHandler = (item) => {
        dispatchCartAction({
            // Property that allow us to identify that action inside reducer function
            type: 'ADD',
            item: item
        });
    }

    // Helper for getting item by ID and doing smth with it in the future
    const removeItemFromCartHandler = (id) => {
        dispatchCartAction({
            // Property that allow us to identify that action inside reducer function
            type: 'REMOVE',
            id: id
        })
    }

    // Здесь будут хранится конкретные значения контекста которые со временем будут обновлены
    const cartContext = {
        items: cartState.items,
        totalAmount: cartState.totalAmount,
        addItem: addItemToCartHandler,
        removeItem: removeItemFromCartHandler,
    }
    return <CartContext.Provider value={cartContext}>
        {props.children}
    </CartContext.Provider>
}

export default CartProvider;