import "./NavToolList.scss"
import React from 'react'
import {useLanguage} from "/src/providers/LanguageProvider.jsx"
import {useTheme} from "/src/providers/ThemeProvider.jsx"
import NavToolLanguagePicker from "/src/components/nav/tools/NavToolLanguagePicker.jsx"
import NavToolThemePicker from "/src/components/nav/tools/NavToolThemePicker.jsx"
import NavToolSettings from "/src/components/nav/tools/NavToolSettings.jsx"

function NavToolList({ expanded }) {
    const language = useLanguage()
    const theme = useTheme()

    const maxWidgets = expanded ? 4 : 2

    const shrinkClass = expanded ?
        `` :
        `nav-tools-shrink`

    const widgets = [
        ...(language.supportsMultipleLanguages ? ["language"] : []),
        ...(theme.supportsMultipleThemes ? [NavToolSettings.Options.THEME] : []),
    ]

    const visibleWidgets = widgets.length <= maxWidgets ?
        widgets :
        widgets.slice(0, maxWidgets - 1)

    const groupedWidgets = widgets.length <= maxWidgets ?
        [] :
        widgets.slice(maxWidgets - 1)

    return (
        <div className={`nav-tools ${shrinkClass}`}>
            {visibleWidgets.map((item, key) => (
                <div className={`nav-tools-item`}
                     key={key}>
                    {item === "language" && (<NavToolLanguagePicker/>)}
                    {item === NavToolSettings.Options.THEME && (<NavToolThemePicker/>)}
                </div>
            ))}

            {groupedWidgets.length > 0 && (
                <div className={`nav-tools-item`}>
                    <NavToolSettings options={groupedWidgets}/>
                </div>
            )}
        </div>
    )
}

export default NavToolList
