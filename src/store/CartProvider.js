import React from 'react';
import CartContext from "./cart-context";

function CartProvider(props) {
    // Manage Cart context data and provide it to all components, that want use it

    // Добавляем логику для работы с датой контекста, чтобы все что с ней делалось
    // хранилось в одном компоненте и чтобы ни в каком другом компоненте не требовалось это делать

    // Хэлпер для получения объекта и проведения с ним каких-то манипуляций
    const addItemToCartHandler = item => {}

    // Helper for getting item by ID and doing smth with it in the future
    const removeItemFromCartHandler = id => {}

    // Здесь будут хранится конкретные значения контекста которые со временем будут обновлены
    const cartContext = {
        items: [],
        totalAmount: 0,
        addItem: addItemToCartHandler,
        removeItem: removeItemFromCartHandler,
    }
    return <CartContext.Provider value={cartContext}>
        {props.children}
    </CartContext.Provider>
}

export default CartProvider;