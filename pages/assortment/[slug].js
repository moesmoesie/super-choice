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
    function onPick(image) {
        setSelectedImage(image)
    }

    return (
        <>
            <SmallLandingSection
                className={className}
                selectedImage={selectedImage}
                onPick={onPick}
                detailData={detailData} />
        </>

    )
}

const SmallLandingSection = ({ detailData, className, selectedImage, onPick }) => {
    return (
        <div className={`grid md:hidden ${className}`}>
            <ProductImage className="mb-6" image={selectedImage} />
            <ImagePicker className='mb-2' onPick={onPick} gallary={detailData.gallary} />
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

const ImagePicker = ({ gallary, className, onPick }) => {
    return (
        <ScrollContainer className={`w-full grid place-items-center whitespace-nowrap pb-2 ${className}`}>
            <div>
                {gallary.map((image, index) => {
                    return <ImagePickerButton
                        onPick={onPick}
                        image={image}
                        key={index}
                        className='mr-2 first:ml-4 last:mr-4'
                    />
                })}
            </div>
        </ScrollContainer>
    )
}

const ImagePickerButton = ({ className, image, onPick }) => {
    return (
        <button className={`
            ${className}
            w-24 aspect-square bg-[#E2E8F3] rounded-md overflow-hidden`}
            onClick={(e) => onPick(image)}
        >
            <Image
                image={image}
                className={'relative w-full h-full'}
                loading='eager'
                objectFit='object-cover'
            />
        </button>
    )
}

const ProductImage = ({ image, className }) => {
    return (
        <Image
            image={image}
            className={`relative h-60 rounded-md overflow-hidden w-full ${className}`}
            loading='eager'
            objectFit='object-contain'
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