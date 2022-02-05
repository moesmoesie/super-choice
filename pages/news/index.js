import { getGlobalData, getClient } from '../../lib/sanity/sanity.server'
import React from "react"
import NewsPageQuery from '../../lib/sanity/queries/NewsPageQuery'
import Seo from '../../components/Seo'
import NewsPage from '../../lib/pages/News/Index'

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
            locale,
            'preview': context.preview ?? false,
        }
    }
}