import { createClient } from 'next-sanity'
import { sanityConfig } from './config'
import groq from 'groq'

const sanityClient = createClient(sanityConfig)

const previewClient = createClient({
  ...sanityConfig,
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
})

export const getClient = (preview) => (preview ? previewClient : sanityClient)

export function overlayDrafts(docs) {
  const documents = docs || []
  const overlayed = documents.reduce((map, doc) => {
    if (!doc._id) {
      throw new Error('Ensure that `_id` is included in query projection')
    }

    const isDraft = doc._id.startsWith('drafts.')
    const id = isDraft ? doc._id.slice(7) : doc._id
    return isDraft || !map.has(id) ? map.set(id, doc) : map
  }, new Map())

  return Array.from(overlayed.values())
}

export async function getGlobalData(preview,locale,defaultLocale) {

const getQuery = (locale) => groq`
    *[_type == "global" && language->languageCode == '${locale}'][0]{
      _id,
      'logo': logo  {
        ...,
        'metadata': asset->metadata
      },
      contact,
      'footerLinks': footerLinks[] {
        _key,
        text,
        'slug': "/" + internalPage->slug
      },
      socialMedia,
      'locale' : language->languageCode
    }
  `
  var globalData = await getClient(preview).fetch(getQuery(locale))

  if (!globalData) {
    globalData = await getClient(preview).fetch(getQuery(defaultLocale))
  }

  return globalData
}