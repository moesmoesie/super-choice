import { Headline1 } from "../../../components/headlines"
import SanityBlockContent from "@sanity/block-content-to-react"
import { getSerializer } from "../../serializers"
import Image from "../../../components/image"

export default function ({ title, landingContent, landingImage }) {
    return (
        <div className="grid grid-cols-1 mb-16 lg:gap-4 lg:grid-rows-[min-content,auto] lg:wrapper lg:grid-cols-2">
            <Headline1 className="wrapper mt-16 mb-14 w-full lg:max-w-none lg:px-0">
                {title}
            </Headline1>

            <div className="wrapper !mx-0 !max-w-[900px] lg:max-w-none lg:row-start-2 lg:px-0">
                <SanityBlockContent
                    blocks={landingContent} serializers={getSerializer()} />
            </div>

            <LandingImage className="w-full row-start-1 lg:col-start-2 lg:row-span-3 h-72 lg:h-auto lg:pr-0"
                image={landingImage}
            />
        </div>
    )
}

const LandingImage = ({ className, image }) => {
    return (
        <div className={`relative ${className}`}>
            <Image
                loading="eager"
                className='relative h-full w-full rounded-md overflow-hidden'
                image={image}
                objectFit='object-cover'
                mediaQueries={[
                    { w: 10, s: 500 },
                    { w: 500, s: 1000 },
                    { w: 1000, s: 1500 },
                    { w: 1500, s: 2000 },
                    { w: 2000, s: 2500 },
                ]}
            />
        </div>
    )
}

