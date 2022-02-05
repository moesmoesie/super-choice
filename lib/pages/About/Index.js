import React from "react"
import Highlight from "../../../components/highlight"
import Layout from "../../../components/layout"
import Seo from "../../../components/Seo"
import Gallary from "./Gallary"
import Landing from "./Landing"
import SmallScreenImage from "./SmallScreenImage"

export default function About({ pageData, preview, global, locale }) {
    return (
        <>
            <Seo seo={pageData.seo} />
            <Layout preview={preview} data={global}>
                <Landing
                    title={pageData.title}
                    landingContent={pageData.landingContent}
                    landingImage={pageData.landingImage}
                />

                <SmallScreenImage className="md:mb-16"
                    image={pageData.gallary.image2}
                />

                <Highlight
                    className="md:mb-16"
                    highlight={pageData.highlight}
                />

                <Gallary gallary={pageData.gallary} />
            </Layout>
        </>
    )
}