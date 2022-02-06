import { getGlobalData, getClient } from '../../lib/sanity/sanity.server'
import React from "react"
import Seo from '../../components/Seo'
import RecipeDetail from '../../lib/pages/RecipeDetail/Index'
import { getRichImageQuery, getRichTextEditorQuery } from '../../lib/sanity/components'

export default function RecipePage({ detailData, preview, global, locale }) {
    return (
        <>
            <Seo seo={detailData.seo} />
            <RecipeDetail detailData={detailData} global={global} preview={preview} />
        </>

    )
}

const query = `
    *[
        _type == "recipe" && 
        slug.current == $slug && 
        language->languageCode == $locale][0]{
            _id,
            title,
            seo,
            ${getRichTextEditorQuery('steps')},
            ${getRichTextEditorQuery('instructions')},
            ${getRichImageQuery('bannerImage')}
        }
`

const collectionQuery = `
    *[_type == 'recipe'][]{
        'slug': slug.current,
        'language' : language->languageCode
    }
`

export const getStaticPaths = async () => {
    const data = await getClient(false).fetch(collectionQuery)
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

    var detailData = await getClient(context?.preview).fetch(query, { locale, slug: params.slug })

    if (!detailData) {
        detailData = await getClient(context?.preview).fetch(query, { locale: defaultLocale, slug: params.slug })
    }

    const global = await getGlobalData(context?.preview, locale, defaultLocale)

    return {
        props: {
            detailData,
            global,
            locale,
            'preview': context.preview ?? false
        }
    }
}