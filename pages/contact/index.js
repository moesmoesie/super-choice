import { getGlobalData, getClient } from '../../lib/sanity/sanity.server'
import ContactPage from '../../lib/pages/Contact'
import ContactPageQuery from '../../lib/sanity/queries/ContactPageQuery'

export default function Contact ({ pageData, preview, global, locale }) {
    return (
      <ContactPage
        global={global}
        pageData={pageData}
        preview={preview}
      />
    )
}

export async function getStaticProps(context) {
    const { locale, defaultLocale } = context

    var pageData = await getClient(context?.preview).fetch(ContactPageQuery, { locale })

    if (!pageData) {
        pageData = await getClient(context?.preview).fetch(ContactPageQuery, { locale: defaultLocale })
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