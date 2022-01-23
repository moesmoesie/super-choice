import { urlForImage } from "../lib/sanity/sanity"

export default function Image({id,image,className,objectFit,withPlaceholder=true,loading="lazy",sizes=[]}) {
    const sources = []

    sizes.forEach((size) => {
        const src = urlForImage(image.asset).width(size).format("webp")
        sources.push(`${src} ${size}w`)
    })

    const srcset = sources.join(",")
    const src = urlForImage(image.asset).format("webp")

    return (
        <div className={className} id={id}>
            {image.metadata.lqip && withPlaceholder ? (
                <img
                    className={`w-full h-full top-0 left-0 absolute ${objectFit}`}
                    src={image.metadata.lqip}
                    alt={image?.alt}
                    title={image?.caption}
                    aria-hidden="true">
                </img>
            ) : ''}
            
            <img
                className={`w-full h-full top-0 left-0 absolute ${objectFit}`}
                src={src}
                loading={loading}
                alt={image.alt}
                title={image.caption}
                sizes="100vw"
                srcSet={srcset}
                aria-hidden="true">
            </img>
        </div>

    )
}