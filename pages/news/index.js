import { getGlobalData, getClient } from '../../lib/sanity/sanity.server'
import React from "react"
import Seo from '../../components/Seo'
import NewsPage from '../../lib/pages/News'
import { getRichImageQuery, getRichTextEditorQuery } from '../../lib/sanity/components'

export default function News({ pageData, global, preview, locale }) {
    return (
        <>
            <Seo seo={pageData.seo} />
            <NewsPage
                pageData={pageData}
                global={global}
                preview={preview}
            />
        </>
    )
}

const query = `
    *[_type == "newsPage" && language->languageCode == $locale][0]{
        _id,
        title,
        seo,
        'articleFilters' : articleFilters[]{
            value,
            title
        },
        ${getRichTextEditorQuery('landingContent')},
        ${getRichImageQuery('landingImage')},
        'articles' : articles[]->{
            _id,
            'slug' : slug.current,
            title,
            date,
            catagories,
            ${getRichImageQuery('previewImage')},
            ${getRichTextEditorQuery('summary')},
            ${getRichImageQuery('bannerImage')}
        }
    }
`

export async function getStaticProps(context) {
    const { locale, defaultLocale } = context

    var pageData = await getClient(context?.preview).fetch(query, { locale })

    if (!pageData) {
        pageData = await getClient(context?.preview).fetch(query, { locale: defaultLocale })
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