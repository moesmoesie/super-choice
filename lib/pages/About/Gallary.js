import Image from "../../../components/image"

export default function ({gallary}) {
    return (
        <div className="wrapper hidden h-[55rem] lg:grid lg:grid-cols-2 lg:grid-rows-6 lg:mb-16">

            <GallaryImage className="row-span-6 py-8 pr-6"
                image={gallary.image1}
            />

            <GallaryImage className="row-span-4 pl-6 pb-12"
                image={gallary.image2}
            />

            <GallaryImage className="row-span-2 pl-6"
                image={gallary.image3}
            />
            
        </div>
    )
}

const GallaryImage = ({ className, image }) => {
    return (
        <div className={`relative ${className}`}>
            <Image
                className='relative h-full w-full md:rounded-md overflow-hidden'
                image={image}
                objectFit='object-cover'
                mediaQueries={[
                    { w: 10, s: 500 },
                    { w: 500, s: 1000 },
                    { w: 1000, s: 1500 },
                    { w: 1500, s: 2000 },
                    { w: 2000, s: 2500 },
                ]}
            />
        </div>
    )
}