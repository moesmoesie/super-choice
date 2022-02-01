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

export default function Assortment({ detailData,preview, global, locale }) {
    return (
        <Layout preview={preview} data={global}>
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

            <LargeLandingSection
                className={className}
                selectedImage={selectedImage}
                onPick={onPick}
                detailData={detailData} />
        </>

    )
}

const LargeLandingSection = ({ detailData, className, selectedImage, onPick }) => {
    return (
        <div className={`md:flex wrapper items-start mt-4 hidden ${className}`}>

            {detailData.gallary.length > 1 && (
                <ScrollContainer className={`flex flex-col mt-16 lg:mt-20 items-center gap-4  pb-2 ${className}`}>
                    {detailData.gallary.map((image, index) => {
                        return <ImagePickerButton
                            onPick={onPick}
                            image={image}
                            key={index}
                        />
                    })}
                </ScrollContainer>
            )}

            <Image
                image={selectedImage}
                className={` relative h-[35rem] max-w-full flex-1 rounded-md overflow-hidden ${className}`}
                imageClassname={'object-contain object-top'}
                loading='eager'
                mediaQueries={[
                    { w: 1, s: 500 },
                    { w: 500, s: 1000 },
                    { w: 1000, s: 1500 },
                    { w: 1500, s: 2000 },
                    { w: 2000, s: 2500 },
                ]}
            />

            <div className='flex-1 self-start'>
                <Headline1 className='mb-4 !text-4xl'>
                    {detailData.title}
                </Headline1>

                <SanityBlockContent
                    blocks={detailData.description}
                    serializers={getSerializer()}
                />
            </div>
        </div>
    )
}

const SmallLandingSection = ({ detailData, className, selectedImage, onPick }) => {
    return (
        <div className={`grid md:hidden ${className}`}>
            <Image
                image={selectedImage}
                className={`mb-6 relative h-[20rem] rounded-md overflow-hidden w-full ${className}`}
                loading='eager'
                objectFit='object-contain'
                mediaQueries={[
                    { w: 200, s: 600 },
                    { w: 500, s: 1200 },
                ]}
            />

            {detailData.gallary.length > 1 && (
                <ScrollContainer className={`w-full grid place-items-center whitespace-nowrap pb-2 ${className}`}>
                    <div>
                        {detailData.gallary.map((image, index) => {
                            return <ImagePickerButton
                                onPick={onPick}
                                image={image}
                                key={index}
                                className='mr-2 first:ml-4 last:mr-4'
                            />
                        })}
                    </div>
                </ScrollContainer>
            )}

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

const ImagePickerButton = ({ className, image, onPick }) => {
    return (
        <button className={`
            ${className}
            w-24 bg-orange-100 aspect-square rounded-md overflow-hidden`}
            onClick={(e) => onPick(image)}
        >
            <Image
                image={image}
                className={'relative w-full h-full'}
                loading='eager'
                objectFit='object-cover'
                mediaQueries={[
                    { w: 1, s: 300 },
                    { w: 500, s: 500 },
                ]}
            />
        </button>
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
            locale,
            'preview': context.preview ?? false,
        }
    }
}