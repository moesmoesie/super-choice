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
        'productFilters' :productFilters[]{
            value,
            title
        },
        productCtaText,
        loadMoreProductsText,
        'products' : products[]->{
            _id,
            slug,
            title,
            catagories,
            'image': gallary[0]{
                ${richImage}
            },
            'summary': productSummary
        }
    }
`
