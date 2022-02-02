import { getGlobalData, getClient } from '../../lib/sanity/sanity.server'
import React from "react"
import CollectionSlugs from '../../lib/sanity/queries/CollectionSlugs'
import { Headline1 } from '../../components/headlines'
import Layout from '../../components/layout'
import RecipeDetailPageQuery from '../../lib/sanity/queries/RecipeDetailPageQuery'
import BannerImage from '../../components/BannerImage'
import { getSerializer } from '../../lib/serializers'
import SanityBlockContent from '@sanity/block-content-to-react'

export default function RecipePage({ pageDetail, preview, global, locale }) {
    return (
        <Layout preview={preview} data={global}>
            <div className='wrapper'>
                <BannerImage className='wrapper mb-12' image={pageDetail.bannerImage} />
                <div className='grid mb-12 md:grid-cols-2'>
                    <Headline1 className='mb-12 md:col-span-2'>
                        {pageDetail.title}
                    </Headline1>
                    <div className='bg-[#E0F3FF] md:ml-12 lg:ml-24 mb-12 md:self-start md:col-start-2 px-4 py-6 rounded-md'>
                        <SanityBlockContent blocks={pageDetail.instructions} serializers={getSerializer()} />
                    </div>
                    <div className='grid gap-6 md:col-start-1 md:row-start-2'>
                        <SanityBlockContent blocks={pageDetail.steps} serializers={getSerializer()} />
                    </div>
                </div>
            </div>
        </Layout>
    )
}



export const getStaticPaths = async () => {
    const data = await getClient(false).fetch(CollectionSlugs, { collection: 'recipe' })
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

    var pageDetail = await getClient(context?.preview).fetch(RecipeDetailPageQuery, { locale, slug: params.slug })

    if (!pageDetail) {
        pageDetail = await getClient(context?.preview).fetch(RecipeDetailPageQuery, { locale: defaultLocale, slug: params.slug })
    }

    const global = await getGlobalData(context?.preview, locale, defaultLocale)

    return {
        props: {
            pageDetail,
            global,
            locale,
            'preview': context.preview ?? false
        }
    }
}