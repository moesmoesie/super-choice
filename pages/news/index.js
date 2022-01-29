import { getGlobalData, getClient } from '../../lib/sanity/sanity.server'
import React from "react"
import Layout from "../../components/layout"
import NewsPageQuery from '../../lib/sanity/queries/NewsPageQuery'
import { Headline1 } from '../../components/headlines'
import BannerImage from '../../components/BannerImage'
import SanityBlockContent from '@sanity/block-content-to-react'
import serializers from '../../lib/serializers'


export default function News({ pageData, global, locale }) {
    return (
        <Layout data={global}>
            <LandingSection className="mt-16 mb-12" pageData={pageData}/>
        </Layout>
    )
}

const LandingSection = ({ pageData, className }) => {
    return (
        <div className={`wrapper grid lg:grid-rows-[min-content,auto] lg:grid-cols-2 ${className}`}>
            <BannerImage className="mb-14 lg:col-start-2 lg:h-full lg:col-span-full lg:row-span-2 lg:mb-0" image={pageData.landingImage} />
            <Headline1 className="mb-12 lg:my-12 lg:row-start-1">{pageData.title}</Headline1>
            <div className='lg:col-start-1 lg:pb-12 lg:max-w-[80%]'>
                <SanityBlockContent
                    blocks={pageData.landingContent} serializers={serializers} />
            </div>
        </div>
    )
}

export async function getStaticProps(context) {
    const { locale, defaultLocale } = context

    var pageData = await getClient(context?.preview).fetch(NewsPageQuery, { locale })

    if (!pageData) {
        pageData = await getClient(context?.preview).fetch(NewsPageQuery, { locale: defaultLocale })
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