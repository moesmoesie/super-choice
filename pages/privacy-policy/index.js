import { getGlobalData, getClient } from '../../lib/sanity/sanity.server'
import React from "react"
import Layout from "../../components/layout"
import RecipePageQuery from '../../lib/sanity/queries/RecipePageQuery'
import BannerImage from '../../components/BannerImage'
import { Headline1 } from '../../components/headlines'
import SanityBlockContent from '@sanity/block-content-to-react'
import { getSerializer } from '../../lib/serializers'
import PrivacyPolicyPageQuery from '../../lib/sanity/queries/PrivacyPolicyPageQuery'

export default function RecipesPage({ pageData, global, preview, locale }) {
    return (
        <Layout preview={preview} data={global}>
            <div className='wrapper mb-12'>
                <BannerImage image={pageData.landingImage} className='mb-12'/>
                <Headline1 className='mb-12'>{pageData.title}</Headline1>
                <div>
                    <SanityBlockContent blocks={pageData.landingContent} serializers={getSerializer()}/>
                </div>
            </div>
        </Layout>
    )
}

export async function getStaticProps(context) {
    const { locale, defaultLocale } = context

    var pageData = await getClient(context?.preview).fetch(PrivacyPolicyPageQuery, { locale })

    if (!pageData) {
        pageData = await getClient(context?.preview).fetch(PrivacyPolicyPageQuery, { locale: defaultLocale })
    }

    const global = await getGlobalData(context?.preview, locale, defaultLocale)

    return {
        props: {
            pageData,
            global,
            locale,
            'preview': context.preview ?? false,
        }
    }
}