import React from "react"
import Seo from "../../../components/Seo"
import Landing from "./Landing"
import ProductCollection from "./ProductCollection"
import Page from "../../../components/Page"

export default function Assortment({ pageData, preview, global, locale }) {
    return (
        <>
            <Seo seo={pageData.seo} />
            <Page preview={preview} data={global}>
                <Landing pageData={pageData} />
                <ProductCollection pageData={pageData} />
            </Page>
        </>
    )
}