import {useRef, useState} from "react";

const SimpleInput = (props) => {
    const nameInputRef = useRef()
    const [enteredName, setEnteredName] = useState('')
    const [enteredNameIsValid, setEnteredNameIsValid] = useState(true)
    const [enteredNameTouched, setEnteredNameTouched] = useState(false)

    function nameInputChangeHandler(event) {
        setEnteredName(event.target.value)
    }

    function formSubmissionHandler(event) {
        setEnteredNameTouched(true)
        event.preventDefault()
        if (enteredName.trim() === '') {
            setEnteredNameIsValid(false)
            return;
        }
        setEnteredNameIsValid(true)
        setEnteredName('')
    }

    function nameInputBlur(event){
        setEnteredNameTouched(true)
        if (enteredName.trim() === '') {
            setEnteredNameIsValid(false)
            return;
        }
    }

    const nameInputIsInvalid = !enteredNameIsValid && enteredNameTouched;
    const nameInputClasses = nameInputIsInvalid ? 'form-control invalid' : 'form-control'

    return (
        <form onSubmit={formSubmissionHandler}>
            <div className={nameInputClasses}>
                <label htmlFor='name'>Your Name</label>
                <input ref={nameInputRef} type='text' id='name' onChange={nameInputChangeHandler} value={enteredName}
                       onBlur={nameInputBlur}/>
                {nameInputIsInvalid && <p className='error-text'>Name should not be empty</p>}
            </div>
            <div className="form-actions">
                <button>Submit</button>
            </div>
        </form>
    );
};

export default SimpleInput;
