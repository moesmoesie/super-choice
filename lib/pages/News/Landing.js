import BannerImage from '../../../components/BannerImage'
import { Headline1 } from '../../../components/headlines'
import SanityBlockContent from '@sanity/block-content-to-react'
import { getSerializer } from '../../serializers'

export default function Landing ({ pageData, className }) {
    return (
        <div className={`wrapper grid lg:grid-rows-[min-content,auto] lg:grid-cols-2 ${className}`}>
            <BannerImage className="mb-14 lg:col-start-2 lg:h-full lg:col-span-full lg:row-span-2 lg:mb-0" 
                image={pageData.landingImage} />
            <Headline1 className="mb-12 lg:my-12 lg:row-start-1">
                {pageData.title}
            </Headline1>
            <div className='lg:col-start-1 lg:pb-12 lg:max-w-[80%]'>
                <SanityBlockContent
                    blocks={pageData.landingContent} serializers={getSerializer()} />
            </div>
        </div>
    )
}