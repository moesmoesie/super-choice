import groq from "groq"
import { getClient, getGlobalData } from '../../lib/sanity/sanity.server'
import React from "react"
import Image from "../../components/image"
import Highlight from "../../components/highlight"
import Layout from "../../components/layout"
import { Headline1 } from "../../components/headlines"
import SanityBlockContent from "@sanity/block-content-to-react"
import {getSerializer} from "../../lib/serializers"

export default function Home({ aboutPage,preview, global, locale }) {
    return (
        <Layout preview={preview} data={global}>
            {/* Landing Section */}
            <div className="grid grid-cols-1 mb-16 lg:gap-4 lg:grid-rows-[min-content,auto] lg:wrapper lg:grid-cols-2">
                <Headline1 className="wrapper mt-16 mb-14 w-full lg:max-w-none lg:px-0">
                    {aboutPage.title}
                </Headline1>

                <div className="wrapper !mx-0 !max-w-[900px] lg:max-w-none lg:row-start-2 lg:px-0">
                    <SanityBlockContent
                        blocks={aboutPage.landingContent} serializers={getSerializer()} />
                </div>

                <LandingImage className="w-full row-start-1 lg:col-start-2 lg:row-span-3 h-72 lg:h-auto lg:pr-0"
                    image={aboutPage.landingImage}
                />
            </div>

            <SmallScreenImage className="relative w-full h-96 md:wrapper md:mb-16"
                image={aboutPage.gallary.image3}
            />

            <Highlight
                className="md:mb-16"
                highlight={aboutPage.highlight}
            />

            {/* Gallary */}
            <div className="wrapper hidden rounded-md h-[55rem] lg:grid lg:grid-cols-2 lg:grid-rows-6 lg:mb-16">

                <GallaryImage className="row-span-6 py-8 pr-6"
                    image={aboutPage.gallary.image1}
                />

                <GallaryImage className="row-span-4 pl-6 pb-12"
                    image={aboutPage.gallary.image2}
                />

                <GallaryImage className="row-span-2 pl-6"
                    image={aboutPage.gallary.image3}
                />
            </div>
        </Layout>
    )
}

const SmallScreenImage = ({ className, image }) => {
    return (
        <>
            <div className={`relative lg:hidden ${className}`}>
                <Image
                    className='relative h-full w-full md:rounded-md overflow-hidden'
                    image={image}
                    objectFit='object-cover'
                    sizes={[600, 1200, 1800, 2400]}
                />
            </div>
        </>
    )
}

const LandingImage = ({ className, image }) => {
    return (
        <>
            <div className={`relative ${className}`}>
                <Image
                    loading="eager"
                    className='relative h-full w-full rounded-md overflow-hidden'
                    image={image}
                    objectFit='object-cover'
                    sizes={[600, 1200, 1800, 2400]}
                />
            </div>
        </>
    )
}

const GallaryImage = ({ className, image }) => {
    return (
        <>
            <div className={`relative ${className}`}>
                <Image
                    className='relative h-full w-full md:rounded-md overflow-hidden'
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
     *[_type == "aboutPage" && language->languageCode == '${locale}'][0]{
            _id,
            title,
            'locale' : language->languageCode,
            'landingImage' : landingImage{
                ...,
                'metadata': asset->metadata
            },
            landingContent,
            language,
            'highlight' : highlight{
                ...,
                'callToAction': callToAction{
                    text,
                    'slug': "/" + internalPage->slug
                },
                'image' : image{
                    ...,
                    'metadata': asset->metadata
                }
            },
            gallary{
                'image1' : image1{
                    ...,
                    'metadata': asset->metadata,
                },
                'image2' : image2{
                    ...,
                    'metadata': asset->metadata,
                },
                'image3' : image3{
                    ...,
                    'metadata': asset->metadata,
                },
            }
        }
    `
    var aboutPage = await getClient(context?.preview).fetch(getQuery(locale))

    if (!aboutPage) {
        aboutPage = await getClient(context?.preview).fetch(getQuery(defaultLocale))
    }

    const global = await getGlobalData(context?.preview, locale, defaultLocale)
    return {
        props: {
            "aboutPage": aboutPage,
            global,
            locale,
            'preview': context.preview ?? false,
        }
    }
}