import Link from "next/link"
import Image from "../../../components/image"
import { useWindowSize } from "../../hooks/useWindowSize"

export default function Landing({ pageData }) {
    return (
        <div className="w-full h-screen relative -mt-20">
            <BackgroundVideo video={pageData.landingVideoUrl} image={pageData.landingImage} />
            <div className="absolute flex items-center flex-col w-full bottom-14 md:bottom-28 left-1/2 -translate-x-1/2">
                <HeroTitle>
                    Super Choice
                </HeroTitle>
                <CallToAction className="bg-primary4" cta={pageData.callToAction1} />
            </div>
        </div>
    )
}

const BackgroundVideo = ({ video, image }) => {
    const size = useWindowSize();

    return (
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
            <Image
                className={'w-screen h-[56.25vw] min-h-screen min-w-[177.77vh] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'}
                image={image}
                loading='eager'
                mediaQueries={[
                    { w: 1, s: 600 },
                    { w: 768, s: 1000 },
                    { w: 1024, s: 2000 },
                    { w: 1500, s: 2500 }
                ]}
            />
            {(size.width > 768) && (
                <iframe aria-label="Super Choice Background Video" className="hidden md:block w-screen h-[56.25vw] min-h-screen min-w-[177.77vh] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                    src={`${video}&background=1&autoplay=1&loop=1&byline=0&title=0&quality=1080p`}
                    frameBorder="0" allowFullScreen loading='eager'></iframe>
            )}
        </div>
    )
}

const HeroTitle = ({ children }) => {
    return (
        <h1
            style={{ textShadow: '2px 2px 5px rgba(0, 0, 0, 0.40)' }}
            className='z-20 w-full text-center font-header text-7xl md:text-9xl uppercase font-black text-white mb-7 md:mb-12'>
            {children}
        </h1>
    )
}


const CallToAction = ({ className, cta }) => {
    return (
        <Link href={cta.slug}>
            <a className={`button rounded-md ${className}`}>
                {cta.text}
            </a>
        </Link>
    )
}