import Image from "../../../components/image"

export const LandingImage = ({ image, className }) => {
    return (
        <div className={`relative overflow-hidden ${className}`}>
            <Image
                loading='eager'
                className='relative h-full w-full overflow-hidden md:rounded-md'
                image={image}
                objectFit='object-cover'
                mediaQueries={[
                    { w: 1, s: 500 },
                    { w: 500, s: 1000 },
                    { w: 1000, s: 1500 },
                    { w: 1500, s: 2000 },
                    { w: 2000, s: 2500 },
                ]}
            />
        </div>
    )
}