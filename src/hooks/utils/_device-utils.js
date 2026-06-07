

export const _deviceUtils = {
    
    isAndroid: () => {
        const userAgent = window.navigator.userAgent.toLowerCase();
        return /android/.test(userAgent);
    },

    
    isChrome: () => {
        const userAgent = navigator.userAgent || navigator.vendor || window.opera
        return /CriOS/.test(userAgent) || /Chrome/.test(userAgent)
    },

    
    isChromeAndroid: () => {
        const userAgent = navigator.userAgent
        return /Chrome\/[.0-9]* Mobile/i.test(userAgent) && !/OPR|Edg|SamsungBrowser|UCBrowser|CriOS/i.test(userAgent)
    },

    
    isChromeOS: () => {
        const userAgent = window.navigator.userAgent.toLowerCase()
        return /cros/.test(userAgent);
    },

    
    isFirefox: () => {
        const userAgent = navigator.userAgent || navigator.vendor || window.opera;
        return /Firefox/.test(userAgent);
    },

    
    isIOS: () => {
        const userAgent = window.navigator.userAgent.toLowerCase()
        return /iphone|ipad|ipod/.test(userAgent)
            || /^((?!chrome|android).)*safari/i.test(navigator.userAgent)
    },

    
    isIPad: () => {
        const userAgent = window.navigator.userAgent.toLowerCase()
        return /ipad/.test(userAgent)
    },

    
    isSafari: () => {
        const userAgent = navigator.userAgent
        return /^((?!chrome|android).)*safari/i.test(userAgent)
    },

    
    isTouchDevice: () => {
        return (('ontouchstart' in window) ||
            (navigator.maxTouchPoints > 0) ||
            (navigator.msMaxTouchPoints > 0))
    }
}