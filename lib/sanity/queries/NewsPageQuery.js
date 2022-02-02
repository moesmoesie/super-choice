import { richImage } from "./Components"

const NewsPageQuery = `
    *[_type == "newsPage" && language->languageCode == $locale][0]{
        _id,
        title,
        landingContent,
        'landingImage': landingImage{
            ${richImage}
        },
        'articleFilters' : articleFilters[]{
            value,
            title
        },
        'articles' : articles[]->{
            _id,
            'slug' : slug.current,
            title,
            'previewImage': previewImage{
                ${richImage}
            },
            summary,
            catagories,
            'bannerImage': bannerImage{
                ${richImage}
            }
        }
    }
`

export default NewsPageQuery