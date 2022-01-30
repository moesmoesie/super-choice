export default `
    *[_type == $collection][]{
        'slug': slug.current,
        'language' : language->languageCode
    }
`
