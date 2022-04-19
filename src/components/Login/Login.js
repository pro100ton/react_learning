import React, {useContext, useEffect, useReducer, useRef, useState} from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';
import AuthContext from "../../store/auth-context";
import Input from "../UI/Input/Input";
import authContext from "../../store/auth-context";

function emailReducer(state, action) {
    if (action.type === "USER_INPUT") {
        return {value: action.val, isValid: action.val.includes("@")}
    }
    if (action.type === "INPUT_BLUR") {
        return {value: state.value, isValid: state.value.includes("@")}
    }
    return {value: '', isValid: false}
}

function passwordReducer(state, action) {
    if (action.type === "USER_INPUT") {
        return {value: action.val, isValid: action.val.length > 6}
    }
    if (action.type === "INPUT_BLUR") {
        return {value: state.value, isValid: state.value.length > 6}
    }
    return {value: '', isValid: false}
}

const Login = (props) => {
    // const [enteredEmail, setEnteredEmail] = useState('');
    // const [emailIsValid, setEmailIsValid] = useState();
    // const [enteredPassword, setEnteredPassword] = useState('');
    // const [passwordIsValid, setPasswordIsValid] = useState();
    const [formIsValid, setFormIsValid] = useState(false);
    const [emailState, dispatchEmail] = useReducer(
        emailReducer,
        {
            value: '',
            isValid: false,
        })

    const [passwordState, dispatchPassword] = useReducer(
        passwordReducer,
        {
            value: "",
            isValid: false
        }
    )
    const ctx = useContext(AuthContext)
    const emailInputRef = useRef()
    const passwordInputRef = useRef()
    const {isValid: emailIsValid} = emailState
    const {isValid: passwordIsValid} = passwordState
    useEffect(() => {
        const identified = setTimeout(() => {
            console.log('effect')
            setFormIsValid(
                emailState.isValid && passwordState.isValid
            )
        }, 500);
        // Return cleanup function
        return () => {
            clearTimeout(identified)
        }
        // useEffect function will launch when dependencies entries are changing (in this case - states)
        // Otherwise function will not trigger
    }, [
        emailState.isValid,
        passwordState.isValid
    ])

    const emailChangeHandler = (event) => {
        dispatchEmail({type: "USER_INPUT", val: event.target.value});
        // setFormIsValid(
        //     passwordState.isValid && event.target.value.includes("@")
        // )
    };

    const passwordChangeHandler = (event) => {
        dispatchPassword({type: "USER_INPUT", val: event.target.value})
        // setFormIsValid(
        //     event.target.value.length > 6 && emailState.isValid
        // )
    };

    const validateEmailHandler = () => {
        dispatchEmail({type: "INPUT_BLUR"})
    };

    const validatePasswordHandler = () => {
        dispatchPassword({type: "INPUT_BLUR"})
    };

    const submitHandler = (event) => {
        event.preventDefault();
        if (formIsValid) {
            ctx.onLogin(emailState.value, passwordState.value)
        } else if (!emailIsValid) {
            emailInputRef.current.focus()
        } else {
            passwordInputRef.current.focus()
        }
    };

    return (
        <Card className={classes.login}>
            <form onSubmit={submitHandler}>
                <Input
                    ref={emailInputRef}
                    id="email"
                    label="E-Mail"
                    type="email"
                    isValid={emailIsValid}
                    value={emailState.value}
                    onChange={emailChangeHandler}
                    onBlur={validateEmailHandler}
                />
                <Input
                    id="password"
                    label="Password"
                    type="password"
                    isValid={passwordIsValid}
                    value={passwordState.value}
                    onChange={passwordChangeHandler}
                    onBlur={passwordChangeHandler}
                    ref={passwordInputRef}
                />
                <div className={classes.actions}>
                    <Button type="submit" className={classes.btn}>
                        Login
                    </Button>
                </div>
            </form>
        </Card>
    );
};

export default Login;
