import { getGlobalData, getClient } from '../../lib/sanity/sanity.server'
import ContactPage from '../../lib/pages/Contact'
import { getRichImageQuery } from '../../lib/sanity/components'

export default function Contact ({ pageData, preview, global, locale }) {
    return (
      <ContactPage
        global={global}
        pageData={pageData}
        preview={preview}
      />
    )
}

const query = `
    *[_type == "contactPage" && language->languageCode == $locale][0]{
        _id,
        title,
        contactForm,
        seo,
        ${getRichImageQuery('landingImage')}
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
            'preview': context.preview ?? false,
            locale
        }
    }
}