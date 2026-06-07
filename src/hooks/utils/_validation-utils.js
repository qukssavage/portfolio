

export const _validationUtils = {
    
    isSpam: (message) => {
        const matches = message.match(/[a-z]/gi)

        if(!matches || !matches.length || matches.length/message.length < 0.5)
            return false

        if (message.length < 10 || (message.match(/\s/g) || []).length < 1)
            return true

        const letterMatches = message.match(/[a-zA-Z]/g)
        const letterRatio = (letterMatches ? letterMatches.length : 0) / message.length
        if (letterRatio < 0.5)
            return true

        const vowelMatches = message.match(/[aeiou]/gi)
        const vowelRatio = (vowelMatches ? vowelMatches.length : 0) / (letterMatches ? letterMatches.length : 1)
        if (vowelRatio < 0.25)
            return true

        const uniqueVowels = new Set(vowelMatches?.map(v => v.toLowerCase()))
        if (uniqueVowels.size < 2)
            return true

        return false
    },

    
    isLongerThan: (string, words) => {
        const wordCount = string.trim().split(/\s+/).length
        return wordCount > words
    },

    
    validateEmail: (string) => {
        return Boolean(String(string)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            ))
    }
}