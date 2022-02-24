import { urlForImage } from "../lib/sanity/sanity"
import { useRef, useEffect, useState } from "react";

export default function Image({ id, aspectRatio,imageClassname, image, className, objectFit, withPlaceholder = true, loading = "lazy",  mediaQueries = [],  sizes = [] }) {
    const [isLoaded, setLoaded] = useState(false);
    const imgRef = useRef(null);
    useEffect(() => {
        if (imgRef.current?.complete) {
            setLoaded(true)
        }
    }, []);


    const sources = []

    mediaQueries.forEach((query) => {
        const src = urlForImage(image.asset).width(query.s).auto('format')
        sources.push(`${src} ${query.w}w`)
    })

    const srcset = sources.join(",")
    const src = urlForImage(image.asset).auto('format')

    return (
        <div style={{aspectRatio: `${aspectRatio}`}} className={className} id={id}>
            {image.metadata.lqip && withPlaceholder ? (
                <img
                    className={`w-full h-full top-0 left-0 absolute ${imageClassname} ${objectFit} ${isLoaded ? "hidden" : ''}`}
                    src={image.metadata.lqip}
                    alt={image?.alt}
                    title={image?.caption}
                    aria-hidden="true">
                </img>
            ) : ''}

            <img
                className={`w-full h-full top-0 left-0 absolute ${imageClassname} ${objectFit}`}
                src={src}
                ref={imgRef}
                onLoad={(e) => setLoaded(true)}
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