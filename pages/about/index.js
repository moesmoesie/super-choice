import { getClient, getGlobalData } from '../../lib/sanity/sanity.server'
import AboutPage from '../../lib/pages/About'
import { getRichImageQuery, getRichTextEditorQuery, getHighlightQuery } from '../../lib/sanity/components'

const query = `
    *[_type == "aboutPage" && language->languageCode == $locale][0]{
        _id,
        title,
        seo,
        gallary{
            ${getRichImageQuery('image1')},
            ${getRichImageQuery('image2')},
            ${getRichImageQuery('image3')}
        },
        ${getRichTextEditorQuery('landingContent')},
        ${getRichImageQuery('landingImage')},
        ${getHighlightQuery()}
    }
`

export default function Home({ pageData, preview, global, locale }) {
    return (
        <AboutPage
            global={global}
            pageData={pageData}
            preview={preview}
            locale={locale}
        />
    )
}

export async function getStaticProps(context) {
    const { locale, defaultLocale } = context

    var pageData = await getClient(context?.preview).fetch(query,{locale})

    if (!pageData) {
        pageData = await getClient(context?.preview).fetch(query,{locale: defaultLocale})
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