

export const _stringUtils = {
    
    abbreviateName: (name) => {
        const exceptions = [
            'de', 'da', 'das', 'do', 'dos', 'di', 'del', 'della', 'dallo', 'dalla', 'dei', 'degli', 'y', 'e',
            'du', 'des', 'le', 'la', 'les',
            'von', 'van', 'zu', 'zum', 'zur', 'ten', 'ter', 'te', 'der', 'den', 'op', 'af', 'av',
            'of', 'the', 'and',
            'al', 'bin', 'ibn', 'bint', 'abu', 'umm', 'abd',
            'z', 'ze', 'za', 'pod', 'nad', 'u', 'od', 'do', 'na',
            'ben', 'bat', 'bar',
            'mir', 'khwaja', 'zada'
        ]

        return name.split(' ')
            .map((word, index, arr) => {
                if (index === 0 || index === arr.length - 1 || exceptions.includes(word.toLowerCase())) {
                    return word
                }
                return word[0].toUpperCase() + '.'
            })
            .join(' ')
    },

    
    extractFirstPart: (string) => {
        if (!string)
            return string

        string = _stringUtils.stripHTMLTags(string)

        const separators = [':', '-', '–']
        let firstIndex = -1

        for (const sep of separators) {
            const index = string.indexOf(sep)
            if (index !== -1 && (firstIndex === -1 || index < firstIndex)) {
                firstIndex = index
            }
        }

        return firstIndex !== -1 ?
            string.substring(0, firstIndex).trim() :
            string
    },

    
    extractFirstPeriod: (string) => {
        if(!string)
            return string

        const match = String(string).match(/.*?\./)
        return match ? match[0].trim() : string.trim()
    },

    
    generateUniqueRandomString: (prefix) => {
        prefix = prefix || 'key'
        window.randStrGenCount = window.randStrGenCount || 0
        window.randStrGenCount++
        return prefix + "-rand-" + window.randStrGenCount
    },

    
    if: (condition, string) => {
        if(condition) return string
        return ""
    },

    
    limitTextSize: (string, maxChars) => {
        if(!string)
            return null

        if(string.length <= maxChars) {
            return string
        }

        return string.substring(0, maxChars - 5) + "(...)"
    },

    
    limitTextSizeWithoutCroppingWords: (string, maxChars) => {
        if(!string)
            return null

        if (string.length <= maxChars) {
            return string
        }

        const trimmed = string.substring(0, maxChars)
        const lastSpaceIndex = trimmed.lastIndexOf(' ')
        if (lastSpaceIndex === -1) {
            return trimmed + "(...)"
        }

        return trimmed.substring(0, lastSpaceIndex) + "(...)"
    },

    
    stripHTMLTags: (string) => {
        if(!string)
            return ""

        return String(string).replace(/<[^>]*>/g, '')
            .replace(/&nbsp;/gi, ' ')
            .replace(/&quot;/gi, '"')
            .replace(/&#39;/gi, "'")
            .replace(/&amp;/gi, '&')
    },

    
    toDisplayPercentage: (percentage) => {
        if(percentage === null || percentage === undefined || isNaN(percentage))
            return null
        return percentage + "%"
    }
}