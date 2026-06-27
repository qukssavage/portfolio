

export const _capabilitiesUtils = {
    
    isFullscreen: () => {
        return Boolean(document.fullscreenElement)
    },

    
    scrollTo: (top, instant) => {
        const behavior = instant ?
            "instant" :
            "smooth"

        window.scrollTo({
            top: top,
            behavior: behavior
        })
    },

    
    toggleFullscreen: () => {
        const isFullscreen = _capabilitiesUtils.isFullscreen()
        if(isFullscreen) {
            document.exitFullscreen().catch(() => {})
        }
        else {
            document.documentElement.requestFullscreen({ navigationUI: 'hide' }).catch(() => {})
        }
    }
}