

import {useViewport} from "/src/providers/ViewportProvider.jsx"
import {useLanguage} from "/src/providers/LanguageProvider.jsx"
import {useTheme} from "/src/providers/ThemeProvider.jsx"
import ArticleDataWrapper from "/src/hooks/models/ArticleDataWrapper.js"

export const useParser = () => {
    const viewport = useViewport()
    const language = useLanguage()
    const theme = useTheme()

    
    const parseSectionTitle = (section) => {
        const isLgOrHigher = viewport.isBreakpoint("lg")
        const titleLocales = section.data?.title?.locales || {}

        return {
            title:
                isLgOrHigher ?
                language.getTranslation(titleLocales, "title_long") :
                language.getTranslation(titleLocales, "title_short"),

            prefix:
                isLgOrHigher ?
                language.getTranslation(titleLocales, "title_long_prefix") :
                null,

            navTitle:
                language.getTranslation(titleLocales, "title_short_nav")
        }
    }

    
    const parseSectionArticles = (section) => {
        const articles = section.data?.articles || []
        return articles.map((article, key) => {
            return new ArticleDataWrapper(section, article, language, theme, key + 1)
        })
    }

    return {
        parseSectionTitle,
        parseSectionArticles
    }
}