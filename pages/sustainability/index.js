import { getGlobalData, getClient } from '../../lib/sanity/sanity.server'
import SustainabilityPage from '../../lib/pages/Sustainability/Index'

const query = `
    *[_type == "sustainabilityPage" && language->languageCode == $locale][0]{
        _id,
        title,
        landingContent,
        'locale' : language->languageCode,
        seo,
        'highlight' : highlight{
        ...,
        'image' : image{
            ...,
            'metadata': asset->metadata
        }
        },
        'landingImage' : landingImage{
        ...,
        'metadata': asset->metadata
        },
    }
`

export default function Sustainability({ pageData, global, preview, locale }) {
    return (
        <SustainabilityPage
            pageData={pageData}
            global={global}
            preview={preview}
            locale={locale}
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