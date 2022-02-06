export function getRichImageQuery(name,title){
    if(!title){
        title = name
    }
    return `'${name}' : ${title}{
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

export function getHighlightQuery(name='highlight'){
    return `'${name}' : ${name}{
        ...,
        'callToAction': callToAction{
            text,
            'slug': "/" + internalPage->slug
        },
        ${getRichImageQuery('image')}
    }`
}

export function getRichTextEditorQuery(name,title){
    if(!title){
        title = name
    }
    return `'${name}': ${title}[]{
        ...,
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