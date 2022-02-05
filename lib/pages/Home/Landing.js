import Link from "next/link"

export default function Landing ({ cta }) {
    return (
        <div className="w-full h-screen relative -mt-20">
            <BackgroundVideo/>
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
        <video className="w-full h-full object-cover -z-20 top-0 absolute" autoPlay muted loop id="myVideo">
            <source src="video.mp4" type="video/mp4" />
        </video>
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