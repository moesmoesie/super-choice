import { getGlobalData, getClient } from '../../lib/sanity/sanity.server'
import React from "react"
import Layout from "../../components/layout"
import groq from 'groq'
import Image from '../../components/image'
import Highlight from '../../components/highlight'
import { Headline1 } from '../../components/headlines'
import SanityBlockContent from '@sanity/block-content-to-react'
import serializers from '../../lib/serializers'

export default function Home({ sustainabilityPage, global, locale }) {
    return (
        <Layout data={global}>
            <LandingImage className="w-full mt-20 mb-12 h-96 md:wrapper"
                image={sustainabilityPage.landingImage}
            />

            <Headline1 className='wrapper mt-12 mb-12 w-full'>
                {sustainabilityPage.title}
            </Headline1>

            <div className="wrapper mb-12">
                <SanityBlockContent
                    blocks={sustainabilityPage.landingContent} serializers={serializers} />
            </div>

            <Highlight
                className="md:mb-16"
                highlight={sustainabilityPage.highlight}
            />
        </Layout>
    )
}

const LandingText = ({ className, children }) => {
    return (
        <>
            <p className={`${className} lg:columns-2`}>
                {children}
            </p>
        </>
    )
}


const LandingImage = ({ className, image }) => {
    return (
        <>
            <div className={`relative overflow-hidden ${className}`}>
                <Image
                    loading='eager'
                    className='relative h-full w-full overflow-hidden md:rounded-md'
                    image={image}
                    objectFit='object-cover'
                    sizes={[600, 1200, 1800, 2400]}
                />
            </div>
        </>
    )
}

export async function getStaticProps(context) {
    const { locale, defaultLocale } = context

    const getQuery = (locale) => groq`
        *[_type == "sustainabilityPage" && language->languageCode == '${locale}'][0]{
            _id,
            title,
            landingContent,
            'locale' : language->languageCode,
            'highlight' : highlight{
            ...,
            'image' : image{
                ...,
                'metadata': asset->metadata
            }
            },
            'landingImage' : landingImage{
            ...,
            'metadata': asset->metadata
            },
        }
    `

    var sustainabilityPage = await getClient(context?.preview).fetch(getQuery(locale))

    if (!sustainabilityPage) {
        sustainabilityPage = await getClient(context?.preview).fetch(getQuery(defaultLocale))
    }

    const global = await getGlobalData(context?.preview, locale, defaultLocale)

    return {
        props: {
            "sustainabilityPage": sustainabilityPage,
            global,
            locale
        }
    }
}