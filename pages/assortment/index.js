import { getGlobalData, getClient } from '../../lib/sanity/sanity.server'
import React from "react"
import Layout from "../../components/layout"
import AssortmentPageQuery from '../../lib/sanity/queries/AssortmentPageQuery'
import Image from '../../components/image'
import { Headline1 } from '../../components/headlines'
import SanityBlockContent from '@sanity/block-content-to-react'
import { getSerializer } from '../../lib/serializers'
import { useState } from 'react'
import Link from 'next/link'
import FilterRow from '../../components/FilterRow'
import { useFilterCollection } from '../../lib/hooks/useFilterCollection'
import CollectionGrid from '../../components/CollectionGrid'
import { motion, AnimatePresence } from 'framer-motion'
const PageContext = React.createContext();

export default function Assortment({ pageData, preview, global, locale }) {
    return (
        <Layout preview={preview} data={global}>
            <LandingImage image={pageData.landingImage} />
            <LandingSectionMain pageData={pageData} />
            <AssortmentMain pageData={pageData} />
        </Layout>
    )
}

const AssortmentMain = ({ pageData }) => {
    const [selectedFilter, setSelectedFilter] = useState(null);
    const { data } = useFilterCollection({ collection: pageData.products, filter: selectedFilter })

    function onFilterClick(value) {
        setSelectedFilter(selectedFilter == value ? null : value)
    }

    return (
        <PageContext.Provider value={{ selectedFilter, setSelectedFilter }}>
            <FilterRow onClick={onFilterClick} currentFilter={selectedFilter} filters={pageData.productFilters} />
            <ProductSections products={data ? data : []} pageData={pageData} />
        </PageContext.Provider>
    )
}


const ProductSections = ({ products, pageData }) => {
    return (
        <CollectionGrid>
            <AnimatePresence initial={false}>
                {products.map((product, index) =>
                    <ProductCard
                        index={index}
                        key={product.key}
                        cta={pageData.productCtaText}
                        product={product} />
                )}
            </AnimatePresence>
        </CollectionGrid>
    )
}

const ProductCard = ({ product, cta, index }) => {
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



const LandingSectionMain = ({ pageData }) => {
    return (
        <>
            <MobileLandingSectionMain pageData={pageData} />
            <TabletLandingSectionMain pageData={pageData} />
            <DesktopLandingSectionMain pageData={pageData} />
        </>
    )
}

const MobileLandingSectionMain = ({ pageData }) => {
    return (
        <div className='relative wrapper md:hidden'>
            <Image className={`
                mx-auto w-[70%] max-w-[20rem] h-[25rem]
                -translate-y-28`}
                objectFit={'object-contain'}
                loading='eager'
                imageClassname={'object-bottom'}
                image={pageData.landingProductImage}
                mediaQueries={[
                    { w: 1, s: 712 },
                ]}
            />

            <Headline1 className="-translate-y-10">
                {pageData.title}
            </Headline1>

            <div className="mb-16 row-start-2 col-span-full">
                <SanityBlockContent
                    blocks={pageData.landingContent} serializers={getSerializer()} />
            </div>
        </div>
    )
}

const TabletLandingSectionMain = ({ pageData, className }) => {
    return (
        <div className='relative wrapper hidden md:block lg:hidden mb-16'>
            <div className='flex items-baseline mt-12 mb-4'>
                <Headline1 className="flex-2">
                    {pageData.title}
                </Headline1>
                <div className='flex-3 relative w-full bg-red-300'>
                    <Image className={`
                        absolute h-[25rem] bottom-0 w-1/2 left-1/2 -translate-x-1/3`}
                        loading='eager'
                        objectFit={'object-contain'}
                        imageClassname={'object-bottom'}
                        image={pageData.landingProductImage}
                        mediaQueries={[
                            { w: 1, s: 500 },
                            { w: 500, s: 1000 },
                            { w: 1000, s: 1200 }
                        ]}
                    />
                </div>
            </div>
            <div className="">
                <SanityBlockContent
                    blocks={pageData.landingContent} serializers={getSerializer()} />
            </div>
        </div>
    )
}

const DesktopLandingSectionMain = ({ pageData, className }) => {
    return (
        <div className='relative wrapper hidden lg:grid grid-cols-5 grid-rows-[min-content,auto] mb-16'>
            <Headline1 className="col-start-1 col-span-3 py-12">
                {pageData.title}
            </Headline1>
            <div className='col-start-4 col-span-full row-start-1 row-span-full'>
                <Image className={`relative max-w-full w-96 mx-auto h-full scale-[1.2] -translate-y-1 origin-bottom`}
                    objectFit={"object-contain"}
                    loading='eager'
                    image={pageData.landingProductImage}
                    mediaQueries={[
                        { w: 1, s: 500 },
                        { w: 500, s: 1000 },
                        { w: 1000, s: 1200 }
                    ]}
                />
            </div>
            <div className="row-start-2 col-start-1 col-span-3 ">
                <SanityBlockContent
                    blocks={pageData.landingContent} serializers={getSerializer()} />
            </div>
        </div>
    )
}

const LandingImage = ({ className, image }) => {
    return (
        <div className={`md:wrapper ${className}`}>
            <Image
                loading="eager"
                className='relative h-72 w-full rounded-md overflow-hidden'
                image={image}
                objectFit='object-cover'
                mediaQueries={[
                    { w: 1, s: 500 },
                    { w: 500, s: 1000 },
                    { w: 1000, s: 1200 }
                ]}
            />
        </div>
    )
}

export async function getStaticProps(context) {
    const { locale, defaultLocale } = context

    var pageData = await getClient(context?.preview)
        .fetch(AssortmentPageQuery, { locale })

    if (!pageData) {
        pageData = await getClient(context?.preview)
            .fetch(AssortmentPageQuery, { locale: defaultLocale })
    }

    const global = await getGlobalData(context?.preview, locale, defaultLocale)

    return {
        props: {
            pageData,
            global,
            locale
        }
    }
}