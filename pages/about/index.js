import groq from "groq"
import { getClient, getGlobalData } from '../../lib/sanity/sanity.server'
import Header from "../../components/header"
import React from "react"
import Image from "../../components/image"
import Highlight from "../../components/highlight"
import Layout from "../../components/layout"
import { Headline1 } from "../../components/headlines"
import SanityBlockContent from "@sanity/block-content-to-react"
import Link from "next/link"

const serializers = {
    types: {
        code: (props) => (
            <pre data-language={props.node.language}>
                <code>{props.node.code}</code>
            </pre>
        ),
        block: (props) => {
            if (props.node.style == 'h1') {
                return <Headline1>{props.children}</Headline1>
            }
            return SanityBlockContent.defaultSerializers.types.block(props)
        }
    },
    marks: {
        link: (props) => {
            return <Link href="/"><a className="text-primary3 hover:underline">{props.children}</a></Link>
        },
        strong: (props) => {
            return <span className="font-bold">{props.children}</span>
        },
        em: (props) => {
            return <span className="italic">{props.children}</span>
        }
    }
}

export default function Home({ aboutPage, global, locale }) {
    return (
        <Layout data={global}>
            {/* Landing Section */}
            <div className="grid grid-cols-1 mt-16 mb-16 lg:grid-rows-[min-content,auto] lg:wrapper lg:grid-cols-2">
                <Headline1 className="wrapper mt-16 mb-14 w-full lg:max-w-none lg:px-0">
                    {aboutPage.title}
                </Headline1>

                <SanityBlockContent className="wrapper lg:max-w-none lg:px-0"
                    blocks={aboutPage.textEditor} serializers={serializers} />


                <LandingImage className="w-full row-start-1 col-start-2 row-span-3 wrapper h-96 lg:h-auto lg:pr-0"
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

const LandingText = ({ children, className }) => {
    return (
        <>
            <p className={`${className}`}>
                {children}
            </p>
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
            landingText,
            textEditor,
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
            locale
        }
    }
}