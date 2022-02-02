import { richImage } from "./Components"

const AssortmentPageQuery = `
    *[_type == "assortmentPage" && language->languageCode == $locale][0]{
        _id,
        title,
        'landingContent': landingContent[]{
            ...,
            ${richImage}
        },
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
            title,
            catagories,
            'slug' : slug.current,
            'image': gallary[0]{
                ${richImage}
            },
            'summary': productSummary[]{
                ...,
                ${richImage}
            }
        }
    }
`

export default AssortmentPageQuery