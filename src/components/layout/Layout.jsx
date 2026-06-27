import "./Layout.scss"
import React from 'react'
import LayoutAnimatedBackground from "/src/components/layout/LayoutAnimatedBackground.jsx"
import LayoutStaticBackground from "/src/components/layout/LayoutStaticBackground.jsx"

function Layout({ id, children, backgroundStyle }) {
    const isAnimatedBackground = backgroundStyle === "animated"
    const isStaticBackground = backgroundStyle === "static"

    return (
        <div id={id}
             className={`layout`}>

            {isAnimatedBackground && <LayoutAnimatedBackground/>}
            {isStaticBackground && <LayoutStaticBackground/>}

            <div className={`layout-content`}>
                {children}
            </div>
        </div>
    )
}

export default Layout