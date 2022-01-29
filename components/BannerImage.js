import Image from "./image"
const BannerImage = ({ image, className }) => {
    return (
        <Image
            className={`relative w-full h-72 md:h-80 rounded-md overflow-hidden ${className}`}
            objectFit="object-cover"
            image={image}
        />
    )
}

export default BannerImage