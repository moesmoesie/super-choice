import Image from "./image"
export default ({ image, className }) => {
    return (
        <Image
            className={`relative w-full h-72 md:h-80 rounded-md overflow-hidden ${className}`}
            objectFit="object-cover"
            image={image}
        />
    )
}

