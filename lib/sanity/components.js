export function getRichImageQuery(name){
    return `'${name}' : ${name}{
        asset,
        title,
        caption,
        'metadata': asset->metadata{
            lqip,
            'dimensions': dimensions{
                aspectRatio,
                height,
                width
            }
        }
    }`
}

export export function getHighlightQuery(name='highlight'){
    return `'${name}' : ${name}{
        ...,
        'callToAction': callToAction{
            text,
            'slug': "/" + internalPage->slug
        },
        ${getRichImage('image')}
    }`
}

export function getRichTextEditorQuery(name){
    return `'${name}': ${name}[]{
        ...,
        ${getRichImage('richImage')}
    }`
}