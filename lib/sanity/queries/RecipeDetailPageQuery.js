import { richImage } from "./Components"

const RecipeDetailPageQuery =  `
*[
    _type == "recipe" && 
    slug.current == $slug && 
    language->languageCode == $locale][0]{
        _id,
        title,
        seo,
        'steps': steps[]{
            ...,
            ${richImage}
        },
        'instructions': instructions[]{
            ...,
            ${richImage}
        },
        'bannerImage' : bannerImage{
            ${richImage}
        }
    }
`

export default RecipeDetailPageQuery