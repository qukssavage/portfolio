

export const _arrayUtils = {
    
    hasDuplications: (array, key) => {
        const seen = new Set()
        for (const item of array) {
            if (seen.has(item[key]))
                return true

            seen.add(item[key])
        }
        return false
    },

    
    toHtmlList: (array) => {
        if(!array.length)
            return ``

        let list = `<ul class="list-style-none">`
        array.forEach(item => { list += `<li>${item}</li>` })
        return list + `</ul>`
    },

    
    withId: (array, itemId, fallbackId) => {
        const item = array.find(item => item.id === itemId)
        if(item) return item
        return array.find(item => item.id === fallbackId)
    }
}