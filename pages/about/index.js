import groq from "groq"
import { getClient, getGlobalData } from '../../lib/sanity/sanity.server'
import Header from "../../components/header"
import React from "react"
import Image from "../../components/image"
import Highlight from "../../components/highlight"


export default function Home({ aboutPage, global, locale }) {
    return (
        <div>
            <Header logo={global.logo} />
            <div className="grid grid-cols-1 mt-16 mb-16">
                <h1 className="text-primary4 font-black text-4xl mt-14 mb-12">
                    {aboutPage.title}
                </h1>
                <p>
                    {aboutPage.landingText}
                </p>
                <div className="relative row-start-1 aspect-[4/3]">
                    <Image
                        className='absolute w-full h-full'
                        asset={aboutPage.landingImage.asset}
                        objectFit='object-cover'
                        placeholder={aboutPage.landingImage.metadata.lqip}
                        sizes={[600,1200,1800,2400]}
                    />
                </div>
            </div>

            <div className='relative w-full aspect-square'>
                <Image
                    className='absolute w-full h-full'
                    asset={aboutPage.landingImage.asset}
                    objectFit='object-cover'
                    placeholder={aboutPage.landingImage.metadata.lqip}
                    sizes={[600,1200,1800,2400]}
                />
            </div>

            <Highlight
                highlight = {aboutPage.highlight}
            />


            
        </div>
    )
}

export async function getStaticProps(context) {
    const {locale,defaultLocale} = context
    
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
        }
    `
    var aboutPage = await getClient(context?.preview).fetch(getQuery(locale))

    if(!aboutPage){
        aboutPage = await getClient(context?.preview).fetch(getQuery(defaultLocale))
    }

    const global = await getGlobalData(context?.preview)
    return {
        props: {
            "aboutPage": aboutPage,
            global,
            locale
        }
    }
}