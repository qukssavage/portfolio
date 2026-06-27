import "./NavToolList.scss"
import React from 'react'
import {useLanguage} from "/src/providers/LanguageProvider.jsx"
import {useTheme} from "/src/providers/ThemeProvider.jsx"
import NavToolLanguagePicker from "/src/components/nav/tools/NavToolLanguagePicker.jsx"
import NavToolThemePicker from "/src/components/nav/tools/NavToolThemePicker.jsx"

function NavToolList({ expanded }) {
    const language = useLanguage()
    const theme = useTheme()

    const shrinkClass = expanded ? `` : `nav-tools-shrink`

    return (
        <div className={`nav-tools ${shrinkClass}`}>
            {language.supportsMultipleLanguages && (
                <div className={`nav-tools-item`}>
                    <NavToolLanguagePicker/>
                </div>
            )}
            {theme.supportsMultipleThemes && (
                <div className={`nav-tools-item`}>
                    <NavToolThemePicker/>
                </div>
            )}
        </div>
    )
}

export default NavToolList
