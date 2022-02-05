import { getGlobalData, getClient } from '../../lib/sanity/sanity.server'
import CollectionSlugs from '../../lib/sanity/queries/CollectionSlugs'
import ProductDetailPageQuery from '../../lib/sanity/queries/ProductDetailPageQuery'
import Seo from '../../components/Seo'
import ProductDetail from '../../lib/pages/ProductDetail/Index'

export default function Assortment({ detailData, preview, global, locale }) {
    return (
        <>
            <Seo seo={detailData.seo}/>
            <ProductDetail 
                detailData={detailData} 
                preview={preview} 
                global={global}
            />
        </>
    )
}

export const getStaticPaths = async () => {
    const data = await getClient(false).fetch(CollectionSlugs, { collection: 'product' })
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

    var detailData = await getClient(context?.preview).fetch(ProductDetailPageQuery, { locale, slug: params.slug })

    if (!detailData) {
        detailData = await getClient(context?.preview).fetch(ProductDetailPageQuery, { locale: defaultLocale, slug: params.slug })
    }

    const global = await getGlobalData(context?.preview, locale, defaultLocale)

    return {
        props: {
            detailData,
            global,
            locale,
            'preview': context.preview ?? false,
        }
    }
}