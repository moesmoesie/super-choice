import { richImage } from "./Components"

const ContactPageQuery = `
    *[_type == "contactPage" && language->languageCode == $locale][0]{
        _id,
        title,
        'landingImage': landingImage{
            ${richImage}
        }
    }
`

export default ContactPageQuery
