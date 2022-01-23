import Link from "next/link"
import Image from "./image"

export default function Highlight(props) {
    const { highlight } = props
    const hasCta = highlight.callToAction != undefined
    const hasImage = highlight?.image?.asset != undefined

    return (
        <div className={`md:wrapper lg:max-w-none ${props.className}`}>
            <div className="wrapper py-12 bg-primary3 md:rounded-md">
                <div className="flex gap-7 items-center">
                    <div className="flex-1">
                        <HeadlineTitle className="mb-6">
                            {highlight?.title}
                        </HeadlineTitle>

                        <HighlightText hasImage={hasImage}>
                            {highlight?.text}
                        </HighlightText>

                        {hasCta && (
                            <div className="pt-8">
                                <HighlightCta cta={highlight.callToAction} />
                            </div>
                        )}
                    </div>

                    {hasImage && (
                        <HighlightImage className="w-44 h-44" image={highlight.image} />
                    )}
                </div>
            </div>
        </div>
    )
}

const HighlightText = ({ className, children, hasImage }) => {
    return (
        <>
            <p className={`text-white  ${hasImage ? '' : 'md:columns-2'} ${className}`}>
                {children}
            </p>
        </>
    )
}

const HighlightCta = ({ className, cta }) => {
    return (
        <>
            <Link href='#'>
                <a className={`button bg-primary5 text-xs ${className}`}>
                    {cta.text}
                </a>
            </Link>
        </>
    )
}

const HeadlineTitle = ({ className, children }) => {
    return (
        <>
            <p className={`text-4xl font-bold text-white md:text-5xl ${className}`}>
                {children}
            </p>
        </>
    )
}

const HighlightImage = ({ className, image }) => {
    return (
        <>
            <div className={`relative hidden md:block rounded-full overflow-hidden bg-red-300 ${className}`}>
                <Image
                    className='relative h-full w-full md:rounded-md overflow-hidden'
                    asset={image.asset}
                    objectFit='object-cover'
                    sizes={[600]}
                />
            </div>
        </>
    )
}