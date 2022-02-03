import { richImage } from "./Components"

const PrivacyPolicyPageQuery = `
    *[_type == "privacyPolicyPage" && language->languageCode == $locale][0]{
        _id,
        title,
        'landingContent': landingContent[]{
            ...,
            ${richImage}
        },
        'landingImage': landingImage{
            ${richImage}
        },
        seo
    }
`

export default PrivacyPolicyPageQuery