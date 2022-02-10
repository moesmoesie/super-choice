import { motion } from "framer-motion"
import Link from "next/link"
import Image from "../../../components/image"
import SanityBlockContent from "@sanity/block-content-to-react"
import { getSerializer } from "../../serializers"

export default function ArticleCard({ article, index, cta }) {
    return (
        <Link passHref href={`/news/${article.slug}`}>
            <motion.a
                exit={{ opacity: 0, translateX: -20 }}
                initial={{ opacity: 0, translateX: 20 }}
                animate={{ opacity: 1, translateX: 0, transition: { delay: 0.1 * index } }}
                className='w-full z-20 h-full flex min-h-[32rem] flex-col bg-white overflow-hidden rounded-md cardShadow group'>
                    
                <div className='overflow-hidden h-80 mb-6 w-full'>
                    <Image
                        className="relative group-hover:scale-110 h-full duration-300 w-full  "
                        image={article.previewImage}
                        objectFit='object-cover'
                        mediaQueries={[
                            { w: 1, s: 500 },
                            { w: 500, s: 1000 },
                            { w: 1000, s: 1500 }
                        ]}
                    />
                </div>

                <div className='flex flex-1 flex-col pl-6 pr-6 pb-8'>
                    <p className='text-primary3 font-medium font-header text-3xl truncate'>{article.title}</p>
                    <p className='text-[#8D8F94] font-header mb-6'>{article.date}</p>
                    <div className='mb-8'>
                        <SanityBlockContent
                            blocks={article.summary} serializers={getSerializer()} />
                    </div>
                    <button className={`button2 duration-300 mt-auto group-hover:text-white group-hover:bg-primary3`}>
                        {cta}
                    </button>
                </div>
            </motion.a>
        </Link>
    )
}