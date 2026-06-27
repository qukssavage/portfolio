import "./ArticleItemPreviewMenu.scss"
import React from 'react'
import Link from "/src/components/generic/Link.jsx"
import CircularButton from "/src/components/buttons/CircularButton.jsx"

function ArticleItemPreviewMenu({ itemWrapper, className = "", spaceBetween }) {
    const hasLinks = itemWrapper.preview?.hasLinks
    const links = itemWrapper.preview?.links

    if(!hasLinks) return <div className={`article-item-preview-menu ${className}`}/>

    return (
        <div className={`article-item-preview-menu ${className}`}>
            <div className={`article-item-preview-menu-button-list ${spaceBetween ? `justify-content-end` : ``}`}>
                {links.map((link, key) => (
                    <ItemPreviewMenuCustomLinkButton link={link} key={key}/>
                ))}
            </div>
        </div>
    )
}

function ItemPreviewMenuCustomLinkButton({ link }) {
    const href = link.href
    const tooltip = link.tooltip
    const faIcon = link.faIcon

    return (
        <Link href={href}
              className={`article-item-preview-menu-link`}
              tooltip={tooltip}>
            <CircularButton variant={CircularButton.Variants.DARK}
                            size={CircularButton.Sizes.EXTRA_EXTRA_LARGE}
                            className={`article-item-preview-menu-circular-button`}
                            tooltip={tooltip}
                            faIcon={faIcon}/>
        </Link>
    )
}

export default ArticleItemPreviewMenu
