import Image from "../../../components/image"

export default function ({ className, image }) {
    return (
        <div className={`relative w-full h-96 md:wrapper lg:hidden ${className}`}>
            <Image
                className='relative h-full w-full md:rounded-md overflow-hidden'
                image={image}
                objectFit='object-cover'
                sizes={[600, 1200, 1800, 2400]}
            />
        </div>
    )
}