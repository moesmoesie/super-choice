import Image from "./image"
export default function BannerImage({ image, className }){
    return (
        <Image
            className={`relative w-full h-72 md:h-80 rounded-md overflow-hidden ${className}`}
            objectFit="object-cover"
            loading="eager"
            image={image}
            mediaQueries={[
                { w: 10, s: 500 },
                { w: 500, s: 1000 },
                { w: 1000, s: 1500 },
                { w: 1500, s: 2000 },
                { w: 2000, s: 2500 },
            ]}
        />
    )
}