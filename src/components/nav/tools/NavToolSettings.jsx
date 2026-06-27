import React from 'react'
import {useLanguage} from "/src/providers/LanguageProvider.jsx"
import OptionPickerButton from "/src/components/buttons/OptionPickerButton.jsx"
import {useTheme} from "/src/providers/ThemeProvider.jsx"

function NavToolSettings({ options }) {
    const theme = useTheme()
    const language = useLanguage()

    const displayOptions = [{
        id: "options",
        faIcon: "fa-solid fa-cog",
        label: language.getString("options")
    }]

    if(options.includes(NavToolSettings.Options.THEME)) {
        const selectedTheme = theme.getSelectedTheme()

        displayOptions.push({
            id: NavToolSettings.Options.THEME,
            faIcon: selectedTheme.icon,
            label: language.getString("change_theme")
        })
    }

    const _onOptionClicked = (optionId) => {
        if(optionId === NavToolSettings.Options.THEME)
            theme.toggle()
    }

    return (
        <OptionPickerButton mode={OptionPickerButton.Modes.MODE_DROPDOWN}
                            options={displayOptions}
                            selectedOptionId={"options"}
                            onOptionSelected={_onOptionClicked}
                            tooltipLabel={displayOptions[0].label}
                            dropup={true}/>
    )
}

NavToolSettings.Options = {
    THEME: "theme"
}

export default NavToolSettings
