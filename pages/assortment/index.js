import {getGlobalData, getClient} from '../../lib/sanity/sanity.server'
import React from "react"
import Layout from "../../components/layout"
import AssortmentPageQuery from '../../lib/sanity/queries/AssortmentPageQuery'

export default function Assortment({ pageData, global, locale }) {
    console.log(pageData)
    return (
        <Layout data={global}>
            <div className="h-full w-full grid place-items-center">
                <h1 className="text-black">{pageData.title}</h1>
            </div>
        </Layout>
    )
}

export async function getStaticProps(context) {
    const {locale,defaultLocale} = context

    var pageData = await getClient(context?.preview)
        .fetch(AssortmentPageQuery,{locale})

    if(!pageData){
        pageData = await getClient(context?.preview)
            .fetch(AssortmentPageQuery,{locale: defaultLocale})
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