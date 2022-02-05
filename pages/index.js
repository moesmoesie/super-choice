import groq from "groq"
import { getClient, getGlobalData } from '../lib/sanity/sanity.server'
import HomePage from "../lib/pages/Home"

export default function Home({ homePage, global, preview, locale }) {
  return (
    <HomePage
      global={global}
      pageData={homePage}
      preview={preview}
    />
  )
}


export async function getStaticProps(context) {
  const { locale, defaultLocale } = context

  const getQuery = (locale) => groq`
    *[_type == "homePage" && language->languageCode == '${locale}'][0]{
      _id,
      title,
      seo,
      'locale' : language->languageCode,
      'landingImage': landingImage  {
        ...,
        'metadata': asset->metadata
      },
      callToAction1{
        text,
        "slug" : "/" + internalPage->slug
      },
      callToAction2{
        text,
        "slug" : "/" + internalPage->slug
      },
      'navigation': navigation[] {
        _key,
        'text': link.text,
        'slug': "/" + link.internalPage->slug,
        'image' : image {
        ...,
        'metadata': asset->metadata
        }
      }
    }
  `
  var homePage = await getClient(context?.preview).fetch(getQuery(locale))
  if (!homePage) {
    homePage = await getClient(context?.preview).fetch(getQuery(defaultLocale))
  }
  const global = await getGlobalData(context?.preview, locale, defaultLocale)
  return {
    props: {
      "homePage": homePage,
      global,
      'preview': context.preview ?? false,
      locale
    }
  }
}