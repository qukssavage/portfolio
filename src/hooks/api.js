

import emailjs from "@emailjs/browser"
import {useConstants} from "/src/hooks/constants.js"
import {useUtils} from "/src/hooks/utils.js"

const constants = useConstants()
const utils = useUtils()

export const useApi = () => {
    return {
        validators,
        handlers,
        analytics
    }
}

const validators = {
    
    validateEmailRequest: (name, email, subject, message) => {
        const minWordCountForMessage = 3

        const validations = [
            { errorCode: constants.ErrorCodes.VALIDATION_EMPTY_FIELDS,      errorCondition: !name || !email || !subject || !message },
            { errorCode: constants.ErrorCodes.VALIDATION_EMAIL,             errorCondition: !utils.validation.validateEmail(email) },
            { errorCode: constants.ErrorCodes.VALIDATION_MESSAGE_LENGTH,    errorCondition: !utils.validation.isLongerThan(message, minWordCountForMessage),    messageParameter: minWordCountForMessage + 1},
            { errorCode: constants.ErrorCodes.VALIDATION_MESSAGE_SPAM,      errorCondition: utils.validation.isSpam(message) },
        ]

        const error = validations.find(validation => validation.errorCondition)
        return {
            success: !error,
            errorCode: error?.errorCode,
            errorParameter: error?.messageParameter,
            bundle: {
                name: name,
                from_name: name,
                email: email,
                from_email: email,
                custom_subject: subject,
                message: message,
                custom_source: utils.url.getAbsoluteLocation(),
                custom_source_name: "React Portfolio"
            }
        }
    }
}

const handlers = {
    
    dummyRequest: async () => {
        await new Promise((resolve) => setTimeout(resolve, 700))
        window._dummyRequestSuccess = !window._dummyRequestSuccess

        return {
            success: window._dummyRequestSuccess
        }
    },

    
    sendEmailRequest: async (validationBundle, publicKey, serviceId, templateId) => {
        emailjs.init(publicKey)

        const response = {success: false}

        try {
            const result = await emailjs.send(serviceId, templateId, validationBundle)
            response.success = result.status === 200
        } catch (error) {
            response.success = false
        }

        return response
    }
}

const analytics = {
    reportVisit: async() => {}
}