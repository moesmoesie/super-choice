import { richImage } from "./Components"

const ProductDetailPageQuery =  `
*[
    _type == "product" && 
    slug.current == $slug && 
    language->languageCode == $locale][0]{
        _id,
        title,
        'description' : detailedProductDescription,
        'gallary' : gallary[]{
            ${richImage}
        },
        'relatedRecipes': relatedRecipes[]-> {
            _id,
            title,
            'slug' : slug.current,
            'previewImage': previewImage{
                ${richImage}
            },
        }
    }
`

export default ProductDetailPageQuery