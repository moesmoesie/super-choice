import { getGlobalData, getClient } from '../../lib/sanity/sanity.server'
import React from "react"
import CollectionSlugs from '../../lib/sanity/queries/CollectionSlugs'
import { Headline1 } from '../../components/headlines'
import Layout from '../../components/layout'
import RecipeDetailPageQuery from '../../lib/sanity/queries/RecipeDetailPageQuery'
import BannerImage from '../../components/BannerImage'
import { getSerializer } from '../../lib/serializers'
import SanityBlockContent from '@sanity/block-content-to-react'

export default function RecipePage({ pageDetail, global, locale }) {
    console.log(pageDetail)
    return (
        <Layout data={global}>
            <div className='wrapper'>
                <BannerImage className='wrapper mb-12' image={pageDetail.bannerImage} />

                <div className='grid mb-12'>
                    <Headline1 className='mb-4'>
                        {pageDetail.title}
                    </Headline1>
                    <div className='grid gap-6'>
                        {pageDetail.steps.map((el, index) => {
                            return (
                                <div className={` flex`}>
                                    <p className=' min-w-[3rem] md:min-w-[4rem] text-3xl text-primary2'>{index + 1}.</p>
                                    <SanityBlockContent blocks={el.content} serializers={getSerializer()} />
                                </div>
                            )
                        })}
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
            locale
        }
    }
}