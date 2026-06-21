import "./OptionPickerButton.scss"
import React, {useEffect, useRef, useState} from 'react'

function OptionPickerButton({ mode, options, selectedOptionId, onOptionSelected, tooltipLabel, showSelectedOptionOnDropdown = false, dropup = false }) {
    const [isOpen, setIsOpen] = useState(false)
    const dropdownRef = useRef(null)

    const defaultOption = {
        id: "default",
        faIcon: "fa-solid fa-circle"
    }

    const selectedOption = options.find(option => option.id === selectedOptionId)
        || defaultOption

    const availableOptions = options.filter(option =>
        showSelectedOptionOnDropdown ||
        option.id !== selectedOption.id
    )

    const buttonBehaviorEnabled = mode === OptionPickerButton.Modes.MODE_BUTTON ||
        (mode === OptionPickerButton.Modes.MODE_AUTO && options.length <= 2)

    const caretIcon = !buttonBehaviorEnabled && selectedOption.img ?
        `fa-solid fa-caret-down` :
        null

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setIsOpen(false)
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    const _onToggleClicked = () => {
        if (buttonBehaviorEnabled) {
            const optionIndex = options.indexOf(selectedOption)
            const targetIndex = optionIndex < options.length - 1 ?
                optionIndex + 1 :
                0
            onOptionSelected(options[targetIndex]?.id)
        } else {
            setIsOpen(prev => !prev)
        }
    }

    const _onItemClicked = (option) => {
        if (!option || !option.id) return
        onOptionSelected(option.id)
        setIsOpen(false)
    }

    const hasSelectedOption = availableOptions.some(option => option.id === selectedOptionId)
    const borderClass = hasSelectedOption ? 'dropdown-item-no-border' : ''

    return (
        <div className={`btn-option-picker`} ref={dropdownRef}>
            <div className={`dropdown ${dropup ? 'dropup' : ''}`}>
                <button className={`dropdown-toggle btn btn-option-picker-toggle`}
                        onClick={_onToggleClicked}
                        data-tooltip={tooltipLabel}>
                    <OptionPickerButtonPickerIcon option={selectedOption} size={2}/>
                    {caretIcon && (
                        <i className={`fa-caret-icon ${caretIcon}`}/>
                    )}
                </button>

                {!buttonBehaviorEnabled && (
                    <div className={`dropdown-menu ${isOpen ? 'show' : ''}`}>
                        {availableOptions.map((option, key) => (
                            <a key={key}
                               className={`dropdown-item btn-option-picker-menu-item ${borderClass} ${option.id === selectedOptionId ? 'btn-option-picker-menu-item-selected' : ''}`}
                               onClick={() => _onItemClicked(option)}>
                                <OptionPickerButtonPickerIcon option={option} size={1}/>
                                <span className={`btn-option-picker-menu-item-label`}>
                                    {option.label}
                                </span>
                            </a>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}

function OptionPickerButtonPickerIcon({ option, size }) {
    const sizeClass = `btn-option-picker-icon-size-${size}`
    const willRenderImage = option.img
    const willRenderFaIcon = !willRenderImage

    return (
        <div className={`btn-option-picker-icon ${sizeClass}`}>
            {willRenderImage && (
                <img src={option.img}
                     alt={option.label}
                     className={`img`}/>
            )}

            {willRenderFaIcon && (
                <i className={`fa-icon ${option.faIcon}`}/>
            )}
        </div>
    )
}

OptionPickerButton.Modes = {
    MODE_AUTO: "mode_auto",
    MODE_BUTTON: "mode_button",
    MODE_DROPDOWN: "mode_dropdown"
}

export default OptionPickerButton
