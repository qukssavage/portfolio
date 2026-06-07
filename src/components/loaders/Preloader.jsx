import "./Preloader.scss"
import React, {useEffect, useState} from 'react'
import {useScheduler} from "/src/hooks/scheduler.js"
import {useUtils} from "/src/hooks/utils.js"
import {useConstants} from "/src/hooks/constants.js"

const PreloaderState = {
    NONE:               { id: 0, key: "none" },
    PREPARING:          { id: 1, key: "preparing" },
    SHOWING:            { id: 2, key: "showing" },
    SHOWN:              { id: 3, key: "shown" },
    READY_TO_HIDE:      { id: 4, key: "readyToHide" },
    HIDING:             { id: 5, key: "hiding" },
    HIDDEN:             { id: 6, key: "hidden" },
}

function Preloader({ children, preloaderSettings }) {
    const scheduler = useScheduler()
    const utils = useUtils()
    const constants = useConstants()

    const enabled = preloaderSettings?.enabled
    const title = preloaderSettings?.title || ""

    const [state, setState] = useState(PreloaderState.NONE)
    const [didLoadAllImages, setDidLoadAllImages] = useState(false)

    const tag = "Preloader"
    const minDisplayTime = 600
    const shouldShowPreloaderWindow = state.id > PreloaderState.NONE.id && state.id < PreloaderState.HIDDEN.id
    const shouldShowContent = state.id >= PreloaderState.SHOWN.id
    const shouldShowContentElements = state.id >= PreloaderState.SHOWING.id
    const isHiding = state.id >= PreloaderState.HIDING.id

    useEffect(() => {
        setState(PreloaderState.NONE)
        if (!enabled) {
            setState(PreloaderState.HIDDEN)
            return
        }
        setState(PreloaderState.PREPARING)
    }, [null])

    useEffect(() => {
        if (state !== PreloaderState.PREPARING || !didLoadAllImages) return
        utils.dom.setBodyScrollEnabled(false)
        scheduler.clearAllWithTag(tag)
        setState(PreloaderState.SHOWING)
    }, [state === PreloaderState.PREPARING, didLoadAllImages])

    useEffect(() => {
        if (state !== PreloaderState.SHOWING) return
        scheduler.clearAllWithTag(tag)
        scheduler.schedule(() => { setState(PreloaderState.SHOWN) }, 600, tag)
    }, [state === PreloaderState.SHOWING])

    useEffect(() => {
        if (state !== PreloaderState.SHOWN) return
        scheduler.clearAllWithTag(tag)
        scheduler.schedule(() => { setState(PreloaderState.READY_TO_HIDE) }, minDisplayTime, tag)
    }, [state === PreloaderState.SHOWN])

    useEffect(() => {
        if (state !== PreloaderState.READY_TO_HIDE) return
        scheduler.clearAllWithTag(tag)

        if (utils.storage.getWindowVariable("stayOnThePreloaderScreen")) return

        let timePassed = 0
        scheduler.interval(() => {
            timePassed += 0.1
            const imageCount = utils.dom.getImageCount(constants.HTML_CLASSES.imageView)
            const imageLoadPercentage = utils.dom.getImageLoadPercentage(constants.HTML_CLASSES.imageView)
            const didLoad = imageLoadPercentage >= 100 && imageCount > 0 && timePassed >= 0.5
            const noImages = timePassed >= 4 && imageCount === 0
            const timeout = timePassed >= 5

            if (didLoad || noImages || timeout) setState(PreloaderState.HIDING)
        }, 100, tag)
    }, [state === PreloaderState.READY_TO_HIDE])

    useEffect(() => {
        if (state !== PreloaderState.HIDING) return
        scheduler.clearAllWithTag(tag)
        utils.dom.setBodyScrollEnabled(true)
        scheduler.schedule(() => { setState(PreloaderState.HIDDEN) }, 500, tag)
    }, [state === PreloaderState.HIDING])

    useEffect(() => {
        if (state !== PreloaderState.HIDDEN) return
        scheduler.clearAllWithTag(tag)
        utils.dom.setBodyScrollEnabled(true)
        document.body.classList.add(constants.HTML_CLASSES.bodyAfterLoading)
    }, [state === PreloaderState.HIDDEN])

    return (
        <div className="preloader-content-wrapper">
            {shouldShowPreloaderWindow && (
                <PreloaderWindow
                    title={title}
                    setDidLoadAllImages={setDidLoadAllImages}
                    showElements={shouldShowContentElements}
                    isHiding={isHiding} />
            )}
            {shouldShowContent && (
                <div className="preloader-content">{children}</div>
            )}
        </div>
    )
}

function PreloaderWindow({ title, setDidLoadAllImages, showElements, isHiding }) {
    useEffect(() => {
        setDidLoadAllImages(true)
    }, [])

    return (
        <div className={`preloader-window ${isHiding ? 'preloader-window-hidden' : ''}`}>
            <div className="preloader-inner">
                <h1
                    className={`preloader-title ${showElements ? 'visible' : ''}`}
                    dangerouslySetInnerHTML={{ __html: title }}
                />
                <div className={`preloader-line ${showElements ? 'visible' : ''}`} />
            </div>
        </div>
    )
}

export default Preloader
