import Header from "./components/Layout/Header";
import React from "react";
import Meals from "./components/Meals/Meals";
import Cart from "./components/Cart/Cart";
import {useState} from "react";
import CartProvider from "./store/CartProvider";

function App() {
    const [cartIsShown, setCartIsShown] = useState(false)

    const showCartHandler = () => {
        setCartIsShown(true)
    }

    const hideCartHandler = () => {
        setCartIsShown(false)
    }

    return (
        // Here we are providing the context for all our components, because all of them need some logic at the end
        <CartProvider>
            { cartIsShown && <Cart onClose={hideCartHandler}/> }
            <Header onShowCart={showCartHandler} onHideCart={hideCartHandler}/>
            <main>
                <Meals/>
            </main>
        </CartProvider>
    );
}

export default App;
