import { richImage } from "./Components"

const RecipePageQuery = `
    *[_type == "recipesPage" && language->languageCode == $locale][0]{
        _id,
        title,
        'landingContent': landingContent[]{
            ...,
            ${richImage}
        },
        'landingImage': landingImage{
            ${richImage}
        },
        'recipeFilters' : recipeFilters[]{
            value,
            title
        },
        'recipes' : recipes[]->{
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

export default RecipePageQuery