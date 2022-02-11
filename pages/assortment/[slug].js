import { getGlobalData, getClient } from '../../lib/sanity/sanity.server'
import Seo from '../../components/Seo'
import ProductDetail from '../../lib/pages/ProductDetail'
import { getRichTextEditorQuery, getRichImageQuery } from '../../lib/sanity/components'

export default function Assortment({ pageData,detailData, preview, global }) {
    return (
        <>
            <Seo seo={detailData.seo}/>
            <ProductDetail
                pageData={pageData}
                detailData={detailData} 
                preview={preview} 
                global={global}
            />
        </>
    )
}

const pageQuery = `
*[
    _type == "productDetailPage" &&
    language->languageCode == $locale][0]{
        _id,
        relatedRecipesTitle
    }
`

const query =  `
*[
    _type == "product" && 
    slug.current == $slug && 
    language->languageCode == $locale][0]{
        _id,
        title,
        seo,
        ${getRichTextEditorQuery('description','detailedProductDescription')},
        ${getRichImageQuery('gallary','gallary[]')},
        'relatedRecipes': relatedRecipes[]-> {
            _id,
            title,
            'slug' : slug.current,
            ${getRichImageQuery('previewImage','previewImage')}
        }
    }
`

const collectionQuery = `
    *[_type == 'product'][]{
        'slug': slug.current,
        'language' : language->languageCode
    }
`

export const getStaticPaths = async () => {
    const data = await getClient(false).fetch(collectionQuery)
    var paths = data.map((el) => {
        return { params: { slug: el.slug }, locale: el.language }
    })

    return {
        paths: paths,
        fallback: false,
    }
}

export async function getStaticProps(context) {
    const { locale, defaultLocale, params } = context

    var detailData = await getClient(context?.preview).fetch(query, { locale, slug: params.slug })

    if (!detailData) {
        detailData = await getClient(context?.preview).fetch(query, { locale: defaultLocale, slug: params.slug })
    }

    var pageData = await getClient(context?.preview).fetch(pageQuery, { locale, slug: params.slug })

    if (!pageData) {
        pageData = await getClient(context?.preview).fetch(pageQuery, { locale: defaultLocale, slug: params.slug })
    }

    const global = await getGlobalData(context?.preview, locale, defaultLocale)

    return {
        props: {
            pageData,
            detailData,
            global,
            locale,
            'preview': context.preview ?? false,
        }
    }
}