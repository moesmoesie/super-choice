import { richImage } from "./Components"

export default `
    *[_type == "contactPage" && language->languageCode == $locale][0]{
        _id,
        title,
        'landingImage': landingImage{
            ${richImage}
        }
    }
`
