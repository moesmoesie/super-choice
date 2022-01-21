import {getGlobalData, getClient} from '../../lib/sanity/sanity.server'
import React from "react"
import Layout from "../../components/layout"
import groq from 'groq'

export default function RecipesPage({ recipesPage, global, locale }) {
    return (
        <Layout data={global}>
            <div className="min-h-screen  w-full grid place-items-center">
                <h1 className="text-black">{recipesPage.title}</h1>
            </div>
        </Layout>
    )
}

export async function getStaticProps(context) {
    const {locale,defaultLocale} = context

    const getQuery = (locale) => groq`
        *[_type == "recipesPage" && language->languageCode == '${locale}'][0]{
            _id,
            title,
            'locale' : language->languageCode
        }
    `
    
    var recipesPage = await getClient(context?.preview).fetch(getQuery(locale))

    if(!recipesPage){
        recipesPage = await getClient(context?.preview).fetch(getQuery(defaultLocale))
    }

    const global = await getGlobalData(context?.preview, locale, defaultLocale)

    return {
        props: {
            "recipesPage": recipesPage,
            global,
            locale
        }
    }
}