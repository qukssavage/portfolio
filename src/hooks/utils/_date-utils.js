

export const _dateUtils = {
    
    getYearsPassedSince: (date) => {
        const currentDate = new Date()
        const differenceInMilliseconds = currentDate - date
        const millisecondsPerYear = 365.25 * 24 * 60 * 60 * 1000
        return differenceInMilliseconds / millisecondsPerYear
    },

    
    isSameDay: (date) => {
        const currentDate = new Date()
        return date.getDate() === currentDate.getDate() &&
            date.getMonth() === currentDate.getMonth() &&
            date.getFullYear() === currentDate.getFullYear()
    }
}