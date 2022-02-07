import BannerImage from "../../../components/BannerImage"
import { Headline1 } from "../../../components/headlines"
import SanityBlockContent from "@sanity/block-content-to-react"
import { getSerializer } from "../../serializers"
import Page from "../../../components/Page"
import BackButton from "../../../components/BackButton"
export default function RecipeDetail({ detailData, global, preview, locale }) {
    return (
        <Page preview={preview} data={global}>
            <>
                <BackButton/>
                <div className='wrapper'>
                    <BannerImage className='wrapper mb-12' image={detailData.bannerImage} />
                    <div className='grid mb-12 md:grid-cols-2'>
                        <Headline1 className='mb-12 md:col-span-2'>
                            {detailData.title}
                        </Headline1>
                        <div className='bg-[#E0F3FF] md:ml-12 lg:ml-24 mb-12 md:self-start md:col-start-2 px-4 py-6 rounded-md'>
                            <SanityBlockContent blocks={detailData.instructions} serializers={getSerializer()} />
                        </div>
                        <div className='grid gap-6 md:col-start-1 md:row-start-2'>
                            <SanityBlockContent blocks={detailData.steps} serializers={getSerializer()} />
                        </div>
                    </div>
                </div>
            </>
        </Page>
    )
}