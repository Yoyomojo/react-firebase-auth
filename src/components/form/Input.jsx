const Input = (props) => {
    return (
        <>
            {props.inputLabel ?
                <label htmlFor={props.inputID} className='form-label'>{props.inputLabel}</label>
            :
                null
            }
            {props.inputRequired ?
                <input
                    type={props.inputType}
                    name={props.inputName}
                    className={props.inputClass}
                    id={props.inputID}
                    tabIndex={props.inputTabIndex}
                    placeholder={props.inputPlaceholder}
                    disabled={props.inputDisabled}
                    onChange={props.onChangeEvent}
                    onBlur={props.onBlurEvent}
                    onKeyUp={props.onKeyupEvent}
                    style={props.inputStyle}
                    defaultValue={props.inputDefaultValue}
                    required
                />
            :
                <input
                    type={props.inputType}
                    name={props.inputName}
                    className={props.inputClass}
                    id={props.inputID}
                    tabIndex={props.inputTabIndex}
                    placeholder={props.inputPlaceholder}
                    disabled={props.inputDisabled}
                    onChange={props.onChangeEvent}
                    onBlur={props.onBlurEvent}
                    onKeyUp={props.onKeyupEvent}
                    style={props.inputStyle}
                    defaultValue={props.inputDefaultValue}
                />
            }
        </>
    )
}

export default Input;