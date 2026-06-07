import "./ModalWrapper.scss"
import React, {useEffect, useState} from 'react'
import CircularButton from "/src/components/buttons/CircularButton.jsx"
import {useLanguage} from "/src/providers/LanguageProvider.jsx"
import {useViewport} from "/src/providers/ViewportProvider.jsx"
import {useUtils} from "/src/hooks/utils.js"

function ModalWrapper({ children, id = "", shouldDismiss, onDismiss, className = "", dialogClassName = "" }) {
    const viewport = useViewport()
    const utils = useUtils()

    const [isVisible, setIsVisible] = useState(false)
    const [savedScrollY, setSavedScrollY] = useState(null)

    useEffect(() => {
        document.body.style.overflow = 'hidden'
        const frame = requestAnimationFrame(() => setIsVisible(true))
        return () => {
            cancelAnimationFrame(frame)
            document.body.style.overflow = ''
        }
    }, [])

    useEffect(() => {
        if (!utils.device.isTouchDevice() || viewport.isDesktopLayout())
            return

        if (!shouldDismiss) {
            setSavedScrollY(viewport.scrollY)
            utils.capabilities.scrollTo(0, false)
        } else {
            utils.capabilities.scrollTo(savedScrollY || 0, true)
        }
    }, [shouldDismiss])

    useEffect(() => {
        if (!shouldDismiss) return

        if (document.activeElement) document.activeElement.blur()
        setIsVisible(false)

        const timer = setTimeout(() => {
            document.body.style.overflow = ''
            if (onDismiss) onDismiss()
        }, 200)
        return () => clearTimeout(timer)
    }, [shouldDismiss])

    return (
        <div id={id}
             className={`modal ${isVisible ? 'modal-show' : ''} ${className}`}>
            <div className={`modal-dialog ${dialogClassName}`}>
                <div className={`modal-content`}>
                    {children}
                </div>
            </div>
        </div>
    )
}

function ModalWrapperTitle({ title, faIcon, onClose, tooltip }) {
    const language = useLanguage()

    return (
        <div className={`modal-header`}>
            <h4 className={`modal-title fw-bold`}>
                <i className={`${faIcon} me-2 me-xl-3 text-primary`}/>
                <span dangerouslySetInnerHTML={{__html: title}}/>
            </h4>

            {onClose && (
                <CircularButton onClick={onClose}
                                faIcon={`fa-solid fa-xmark`}
                                size={CircularButton.Sizes.LARGE}
                                variant={CircularButton.Variants.DEFAULT}
                                tooltip={tooltip || language.getString("close_window")}/>
            )}
        </div>
    )
}

function ModalWrapperBody({ children, className }) {
    return (
        <div className={`modal-body ${className}`}>
            {children}
        </div>
    )
}

function ModalWrapperFooterDescription({ title, description, faIcon }) {
    return (
        <div className={`modal-footer`}>
            <h6 className={`modal-footer-title text-default`}>
                <i className={`${faIcon} text-primary me-2 eq-h5`}/>
                <span className={`fw-bold`} dangerouslySetInnerHTML={{__html: title}}/>
            </h6>

            <div className={`modal-footer-description text-1`}
                 dangerouslySetInnerHTML={{__html: description}}/>
        </div>
    )
}

export {ModalWrapper, ModalWrapperTitle, ModalWrapperBody, ModalWrapperFooterDescription}
