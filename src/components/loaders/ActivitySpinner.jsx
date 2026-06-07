import "./ActivitySpinner.scss"
import React, {useEffect, useState} from 'react'

function ActivitySpinner({ activities, defaultMessage }) {
    const visible = Boolean(activities.length)

    const targetActivity = activities.length ?
        activities[0] :
        null

    const message = targetActivity?.message || defaultMessage

    return (
        <>
            {visible && (
                <div id={`activity-spinner`}>
                    <div className={`activity-spinner-content`}>
                        <div className={`spinner-border activity-spinner`}/>

                        <div className={`activity-spinner-message eq-h5`}
                             dangerouslySetInnerHTML={{__html: message}}/>
                    </div>
                </div>
            )}
        </>
    )
}

export default ActivitySpinner