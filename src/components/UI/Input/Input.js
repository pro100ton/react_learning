import React, {useRef, useImperativeHandle} from 'react';
import classes from "../../Login/Login.module.css";

const Input = React.forwardRef((props, ref) => {
    // Adding ref as a parameter only should be set from outside
    const inputRef = useRef()
    const activate = () => {
        inputRef.current.focus()
    }
    useImperativeHandle(ref, ()=> {
        return {
            focus: activate
        }
    })
    return (
        <div
            className={`${classes.control} ${
                props.isValid === false ? classes.invalid : ''
            }`}
        >
            <label htmlFor={props.id}>{props.label}</label>
            <input
                type={props.type}
                id={props.id}
                ref={inputRef}
                value={props.value}
                onChange={props.onChange}
                onBlur={props.onBlur}
            />
        </div>
    );
})

export default Input;