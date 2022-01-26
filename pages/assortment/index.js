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
            <div className='relative wrapper'>
                <LandingProductImage className="mx-auto" image={pageData.landingProductImage} />
         
                <PageTitle className="mb-10">
                    {pageData.title}
                </PageTitle>

                <div className="mb-16">
                    <SanityBlockContent
                        blocks={pageData.landingContent} serializers={serializers} />
                </div>
            </div>
        </Layout>
    )
}

const PageTitle = ({ children, className }) => {
    return (
        <Headline1 className={`${className}`}>
            {children}
        </Headline1>
    )
}

const LandingProductImage = ({ className, image }) => {

    return (
        <div className={`${className}
            max-w-[15rem] bg-red-300 aspect-[${image.metadata.dimensions.aspectRatio}] shadow-2xl
            -translate-y-20
        `}>

            <Image className={`
                w-full h-full 
            `}
            loading='eager'
            image={image}
            
            />

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