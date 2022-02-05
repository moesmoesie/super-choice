import React from "react"
import Layout from "../../../components/layout"
import Seo from "../../../components/Seo"
import Landing from "./Landing"
import ProductCollection from "./ProductCollection"

export default function Assortment({ pageData, preview, global, locale }) {
    return (
        <>
            <Seo seo={pageData.seo} />
            <Layout preview={preview} data={global}>
                <Landing pageData={pageData} />
                <ProductCollection pageData={pageData} />
            </Layout>
        </>
    )
}