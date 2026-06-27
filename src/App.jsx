import React, {useEffect, useState} from 'react'
import {useApi} from "/src/hooks/api.js"
import {useConstants} from "/src/hooks/constants.js"
import {useUtils} from "/src/hooks/utils.js"
import Preloader from "/src/components/loaders/Preloader.jsx"
import DataProvider, {useData} from "/src/providers/DataProvider.jsx"
import LanguageProvider from "/src/providers/LanguageProvider.jsx"
import ViewportProvider from "/src/providers/ViewportProvider.jsx"
import ThemeProvider from "/src/providers/ThemeProvider.jsx"
import LocationProvider from "/src/providers/LocationProvider.jsx"
import FeedbacksProvider from "/src/providers/FeedbacksProvider.jsx"
import InputProvider from "/src/providers/InputProvider.jsx"
import NavigationProvider from "/src/providers/NavigationProvider.jsx"
import Portfolio from "/src/components/Portfolio.jsx"

const App = () => {
    return (
        <AppEssentialsWrapper>
            <AppCapabilitiesWrapper>
                <Portfolio />
            </AppCapabilitiesWrapper>
        </AppEssentialsWrapper>
    )
}

const AppEssentialsWrapper = ({ children }) => {
    const api = useApi()
    const utils = useUtils()
    const constants = useConstants()

    const [settings, setSettings] = useState()

    useEffect(() => {
        if (window.location.pathname !== utils.file.BASE_URL)
            window.history.pushState({}, '', utils.file.BASE_URL)

        utils.file.loadJSON("/data/settings.json").then(response => {
            _applyDeveloperSettings(response)
            setSettings(response)

        })

        api.analytics.reportVisit().then(() => {})
    }, [])

    const _applyDeveloperSettings = (settings) => {
        const developerSettings = settings?.developerSettings
        const debugMode = developerSettings?.debugMode
        const fakeEmailRequests = developerSettings?.fakeEmailRequests
        const stayOnThePreloaderScreen = developerSettings?.stayOnThePreloaderScreen

        if (constants.PRODUCTION_MODE)
            return settings

        if (debugMode) {
            settings.preloaderSettings.enabled = stayOnThePreloaderScreen
            settings.templateSettings.backgroundStyle = "plain"
            utils.storage.setWindowVariable("suspendAnimations", true)
        }

        if (fakeEmailRequests)
            utils.storage.setWindowVariable("fakeEmailRequests", true)

        if (stayOnThePreloaderScreen)
            utils.storage.setWindowVariable("stayOnThePreloaderScreen", true)
    }

    return (
        <React.StrictMode>
            {settings && (
                <Preloader preloaderSettings={settings["preloaderSettings"]}>
                    <DataProvider settings={settings}>
                        {children}
                    </DataProvider>
                </Preloader>
            )}
        </React.StrictMode>
    )
}

const AppCapabilitiesWrapper = ({ children }) => {
    const data = useData()

    const [selectedThemeId, setSelectedThemeId] = useState(null)

    const appSettings = data.getSettings()
    const appStrings = data.getStrings()
    const appSections = data.getSections()
    const appCategories = data.getCategories()

    const supportedLanguages = appSettings["supportedLanguages"]
    const supportedThemes = appSettings["supportedThemes"]
    const defaultLanguageId = appSettings["templateSettings"].defaultLanguageId
    const defaultThemeId = appSettings["templateSettings"].defaultThemeId
    const showSpinnerOnThemeChange = appSettings["templateSettings"].showSpinnerOnThemeChange

    return (
        <LanguageProvider supportedLanguages={supportedLanguages}
                          defaultLanguageId={defaultLanguageId}
                          appStrings={appStrings}
                          selectedThemeId={selectedThemeId}>
            <ViewportProvider>
                <InputProvider>
                    <FeedbacksProvider>
                        <ThemeProvider supportedThemes={supportedThemes}
                                       defaultThemeId={defaultThemeId}
                                       showSpinnerOnThemeChange={showSpinnerOnThemeChange}
                                       onThemeChanged={setSelectedThemeId}>
                            <LocationProvider sections={appSections}
                                              categories={appCategories}>
                                <NavigationProvider sections={appSections}
                                                    categories={appCategories}>
                                    {children}
                                </NavigationProvider>
                            </LocationProvider>
                        </ThemeProvider>
                    </FeedbacksProvider>
                </InputProvider>
            </ViewportProvider>
        </LanguageProvider>
    )
}

export default App
