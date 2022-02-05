import Link from "next/link"
import { motion } from "framer-motion"
import SanityBlockContent from "@sanity/block-content-to-react"
import { getSerializer } from "../../serializers"
import Image from "../../../components/image"

export default function ProductCard ({ product, cta, index }) {
    return (
        <Link passHref href={`assortment/${product.slug}`}>
            <motion.a
                exit={{ opacity: 0, translateX: -20 }}
                initial={{ opacity: 0, translateX: 20 }}
                animate={{ opacity: 1, translateX: 0, transition: { delay: 0.1 * index } }}
                className='w-full z-20 h-full flex min-h-[32rem] flex-col bg-white rounded-md cardShadow group'>
                <Image
                    className="relative w-full group-hover:scale-110 duration-300 h-64 mt-6 mb-6"
                    image={product.image}
                    objectFit='object-contain'
                    mediaQueries={[
                        { w: 1, s: 300 },
                        { w: 500, s: 400 },
                        { w: 1000, s: 500 },
                    ]}
                />
                <div className='flex flex-1 flex-col pl-6 pr-6 pb-8'>
                    <p className='text-primary3 font-medium font-header text-2xl mb-6 truncate'>
                        {product.title}
                    </p>
                    <div className='mb-10'>
                        <SanityBlockContent
                            blocks={product.summary} serializers={getSerializer()} />
                    </div>
                    <button className={`button2 duration-300 mt-auto group-hover:text-white group-hover:bg-primary3`}>
                        {cta}
                    </button>
                </div>
            </motion.a>
        </Link>
    )
}