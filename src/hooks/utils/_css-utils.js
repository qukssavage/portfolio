

export const _cssUtils = {
    
    BREAKPOINTS: {
        xs: 0,
        sm: 576,
        md: 768,
        lg: 992,
        xl: 1200,
        xxl: 1400,
    },

    
    getRootSCSSVariable: (variable) => {
        const root = document.documentElement
        const computedStyle = getComputedStyle(root)
        const propertyValue = computedStyle?.getPropertyValue(variable) || ""
        return propertyValue?.trim() || null
    },

    
    hexToRgba: (hex, opacity) => {
        hex = hex.replace('#', '')

        const bigint = parseInt(hex, 16)
        const r = (bigint >> 16) & 255
        const g = (bigint >> 8) & 255
        const b = bigint & 255

        return `rgba(${r}, ${g}, ${b}, ${opacity})`
    }
}