

export const _fileUtils = {
    
    BASE_URL: import.meta.env.BASE_URL,

    
    download: (url) => {
        window.open(_fileUtils.resolvePath(url), "_blank")
    },

    
    loadJSON: async (path) => {
        const resolvedPath = _fileUtils.resolvePath(path)

        try {
            const response = await fetch(resolvedPath)
            const contentType = response.headers.get("content-type") || ""

            if (!response.ok || !contentType.includes("application/json")) {
                return null
            }

            return await response.json()
        }
        catch {
            return null
        }
    },

    
    resolvePath: (path) => {
        if(!path) return path
        if(path.startsWith("http")) return path

        const baseUrl = _fileUtils.BASE_URL || ""
        const fullPath = baseUrl + path
        return fullPath.replace(/(^|[^:])\/\//g, "$1/")
    },
}