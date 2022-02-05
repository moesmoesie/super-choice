import { LandingImage } from "./LandingImage"
import Seo from "../../../components/Seo"
import Layout from "../../../components/layout"
import SanityBlockContent from "@sanity/block-content-to-react"
import { getSerializer } from "../../serializers"
import Highlight from "../../../components/highlight"
import { Headline1 } from "../../../components/headlines"

export default function Sustainability({ pageData, global, preview, locale }) {
    return (
        <>
            <Seo seo={pageData.seo} />
            <Layout preview={preview} data={global}>
                <LandingImage className="w-full mb-12 h-72 md:wrapper"
                    image={pageData.landingImage}
                />

                <Headline1 className='wrapper !max-w-[900px] mt-12 mb-12 w-full'>
                    {pageData.title}
                </Headline1>

                <div className="wrapper !max-w-[900px] mb-12">
                    <SanityBlockContent
                        blocks={pageData.landingContent} serializers={getSerializer()} />
                </div>

                <Highlight
                    className="md:mb-16 !max-w-[900px]"
                    highlight={pageData.highlight}
                />
            </Layout>
        </>
    )
}


