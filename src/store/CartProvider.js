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
        // Creating new state for cart items
        const updatedTotalAmount = state.totalAmount + action.item.price * action.item.amount
        // findIndex() - finding existing index of an item in an array
        // True if existing item id is equal to adding item index
        const existingCartItemIndes = state.items.findIndex(
            item => item.id === action.item.id
        )
        const existingCartItem = state.items[existingCartItemIndes]
        let updatedItems;

        if (existingCartItem){
            let updatedItem;
            updatedItem = {
                ...existingCartItem,
                amount: existingCartItem.amount + action.item.amount
            };
            updatedItems = [...state.items]
            updatedItems[existingCartItemIndes] = updatedItem;
        } else {
            updatedItems = state.items.concat(action.item)
        }

        return {
            items: updatedItems,
            totalAmount: updatedTotalAmount
        }
    } if (action.type === 'REMOVE') {
        const existingCartItemIndex = state.items.findIndex(
            (item) => item.id === action.id
        );
        const existingItem = state.items[existingCartItemIndex];
        const updatedTotalAmount = state.totalAmount - existingItem.price;
        let updatedItems;
        if (existingItem.amount === 1) {
            updatedItems = state.items.filter(item => item.id !== action.id);
        } else {
            const updatedItem = { ...existingItem, amount: existingItem.amount - 1 };
            updatedItems = [...state.items];
            updatedItems[existingCartItemIndex] = updatedItem;
        }

        return {
            items: updatedItems,
            totalAmount: updatedTotalAmount
        };
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