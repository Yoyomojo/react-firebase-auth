const Button = (props) => {
    return (
        <>
            <button
                type={props.inputType}
                name={props.inputName}
                className={props.inputClass}
                id={props.inputID}
                tabIndex={props.inputTabIndex}
                disabled={props.inputDisabled}
                onClick={props.inputClickEvent}
            >
                {props.inputLabel}
            </button>
        </>
    )
}

export default Button;