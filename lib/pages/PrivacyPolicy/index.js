import BannerImage from "../../../components/BannerImage"
import { Headline1 } from "../../../components/headlines"
import SanityBlockContent from "@sanity/block-content-to-react"
import { getSerializer } from "../../serializers"
import Page from "../../../components/Page"

export default function PrivacyPolicy({ pageData, global, preview, locale }) {
    return (
        <Page preview={preview} data={global}>
            <div className='wrapper mb-12'>
                <BannerImage image={pageData.landingImage} className='mb-12'/>
                <Headline1 className='mb-12'>{pageData.title}</Headline1>
                <div>
                    <SanityBlockContent blocks={pageData.landingContent} serializers={getSerializer()}/>
                </div>
            </div>
        </Page>
    )
}