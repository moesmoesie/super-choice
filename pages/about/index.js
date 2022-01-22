import groq from "groq"
import { getClient, getGlobalData } from '../../lib/sanity/sanity.server'
import Header from "../../components/header"
import React from "react"
import Image from "../../components/image"
import Highlight from "../../components/highlight"
import Layout from "../../components/layout"

export default function Home({ aboutPage, global, locale }) {
    return (
        <Layout data={global}>
            <div className="grid grid-cols-1 lg:grid-rows-[min-content,auto] lg:wrapper lg:grid-cols-2 mt-16 mb-16">
                <h1 className="wrapper mt-16 mb-14 w-full text-4xl md:text-6xl lg:max-w-none lg:px-0 text-primary4 font-black">
                    {aboutPage.title}
                </h1>
                <p className="wrapper lg:max-w-none lg:px-0">
                    {aboutPage.landingText}
                </p>
                <div className="relative w-full lg:pr-0 row-start-1 col-start-2 row-span-3 wrapper h-96 lg:h-auto">
                    <Image
                        className='relative h-full w-full rounded-md overflow-hidden'
                        asset={aboutPage.landingImage.asset}
                        objectFit='object-cover'
                        placeholder={aboutPage.landingImage.metadata.lqip}
                        sizes={[600, 1200, 1800, 2400]}
                    />
                </div>
            </div>
            <div className="relative w-full md:wrapper h-96 md:mb-16 lg:hidden">
                <Image
                    className='relative h-full w-full md:rounded-md overflow-hidden'
                    asset={aboutPage.landingImage.asset}
                    objectFit='object-cover'
                    placeholder={aboutPage.landingImage.metadata.lqip}
                    sizes={[600, 1200, 1800, 2400]}
                />
            </div>

            <Highlight
                className="md:mb-16"
                highlight={aboutPage.highlight}
            />

            <div className="wrapper hidden rounded-md h-[55rem] lg:grid grid-cols-2 grid-rows-6 mb-16">
                <div className="relative row-span-6 py-8 pr-6 ">
                    <Image
                        className='relative h-full rounded-md w-full md:rounded-md overflow-hidden'
                        asset={aboutPage.gallary.image1.asset}
                        objectFit='object-cover'
                        placeholder={aboutPage.gallary.image1.asset}
                        sizes={[600, 1200, 1800, 2400]}
                    />
                </div>
                <div className="relative rounded-md row-span-4 pl-6 pb-12">
                    <Image
                        className='relative h-full w-full md:rounded-md overflow-hidden'
                        asset={aboutPage.gallary.image2.asset}
                        objectFit='object-cover'
                        placeholder={aboutPage.gallary.image2.asset}
                        sizes={[600, 1200, 1800, 2400]}
                    />
                </div>
                <div className="relative row-span-2 pl-6 ">
                    <Image
                        className='relative h-full w-full md:rounded-md overflow-hidden'
                        asset={aboutPage.gallary.image3.asset}
                        objectFit='object-cover'
                        asset={aboutPage.gallary.image3.asset}
                        sizes={[600, 1200, 1800, 2400]}
                    />
                </div>
            </div>


        </Layout>
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
            landingText,
            language,
            'highlight' : highlight{
                ...,
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
    console.log(aboutPage)
    return {
        props: {
            "aboutPage": aboutPage,
            global,
            locale
        }
    }
}