import { getGlobalData, getClient } from '../../lib/sanity/sanity.server'
import React from "react"
import CollectionSlugs from '../../lib/sanity/queries/CollectionSlugs'
import ProductDetailPageQuery from '../../lib/sanity/queries/ProductDetailPageQuery'
import { Headline1 } from '../../components/headlines'
import Layout from '../../components/layout'
import Image from '../../components/image'
import SanityBlockContent from '@sanity/block-content-to-react'
import { getSerializer } from '../../lib/serializers'
import ScrollContainer from 'react-indiana-drag-scroll'
import { useState } from 'react'

export default function Assortment({ detailData, global, locale }) {
    return (
        <Layout data={global}>
            <LandingSection detailData={detailData} className='mb-12' />
        </Layout>
    )
}

const LandingSection = ({ detailData, className }) => {
    const [selectedImage, setSelectedImage] = useState(detailData.gallary[0]);


    return (
        <div className={`grid ${className}`}>
            <ProductImage className="mb-6" image={detailData.gallary[0]} />
            <ImagePicker className='mb-2' gallary={detailData.gallary} />
            <Headline1 className='wrapper mb-4'>
                {detailData.title}
            </Headline1>
            <div className='wrapper'>
                <SanityBlockContent
                    blocks={detailData.description}
                    serializers={getSerializer()}
                />
            </div>
        </div>
    )
}

const ImagePicker = ({ gallary, className }) => {
    return (
        <ScrollContainer className={`w-full whitespace-nowrap pb-2 ${className}`}>
            {gallary.map((el) => {
                return <button className='w-24 aspect-square first:ml-4 mr-2 last:mr-4 inline-block bg-[#E2E8F3] rounded-md overflow-hidden'>
                    <Image
                        image={el}
                        className={'relative w-full h-full'}
                        loading='eager'
                        objectFit='object-cover'
                    />
                </button>
            })}
        </ScrollContainer>
    )
}

const ProductImage = ({ image, className }) => {
    return (
        <Image
            image={image}
            className={`relative w-full max-w-xs mx-auto ${className}`}
            loading='eager'
            aspectRatio={image.metadata.dimensions.aspectRatio}
        />
    )
}


export const getStaticPaths = async () => {
    const data = await getClient(false).fetch(CollectionSlugs, { collection: 'product' })
    var paths = data.map((el) => {
        return { params: { slug: el.slug }, locale: el.language }
    })

    return {
        paths: paths,
        fallback: false,
    }
}

export async function getStaticProps(context) {
    const { locale, defaultLocale, params } = context

    var detailData = await getClient(context?.preview).fetch(ProductDetailPageQuery, { locale, slug: params.slug })

    if (!detailData) {
        detailData = await getClient(context?.preview).fetch(ProductDetailPageQuery, { locale: defaultLocale, slug: params.slug })
    }

    const global = await getGlobalData(context?.preview, locale, defaultLocale)

    return {
        props: {
            detailData,
            global,
            locale
        }
    }
}