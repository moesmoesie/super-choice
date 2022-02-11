import Image from "./image"
import Link from "next/link"

export default function CollectionReferences({title="",items = [] }) {
    return (
        <div className="wrapper mb-24">
            <p className="text-primary4 font-medium text-3xl mb-10" >{title}</p>
            <div className="flex gap-4 md:gap-y-10 relative flex-col md:flex-row md:flex-wrap">
                {items.map((item) => {
                    return <ReferenceItem item={item} />
                })}
            </div>
        </div>
    )
}

const ReferenceItem = ({ item }) => {
    return (
        <Link href={`/recipes/${item.slug}`}>
            <a title={item.title} className="flex items-center md:items-start md:flex-col md:gap-4 group">
                <Image
                    className='w-32 h-32 min-w-[8rem] mr-5 rounded-md  relative overflow-hidden md:w-60 md:h-40'
                    imageClassname='group-hover:scale-110 transition-transform'
                    objectFit='object-cover'
                    image={item.previewImage}
                    mediaQueries={[
                        { w: 1, s: 500 },
                    ]}
                />

                <div className="flex flex-col items-start gap-2">
                    <p className="text-primary3  md:truncate md:max-w-[225px] text-xl items-start md:text-lg">{item.title}</p>
                    <p className="flex items-center gap-2 text-primary4 font-medium">
                        <span><ArrowIcon /></span>
                        See recipe
                    </p>
                </div>
            </a>
        </Link>
    )
}


const ArrowIcon = () => {
    return (
        <svg className="w-5 h-5" width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="6" cy="6" r="6" fill="#66C3FF" />
            <path fill-rule="evenodd" clip-rule="evenodd" d="M4.07129 3.40234L8.57129 6.00042L4.07129 8.5985L4.07129 3.40234Z" fill="white" />
        </svg>
    )
}