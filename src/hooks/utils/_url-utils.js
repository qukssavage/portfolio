

export const _urlUtils = {
    
    getAbsoluteLocation: () => {
        const { protocol, host, pathname, search, hash } = window.location
        return `${protocol}//${host}${pathname}${search}${hash}`
    },

    
    getRootLocation: () => {
        const { protocol, host } = window.location
        const basePath = import.meta.env.BASE_URL
        const path = `${protocol}//${host}${basePath}`
        return path.endsWith('/') ? path : `${path}/`
    },

    
    open: (url) => {
        window.open(url, "_blank")
    },

    
    toYoutubeEmbed: (youtubeRawUrl) => {
        const urlObj = new URL(youtubeRawUrl)
        const videoId = urlObj.searchParams.get('v')
        return `https://www.youtube.com/embed/${videoId}`
    }
}