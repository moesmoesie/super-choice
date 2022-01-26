import { richImage } from "./Components"

export default `
    *[_type == "assortmentPage" && language->languageCode == $locale][0]{
        _id,
        title,
        landingContent,
        'landingImage': landingImage{
            ${richImage}
        },
        'landingProductImage': landingProductImage{
            ${richImage}
        },
        productFilters,
        productCtaText,
        loadMoreProductsText,
        products
    }
`
