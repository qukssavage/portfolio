import "./LayoutAnimatedBackground.scss"
import React from 'react'
import {useUtils} from "/src/hooks/utils.js"

const utils = useUtils()

function LayoutAnimatedBackground() {
    const isHidden = utils.device.isAndroid() && !utils.device.isChromeAndroid()
    if (isHidden) return null

    return (
        <div className="layout-animated-background">
            <div className="lab-blob lab-blob-1"/>
            <div className="lab-blob lab-blob-2"/>
            <div className="lab-blob lab-blob-3"/>
            <div className="lab-blob lab-blob-4"/>
        </div>
    )
}

export default LayoutAnimatedBackground
