import { getClient, getGlobalData } from "../lib/sanity/sanity.server";
import HomePage from "../lib/pages/Home";
import { getRichImageQuery } from "../lib/sanity/components";

const query = `
  *[_type == "homePage" && language->languageCode == $locale][0]{
    _id,
    title,
    seo,
    landingVideoUrl,
    ${getRichImageQuery("landingImage")},
    callToAction1{
      text,
      "slug" : "/" + internalPage->slug
    },
    'navigation': navigation[] {
      _key,
      'text': link.text,
      'slug': "/" + link.internalPage->slug,
      ${getRichImageQuery("image")}
    }
  }
`;

export default function Home({ pageData, global, preview, locale }) {
  return <HomePage global={global} pageData={pageData} preview={preview} />;
}

export async function getStaticProps(context) {
  const { locale, defaultLocale } = context;

  var pageData = await getClient(context?.preview).fetch(query, { locale });

  if (!pageData) {
    pageData = await getClient(context?.preview).fetch(query, { locale: defaultLocale });
  }

  const global = await getGlobalData(context?.preview, locale, defaultLocale);
  return {
    props: {
      pageData,
      global,
      locale,
      preview: context.preview ?? false,
    },
  };
}
