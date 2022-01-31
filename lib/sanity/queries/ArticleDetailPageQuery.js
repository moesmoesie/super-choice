import { richImage } from "./Components"

const ArticleDetailPageQuery = `
*[
    _type == "article" && 
    slug.current == $slug && 
    language->languageCode == $locale][0]{
        _id,
        title,
        content,
        'bannerImage' : bannerImage{
            ${richImage}
        },
        'latestPosts' : *[_type == "newsPage" && language->languageCode == $locale][0]{
            'articles': articles[0...4]->{
                title,
                'slug': slug.current,
                'previewImage': previewImage{
                    ${richImage}
                }
            }
        }.articles
    }
`

export default ArticleDetailPageQuery