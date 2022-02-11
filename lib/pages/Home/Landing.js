import Link from "next/link"

export default function Landing({ cta }) {
    return (
        <div className="w-full h-screen relative -mt-20">
            <BackgroundVideo />
            <div className="absolute flex items-center flex-col w-full bottom-14 md:bottom-28 left-1/2 -translate-x-1/2">
                <HeroTitle>
                    Super Choice
                </HeroTitle>

                <CallToAction className="bg-primary4" cta={cta} />
            </div>
        </div>
    )
}

const BackgroundVideo = () => {
    return (
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
            <iframe className="w-screen h-[56.25vw] min-h-screen min-w-[177.77vh] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" 
                src="https://player.vimeo.com/video/675907641?h=03b2257c1b&background=1&autoplay=1&loop=1&byline=0&title=0"
                frameBorder="0" allowFullScreen></iframe>
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