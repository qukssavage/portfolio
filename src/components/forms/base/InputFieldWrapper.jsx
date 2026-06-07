import "./InputFieldWrapper.scss"
import React, {useEffect, useState} from 'react'
function InputFieldWrapper({ children, isFocused = false, faIconPrefix = "" }) {
    const focusClass = isFocused ?
        "input-field-wrapper-focused" :
        ""

    return (
        <div className={`input-group input-field-wrapper ${focusClass}`}>
            {faIconPrefix && (
                <InputFieldWrapperPrefixIcon isFocused={isFocused}
                                             faIcon={faIconPrefix}/>
            )}

            {children}
        </div>
    )
}

function InputFieldWrapperPrefixIcon({ isFocused, faIcon }) {
    const focusClass = isFocused ?
        "input-field-wrapper-attach-focused" :
        ""

    return (
        <span className={`input-group-text input-field-wrapper-attach ${focusClass}`}>
            <i className={faIcon}/>
        </span>
    )
}

export default InputFieldWrapper