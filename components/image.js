import { urlForImage } from "../lib/sanity/sanity"

export default function Image(props) {
    const sources = []

    props.sizes?.forEach((size) => {
        const src = urlForImage(props.asset).width(size).format("webp")
        sources.push(`${src} ${size}w`)
    })

    const srcset = sources.join(",")
    const src = urlForImage(props.asset).format("webp")

    return (
        <div className={`${props.className}`} id={props.id}>
            {props.placeholder ? (
                <img
                    className={`w-full h-full top-0 left-0 absolute ${props.objectFit}`}
                    src={props.placeholder}
                    alt={props.alt}
                    title={props.caption}
                    aria-hidden="true">
                </img>
            ) : ''}
            
            <img
                className={`w-full h-full top-0 left-0 absolute ${props.objectFit}`}
                src={src}
                loading={props.loading}
                alt={props.alt}
                title={props.caption}
                sizes="100vw"
                srcSet={srcset}
                aria-hidden="true">
            </img>
        </div>

    )
}