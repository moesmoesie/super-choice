import { richImage } from "./Components"

const NewsPageQuery = `
    *[_type == "newsPage" && language->languageCode == $locale][0]{
        _id,
        title,
        'landingContent': landingContent{
            ...,
            ${richImage}
        },
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
            'summary': summary[]{
                ...,
                ${richImage}
            },
            catagories,
            'bannerImage': bannerImage{
                ${richImage}
            }
        }
    }
`

export default NewsPageQuery