import { getGlobalData, getClient } from '../../lib/sanity/sanity.server'
import { getRichImageQuery,getRichTextEditorQuery } from '../../lib/sanity/components'
import Seo from '../../components/Seo'
import ArticleDetail from '../../lib/pages/ArticleDetail'

export default function NewsArticle({ detailData, global, preview, locale }) {
    return (
        <>
            <Seo seo={detailData.seo}/>
            <ArticleDetail
                detailData={detailData}
                global={global}
                preview={preview}
            />
        </>
    )
}

const query = `
    *[
        _type == "article" && 
        slug.current == $slug && 
        language->languageCode == $locale][0]{
            _id,
            title,
            seo,
            ${getRichTextEditorQuery('content')},
            ${getRichImageQuery('bannerImage')},
            'latestPosts' : *[_type == "newsPage" && language->languageCode == $locale][0]{
                'articles': articles[0...4]->{
                    title,
                    'slug': slug.current,
                    ${getRichImageQuery('previewImage')}
                }
            }.articles
        }
`

const collectionQuery = `
    *[_type == 'article'][]{
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