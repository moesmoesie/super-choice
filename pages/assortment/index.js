import { getGlobalData, getClient } from '../../lib/sanity/sanity.server'
import React from "react"
import Layout from "../../components/layout"
import AssortmentPageQuery from '../../lib/sanity/queries/AssortmentPageQuery'
import Image from '../../components/image'
import { Headline1 } from '../../components/headlines'
import SanityBlockContent from '@sanity/block-content-to-react'
import serializers from '../../lib/serializers'

export default function Assortment({ pageData, global, locale }) {
    return (
        <Layout data={global}>
            <LandingImage className="mt-20" image={pageData.landingImage} />
            <LandingSectionMain pageData={pageData} />
            <AssortmentMain pageData={pageData} />
        </Layout>
    )
}

const AssortmentMain = ({ pageData }) => {
    return (
        <>
            <FilterButtonRow filters={pageData.productFilters} />
            <ProductSections products={pageData.products} pageData={pageData} />
        </>
    )
}

const FilterButtonRow = ({ filters }) => {
    return (
        <div className='w-full drop-shadow-md bg-white pb-6'>
            <div className='w-full gap-6 wrapper flex flex-wrap items-center justify-center'>
                {filters.map((filter, index) => <FilterButton key={index} filter={filter} />)}
            </div>
        </div>
    )
}

const FilterButton = ({ filter, value }) => {
    return (
        <button className='py-2 px-6 bg-white border-2 rounded-lg border-primary3 text-primary3'>
            {filter}
        </button>
    )
}

const ProductSections = ({ products, pageData }) => {
    return (
        <div className='bg-[#E0F3FF]'>
            <div className='wrapper w-full grid py-8 gap-y-8 grid-cols-[minmax(auto,22rem)] md:grid-cols-[repeat(2,minmax(auto,22rem))] lg:grid-cols-[repeat(3,minmax(auto,22rem))] gap-8 justify-center place-items-center'>
                {products.map((el, index) =>
                    <ProductCard key={index} cta={pageData.productCtaText} product={el} image={pageData.landingProductImage} />
                )}
            </div>
        </div>
    )
}

const ProductCard = ({ product, cta }) => {
    return (
        <div className='w-full flex min-h-[32rem] flex-col bg-white rounded-md cardShadow'>
            <Image
                className="relative w-full h-64 mt-6 mb-4"
                image={product.image}
                objectFit='object-contain'
            />

            <div className='flex flex-1 flex-col pl-6 pr-6 pb-6'>
                <p className='text-primary3 font-medium font-header text-2xl mb-6'>{product.title}</p>
                <p className='mb-8'>{product.summary}</p>
                <button className='py-2 mt-auto px-6 bg-white border-2 rounded-lg border-primary3 text-primary3'>
                    {cta}
                </button>
            </div>
        </div>
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

const MobileLandingSectionMain = ({ pageData, className }) => {
    return (
        <div className='relative wrapper md:hidden'>
            <Image className={`
                mx-auto w-[70%] max-w-sm aspect-[${pageData.landingProductImage.metadata.dimensions.aspectRatio}]
                -translate-y-28`}
                loading='eager'
                image={pageData.landingProductImage}
            />

            <Headline1 className="-translate-y-10">
                {pageData.title}
            </Headline1>

            <div className="mb-16 row-start-2 col-span-full">
                <SanityBlockContent
                    blocks={pageData.landingContent} serializers={serializers} />
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
                        absolute bottom-0 w-1/2 left-1/2 -translate-x-1/3 aspect-[${pageData.landingProductImage.metadata.dimensions.aspectRatio}]`}
                        loading='eager'
                        image={pageData.landingProductImage}
                    />
                </div>
            </div>
            <div className="">
                <SanityBlockContent
                    blocks={pageData.landingContent} serializers={serializers} />
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
                />
            </div>
            <div className="row-start-2 col-start-1 col-span-3 ">
                <SanityBlockContent
                    blocks={pageData.landingContent} serializers={serializers} />
            </div>
        </div>
    )
}

const LandingImage = ({ className, image }) => {
    return (
        <div className={`md:wrapper ${className}`}>
            <Image
                loading="eager"
                className='relative aspect-[5/4] md:aspect-[5/2] w-full rounded-md overflow-hidden'
                image={image}
                objectFit='object-cover'
                sizes={[600, 1200, 1800, 2400]}
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