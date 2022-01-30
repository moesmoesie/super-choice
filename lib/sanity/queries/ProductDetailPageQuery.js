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
        }
    }
`

export default ProductDetailPageQuery