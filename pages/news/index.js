import {getGlobalData, getClient} from '../../lib/sanity/sanity.server'
import React from "react"
import Layout from "../../components/layout"
import groq from 'groq'

export default function News({ newsPage, global, locale }) {
    return (
        <Layout data={global}>
            <div className="h-full w-full grid place-items-center">
                <h1 className="text-black">{newsPage.title}</h1>
            </div>
        </Layout>
    )
}

export async function getStaticProps(context) {
    const {locale,defaultLocale} = context

    const getQuery = (locale) => groq`
        *[_type == "newsPage" && language->languageCode == '${locale}'][0]{
            _id,
            title,
            'locale' : language->languageCode
        }
    `
    
    var newsPage = await getClient(context?.preview).fetch(getQuery(locale))

    if(!newsPage){
        newsPage = await getClient(context?.preview).fetch(getQuery(defaultLocale))
    }

    const global = await getGlobalData(context?.preview, locale, defaultLocale)

    return {
        props: {
            "newsPage": newsPage,
            global,
            locale
        }
    }
}