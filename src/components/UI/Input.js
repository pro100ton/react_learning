import React from 'react';
import classes from './Input.module.css'

// We are using forwardRef to forward ref to parent components
const Input = React.forwardRef((props, ref)=> {
    return (
        <div className={classes.input}>
            <label htmlFor={props.input.id}>{props.label}</label>
            {/* That ref will be used in MealItemForm as a standard ref for input value*/}
            <input ref={ref} {...props.input}/>
        </div>
    );
})

export default Input;