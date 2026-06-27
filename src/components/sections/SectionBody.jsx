import "./SectionBody.scss"
import React from 'react'
import {useParser} from "/src/hooks/parser.js"
import ArticleCards from "/src/components/articles/ArticleCards.jsx"
import ArticleInfoList from "/src/components/articles/ArticleInfoList.jsx"
import ArticleInlineList from "/src/components/articles/ArticleInlineList.jsx"
import ArticleNotFound from "/src/components/articles/ArticleNotFound.jsx"
import ArticlePortfolio from "/src/components/articles/ArticlePortfolio.jsx"
import ArticleStack from "/src/components/articles/ArticleStack.jsx"
import ArticleSkills from "/src/components/articles/ArticleSkills.jsx"
import ArticleText from "/src/components/articles/ArticleText.jsx"

function SectionBody({ section }) {
    const parser = useParser()
    const articleDataWrappers = parser.parseSectionArticles(section)

    return (
        <div className={`section-body`}>
            {articleDataWrappers && articleDataWrappers.map((dataWrapper, key) => {
                const Component = SectionBody.ARTICLES[dataWrapper.component] || ArticleNotFound
                return <Component dataWrapper={dataWrapper}
                                  id={key}
                                  key={key}/>
            })}
        </div>
    )
}

SectionBody.ARTICLES = {
    ArticleCards,
    ArticleInfoList,
    ArticleInlineList,
    ArticleNotFound,
    ArticlePortfolio,
    ArticleSkills,
    ArticleStack,
    ArticleText,
}

export default SectionBody
