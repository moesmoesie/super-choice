import { getGlobalData, getClient } from '../../lib/sanity/sanity.server'
import React from "react"
import Layout from "../../components/layout"
import AssortmentPageQuery from '../../lib/sanity/queries/AssortmentPageQuery'
import Image from '../../components/image'
import { Headline1 } from '../../components/headlines'
import SanityBlockContent from '@sanity/block-content-to-react'
import {getSerializer} from '../../lib/serializers'
import { useState, useContext, useEffect } from 'react'
import Link from 'next/link'
const PageContext = React.createContext();
import FilterRow from '../../components/FilterRow'

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
    const [selectedFilter, setSelectedFilter] = useState(null);

    function onFilterClick(value){
        setSelectedFilter(selectedFilter == value ? null : value)
    }

    return (
        <PageContext.Provider value={{ selectedFilter, setSelectedFilter }}>
            <FilterRow onClick={onFilterClick} currentFilter={selectedFilter} filters={pageData.productFilters} />
            <ProductSections products={pageData.products} pageData={pageData} />
        </PageContext.Provider>
    )
}


const ProductSections = ({ products, pageData }) => {
    const [currentProducts, setCurrentProducts] = useState(products);
    const { selectedFilter} = useContext(PageContext);
    useEffect(() => {
        if(!selectedFilter){
            setCurrentProducts(products)
        }else{
            const p = products.filter((el) => {
                return el.catagories.includes(selectedFilter)
            })
            setCurrentProducts(p)
        }
    }, [selectedFilter]);
   

    return (
        <div className='bg-[#E0F3FF]'>
            <div className='wrapper w-full grid py-8 gap-y-8 grid-cols-[minmax(auto,22rem)] md:grid-cols-[repeat(2,minmax(auto,22rem))] lg:grid-cols-[repeat(3,minmax(auto,22rem))] gap-8 justify-center place-items-center'>
                {currentProducts.map((el, index) =>
                    <ProductCard key={index} cta={pageData.productCtaText} product={el} image={pageData.landingProductImage} />
                )}
            </div>
        </div>
    )
}

const ProductCard = ({ product, cta }) => {
    return (
        <Link href="#">
            <a className='w-full h-full flex min-h-[32rem] flex-col bg-white rounded-md cardShadow group'>
                <Image
                    className="relative w-full h-64 mt-6 mb-4"
                    image={product.image}
                    objectFit='object-contain'
                />
                <div className='flex flex-1 flex-col pl-6 pr-6 pb-6'>
                    <p className='text-primary3 font-medium font-header text-2xl mb-6 truncate'>{product.title}</p>
                    <p className='mb-8'>{product.summary}</p>
                    <button className={`button2 duration-300 mt-auto group-hover:text-white group-hover:bg-primary3`}>
                        {cta}
                    </button>
                </div>
            </a>
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

const MobileLandingSectionMain = ({ pageData, className }) => {
    return (
        <div className='relative wrapper md:hidden'>
            <Image className={`
                mx-auto w-[70%] max-w-sm
                -translate-y-28`}
                loading='eager'
                aspectRatio={pageData.landingProductImage.metadata.dimensions.aspectRatio}
                image={pageData.landingProductImage}
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
                        absolute bottom-0 w-1/2 left-1/2 -translate-x-1/3`}
                        loading='eager'
                        aspectRatio={pageData.landingProductImage.metadata.dimensions.aspectRatio}
                        image={pageData.landingProductImage}
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
                className='relative aspect-[5/4] md:aspect-[10/3] w-full rounded-md overflow-hidden'
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