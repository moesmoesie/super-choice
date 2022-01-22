import { getGlobalData, getClient } from '../../lib/sanity/sanity.server'
import React from "react"
import Layout from "../../components/layout"
import groq from 'groq'
import Image from '../../components/image'
import Highlight from '../../components/highlight'

export default function Home({ sustainabilityPage, global, locale }) {
    return (
        <Layout data={global}>
                <div className="relative w-full md:wrapper mt-20 mb-12 h-96 overflow-hidden">
                    <Image
                        className='relative h-full w-full md:rounded-md overflow-hidden'
                        asset={sustainabilityPage.landingImage.asset}
                        objectFit='object-cover'
                        placeholder={sustainabilityPage.landingImage.metadata.lqip}
                        sizes={[600, 1200, 1800, 2400]}
                    />
                </div>

                <h1 className="wrapper mt-12 mb-12 w-full text-4xl md:text-6xl lg:text-7xl text-primary4 font-black">
                    {sustainabilityPage.title}
                </h1>

                <p className='wrapper mb-12 lg:columns-2'>
                    {sustainabilityPage.landingText}
                </p>

                <Highlight
                    className="md:mb-16"
                    highlight={sustainabilityPage.highlight}
                />
        </Layout>
    )
}

export async function getStaticProps(context) {
    const { locale, defaultLocale } = context

    const getQuery = (locale) => groq`
        *[_type == "sustainabilityPage" && language->languageCode == '${locale}'][0]{
            _id,
            title,
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
            landingText
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