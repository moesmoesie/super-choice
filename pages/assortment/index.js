import { getGlobalData, getClient } from '../../lib/sanity/sanity.server'
import AssortmentPage from '../../lib/pages/Assortment'
import { getRichImageQuery, getRichTextEditorQuery } from '../../lib/sanity/components'

export default function Assortment({ pageData, preview, global, locale }) {
    return (
        <AssortmentPage
            global={global}
            pageData={pageData}
            preview={preview}
        />
    )
}

const query = `
    *[_type == "assortmentPage" && language->languageCode == $locale][0]{
        _id,
        title,
        seo,
        ${getRichTextEditorQuery('landingContent')},
        ${getRichImageQuery('landingImage')},
        ${getRichImageQuery('landingProductImage')},
        'productFilters' :productFilters[]{
            value,
            title
        },
        productCtaText,
        loadMoreProductsText,
        'products' : products[]->{
            _id,
            title,
            catagories,
            'slug' : slug.current,
            ${getRichImageQuery('image', 'gallary[0]')},
            ${getRichTextEditorQuery('summary','productSummary')}
        }
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
        locale,
        'preview': context.preview ?? false,
      }
    }
  }