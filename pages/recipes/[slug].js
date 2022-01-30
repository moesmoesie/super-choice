import { getGlobalData, getClient } from '../../lib/sanity/sanity.server'
import React from "react"
import CollectionSlugs from '../../lib/sanity/queries/CollectionSlugs'
import { Headline1 } from '../../components/headlines'
import Layout from '../../components/layout'
import RecipeDetailPageQuery from '../../lib/sanity/queries/RecipeDetailPageQuery'

export default function RecipePage({ pageData, global, locale }) {
    return (
        <Layout data={global}>
            <Headline1 className={'wrapper'}>
                {pageData.title}
            </Headline1>
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

    var pageData = await getClient(context?.preview).fetch(RecipeDetailPageQuery, { locale, slug: params.slug })

    if (!pageData) {
        pageData = await getClient(context?.preview).fetch(RecipeDetailPageQuery, { locale: defaultLocale, slug: params.slug })
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