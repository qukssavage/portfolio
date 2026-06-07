import "./LayoutAnimatedBackground.scss"
import React, {useEffect, useRef} from 'react'
import {useUtils} from "/src/hooks/utils.js"

const utils = useUtils()

function LayoutAnimatedBackground() {
    const canvasRef = useRef(null)
    const rafRef = useRef(null)
    const circlesRef = useRef([])
    const colorsRef = useRef({ bg: null, light: null, dark: null })
    const lastTimeRef = useRef(null)

    const MAX_CIRCLES = 8

    const isHidden = utils.device.isAndroid() && !utils.device.isChromeAndroid()

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return
        const ctx = canvas.getContext("2d")

        circlesRef.current = Array.from({ length: MAX_CIRCLES }, () => new CircleData())

        const readColors = () => {
            colorsRef.current.bg    = utils.css.getRootSCSSVariable("--theme-background")
            colorsRef.current.light = utils.css.getRootSCSSVariable("--theme-background-contrast")
            colorsRef.current.dark  = utils.css.getRootSCSSVariable("--theme-background-contrast-darken")
        }

        readColors()

        const themeObserver = new MutationObserver(readColors)
        themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] })

        const draw = (timestamp) => {
            const dt = lastTimeRef.current ? Math.min((timestamp - lastTimeRef.current) / 16.67, 3) : 1
            lastTimeRef.current = timestamp

            canvas.width  = window.innerWidth
            canvas.height = window.innerHeight
            ctx.clearRect(0, 0, canvas.width, canvas.height)

            ctx.fillStyle = utils.css.hexToRgba(colorsRef.current.bg, 1)
            ctx.fillRect(0, 0, canvas.width, canvas.height)

            for (const circle of circlesRef.current) {
                circle.update(dt)
                const color = circle.color === "dark"
                    ? utils.css.hexToRgba(colorsRef.current.dark,  circle.opacity / 2)
                    : utils.css.hexToRgba(colorsRef.current.light, circle.opacity / 2)
                ctx.beginPath()
                ctx.arc(circle.x, circle.y, circle.radius, 0, Math.PI * 2)
                ctx.fillStyle = color
                ctx.fill()
            }

            rafRef.current = requestAnimationFrame(draw)
        }

        rafRef.current = requestAnimationFrame(draw)

        return () => {
            cancelAnimationFrame(rafRef.current)
            themeObserver.disconnect()
        }
    }, [])

    if (isHidden) return null

    return (
        <div className="layout-animated-background">
            <canvas ref={canvasRef} id="layout-animated-background-canvas" />
        </div>
    )
}

class CircleData {
    constructor() {
        this.reset()
        this.didEnter = true
    }

    randomizeProps() {
        const base = Math.max(window.innerWidth, window.innerHeight)
        this.radius  = utils.number.random(base / 24, base / 8)
        this.speedX  = utils.number.random(3, 10, true)
        this.speedY  = utils.number.random(2, 5, true)
        this.color   = Math.random() > 0.5 ? "dark" : "light"
        this.opacity = 0.1 + Math.random() * 0.9
    }

    update(dt) {
        this.x += (this.speedX / 2) * dt
        this.y += (this.speedY / 2) * dt
        const out = this.isOutOfBounds()
        if (!this.didEnter) { this.didEnter = out }
        else if (out) { this.reset() }
    }

    isOutOfBounds() {
        const r2 = this.radius * 2
        return this.x + r2 < 0 || this.x - r2 > window.innerWidth ||
               this.y + r2 < 0 || this.y - r2 > window.innerHeight
    }

    reset() {
        this.randomizeProps()
        const dir = utils.number.random(0, 3)
        if (dir === 0) { this.x = -this.radius*2; this.y = utils.number.random(0, window.innerHeight); this.speedX = Math.abs(this.speedX) }
        else if (dir === 1) { this.x = window.innerWidth + this.radius*2; this.y = utils.number.random(0, window.innerHeight); this.speedX = -Math.abs(this.speedX) }
        else if (dir === 2) { this.x = utils.number.random(0, window.innerWidth); this.y = -this.radius*2; this.speedY = Math.abs(this.speedY) }
        else { this.x = utils.number.random(0, window.innerWidth); this.y = window.innerHeight + this.radius*2; this.speedY = -Math.abs(this.speedY) }
        this.didEnter = false
    }
}

export default LayoutAnimatedBackground
