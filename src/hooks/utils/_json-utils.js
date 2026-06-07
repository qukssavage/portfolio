

export const _jsonUtils = {
    
    sanitizeForLogs: (json) => {
        const hasFilledField = Object.values(json).some((value) => { return value })

        if(!hasFilledField)
            return ""

        return JSON.stringify(json).replaceAll(`",`, `",<br>`)
            .replaceAll(`":`, `": `)
            .replaceAll(`"`, ``)
            .replaceAll(`{`, ``)
            .replaceAll(`}`, ``)
            .replaceAll(` ,`, ``)
    }
}