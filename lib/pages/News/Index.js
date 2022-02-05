import React from "react"
import Page from '../../../components/Page'
import Landing from "./Landing"
import ArticleCollection from "./ArticleCollection"

export default function News({pageData, global, preview}) {
    return (
        <Page preview={preview} data={global}>
            <Landing className="mb-12" pageData={pageData} />
            <ArticleCollection pageData={pageData}/>
        </Page>
    )
}