import { urlForImage } from "../lib/sanity/sanity"
import { useRef, useEffect, useState } from "react";

export default function Image({ id, aspectRatio, image, className, objectFit, withPlaceholder = true, loading = "lazy", sizes = [] }) {
    const [isLoaded, setLoaded] = useState(false);
    const imgRef = useRef(null);
    useEffect(() => {
        console.log(aspectRatio)
        if (imgRef.current?.complete) {
            setLoaded(true)
        }
    }, []);


    const sources = []

    sizes.forEach((size) => {
        const src = urlForImage(image.asset).width(size).format("webp")
        sources.push(`${src} ${size}w`)
    })

    const srcset = sources.join(",")
    const src = urlForImage(image.asset).format("webp")

    return (
        <div style={{aspectRatio: `${aspectRatio}`}} className={className} id={id}>
            {image.metadata.lqip && withPlaceholder ? (
                <img
                    className={`w-full h-full top-0 left-0 absolute ${objectFit} ${isLoaded ? "hidden" : ''}`}
                    src={image.metadata.lqip}
                    onLoad={(e) => console.log("Loaded Placeholder")}
                    alt={image?.alt}
                    title={image?.caption}
                    aria-hidden="true">
                </img>
            ) : ''}

            <img
                className={`w-full h-full top-0 left-0 absolute ${objectFit}`}
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