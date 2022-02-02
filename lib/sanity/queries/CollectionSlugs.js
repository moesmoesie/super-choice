const CollectionSlugs = `
    *[_type == $collection][]{
        'slug': slug.current,
        'language' : language->languageCode
    }
`

export default CollectionSlugs
