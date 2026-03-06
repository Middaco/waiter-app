import React, { useState } from "react";

export default function FormWithTwoInputs(
    onSubmitCallback,
    onSubmitCallbackProp,
    firstLabel,
    firstInputType,
    firstInputOnChangeCallback,
    secondLabel,
    secondInputType,
    secondInputOnChangeCallback,
    submitValue
){
    const [firstInputState, setFirstInputState] = useState('')
    const [secondInputState, setSecondInputState] = useState('')

    function handleFirstInputStateChange(event){
        const value = event.target.value;
        setFirstInputState(value);
        firstInputOnChangeCallback(value);
    }

    function handleSecondInputStateChange(event){
        const value = event.target.value;
        setSecondInputState(value);
        secondInputOnChangeCallback(value);
    }

    return(
        <form onSubmit={(event) => {
            event.preventDefault();
            onSubmitCallback(onSubmitCallbackProp);
        }}>
            <label>{firstLabel}</label>
            <input type={firstInputType} value={firstInputState.value} onChange={handleFirstInputStateChange}/>
            <label>{secondLabel}</label>
            <input type={secondInputType} value={secondInputState.value} onChange={handleSecondInputStateChange}/>
            <input type="submit" value={submitValue}/>
        </form>
    )
}