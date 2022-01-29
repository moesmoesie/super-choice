import { richImage } from "./Components"

export default `
    *[_type == "recipesPage" && language->languageCode == $locale][0]{
        _id,
        title,
        landingContent,
        'landingImage': landingImage{
            ${richImage}
        },
        'recipeFilters' : recipeFilters[]{
            value,
            title
        },
        'recipes' : recipes[]->{
            _id,
            slug,
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