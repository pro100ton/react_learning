import React from 'react';
import mealsImage from '../../assets/img.png'

import classes from "./Header.module.css";
import HeaderCartButton from "./HeaderCartButton";

function Header(props) {
    return (
        <React.Fragment>
            <header className={classes.header}>
                <h1>Meals</h1>
                <HeaderCartButton onClick={props.onShowCart} />
            </header>
            <div className={classes['main-image']}>
                <img src={mealsImage} alt="A table of food"/>
            </div>
        </React.Fragment>
    );
}

export default Header;