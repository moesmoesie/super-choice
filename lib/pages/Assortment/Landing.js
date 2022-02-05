import Image from "../../../components/image"
import { Headline1 } from "../../../components/headlines"
import SanityBlockContent from "@sanity/block-content-to-react"
import { getSerializer } from "../../serializers"

export default function ({pageData}) {
    return (
        <>
            <LandingImage image={pageData.landingImage}/>
            <MobileLandingSectionMain pageData={pageData} />
            <TabletLandingSectionMain pageData={pageData} />
            <DesktopLandingSectionMain pageData={pageData} />
        </>
    )
}

const LandingImage = ({ className, image }) => {
    return (
        <div className={`md:wrapper ${className}`}>
            <Image
                loading="eager"
                className='relative h-72 w-full rounded-md overflow-hidden'
                image={image}
                objectFit='object-cover'
                mediaQueries={[
                    { w: 1, s: 500 },
                    { w: 500, s: 1000 },
                    { w: 1000, s: 1200 }
                ]}
            />
        </div>
    )
}

const MobileLandingSectionMain = ({ pageData }) => {
    return (
        <div className='relative wrapper md:hidden mt-12'>
            <Headline1 className='mb-8'>
                {pageData.title}
            </Headline1>

            <div className="mb-16 row-start-2 col-span-full">
                <SanityBlockContent
                    blocks={pageData.landingContent} serializers={getSerializer()} />
            </div>
        </div>
    )
}

const TabletLandingSectionMain = ({ pageData, className }) => {
    return (
        <div className='relative wrapper hidden md:block lg:hidden mb-16'>
            <div className='flex items-baseline mt-12 mb-4'>
                <Headline1 className="flex-2">
                    {pageData.title}
                </Headline1>
                <div className='flex-3 relative w-full bg-red-300'>
                    <Image className={`
                        absolute h-[25rem] bottom-0 w-1/2 left-1/2 -translate-x-1/3`}
                        loading='eager'
                        objectFit={'object-contain'}
                        imageClassname={'object-bottom'}
                        image={pageData.landingProductImage}
                        mediaQueries={[
                            { w: 1, s: 500 },
                            { w: 500, s: 1000 },
                            { w: 1000, s: 1200 }
                        ]}
                    />
                </div>
            </div>
            <div className="">
                <SanityBlockContent
                    blocks={pageData.landingContent} serializers={getSerializer()} />
            </div>
        </div>
    )
}

const DesktopLandingSectionMain = ({ pageData, className }) => {
    return (
        <div className='relative wrapper hidden lg:grid grid-cols-5 grid-rows-[min-content,auto] mb-16'>
            <Headline1 className="col-start-1 col-span-3 py-12">
                {pageData.title}
            </Headline1>
            <div className='col-start-4 col-span-full row-start-1 row-span-full'>
                <Image className={`relative max-w-full w-96 mx-auto h-full scale-[1.2] -translate-y-1 origin-bottom`}
                    objectFit={"object-contain"}
                    loading='eager'
                    image={pageData.landingProductImage}
                    mediaQueries={[
                        { w: 1, s: 500 },
                        { w: 500, s: 1000 },
                        { w: 1000, s: 1200 }
                    ]}
                />
            </div>
            <div className="row-start-2 col-start-1 col-span-3 ">
                <SanityBlockContent
                    blocks={pageData.landingContent} serializers={getSerializer()} />
            </div>
        </div>
    )
}