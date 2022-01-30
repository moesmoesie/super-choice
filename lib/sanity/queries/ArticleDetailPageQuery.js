import { richImage } from "./Components"

const ArticleDetailPageQuery =  `
*[
    _type == "article" && 
    slug.current == $slug && 
    language->languageCode == $locale][0]{
        _id,
        title,
        content,
        'bannerImage' : bannerImage{
            ${richImage}
        }
    }
`

export default ArticleDetailPageQuery