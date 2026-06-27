
import React, {createContext, useContext, useState} from 'react'
import {useScheduler} from "/src/hooks/scheduler.js"
import {useLanguage} from "/src/providers/LanguageProvider.jsx"
import ActivitySpinner from "/src/components/loaders/ActivitySpinner.jsx"
import ConfirmationWindowModal from "/src/components/modals/ConfirmationWindowModal.jsx"

function FeedbacksProvider({ children }) {
    const scheduler = useScheduler()
    const language = useLanguage()

    const [spinnerActivities, setSpinnerActivities] = useState([])
    const [pendingConfirmation, setPendingConfirmation] = useState(null)

    const setActivitySpinnerVisible = (visible, activityId, message) => {
        setSpinnerActivities(prev => {
            if (visible) {
                if (prev.some(activity => activity.id === activityId)) return prev
                return [...prev, { id: activityId, message }]
            }
            else {
                return prev.filter(activity => activity.id !== activityId)
            }
        })
    }

    const showActivitySpinnerFor = (milliseconds, activityId, message) => {
        scheduler.clearAllWithTag("spinner-auto-interval")
        setActivitySpinnerVisible(true, activityId, message)
        scheduler.schedule(() => {
            setActivitySpinnerVisible(false, activityId)
        }, milliseconds, "spinner-auto-interval")
    }

    const isShowingActivitySpinner = () => {
        return Boolean(spinnerActivities.length)
    }

    const showConfirmationDialog = (title, message, faIcon, onConfirm, confirmLabel, onCancel, cancelLabel) => {
        setPendingConfirmation({
            title: title,
            message: message,
            faIcon: faIcon,
            onConfirm: onConfirm,
            confirmLabel: confirmLabel,
            onCancel: onCancel,
            cancelLabel: cancelLabel
        })
    }

    const isBlockedByOverlay = () => {
        return Boolean(
            isShowingActivitySpinner() ||
            pendingConfirmation
        )
    }

    return (
        <FeedbacksContext.Provider value={{
            setActivitySpinnerVisible,
            showActivitySpinnerFor,
            isShowingActivitySpinner,

            showConfirmationDialog,
            isBlockedByOverlay
        }}>
            <ActivitySpinner activities={spinnerActivities}
                             defaultMessage={language.getString("loading")}/>

            <ConfirmationWindowModal target={pendingConfirmation}
                                     onDismiss={() => {setPendingConfirmation(null)}}/>

            {children}
        </FeedbacksContext.Provider>
    )
}

const FeedbacksContext = createContext(null)

export const useFeedbacks = () => useContext(FeedbacksContext)

export default FeedbacksProvider
