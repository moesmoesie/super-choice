import { getGlobalData, getClient } from '../../lib/sanity/sanity.server'
import React from "react"
import PrivacyPolicyPage from '../../lib/pages/PrivacyPolicy'
import { getRichImageQuery, getRichTextEditorQuery } from '../../lib/sanity/components'

const query = `
    *[_type == "privacyPolicyPage" && language->languageCode == $locale][0]{
        _id,
        title,
        ${getRichTextEditorQuery('landingContent')},
        ${getRichImageQuery('landingImage')},
        seo
    }
`

export default function PrivacyPolicy({ pageData, global, preview, locale }) {
    return (
        <PrivacyPolicyPage
            pageData={pageData}
            global={global}
            preview={preview}
        />
    )
}

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