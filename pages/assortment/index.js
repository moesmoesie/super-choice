import {getGlobalData, getClient} from '../../lib/sanity/sanity.server'
import React from "react"
import Layout from "../../components/layout"
import groq from 'groq'

export default function Assortment({ assortmentPage, global, locale }) {
    return (
        <Layout data={global}>
            <div className="h-full w-full grid place-items-center">
                <h1 className="text-black">{assortmentPage.title}</h1>
            </div>
        </Layout>
    )
}

export async function getStaticProps(context) {
    const {locale,defaultLocale} = context

    const getQuery = (locale) => groq`
        *[_type == "assortmentPage" && language->languageCode == '${locale}'][0]{
            _id,
            title,
            'locale' : language->languageCode
        }
    `
    
    var assortmentPage = await getClient(context?.preview).fetch(getQuery(locale))

    if(!assortmentPage){
        assortmentPage = await getClient(context?.preview).fetch(getQuery(defaultLocale))
    }

    const global = await getGlobalData(context?.preview, locale, defaultLocale)

    return {
        props: {
            "assortmentPage": assortmentPage,
            global,
            locale
        }
    }
}