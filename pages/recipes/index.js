import { getGlobalData, getClient } from "../../lib/sanity/sanity.server";
import React from "react";
import Seo from "../../components/Seo";
import RecipesPage from "../../lib/pages/Recipes";
import { getRichTextEditorQuery, getRichImageQuery } from "../../lib/sanity/components";

export default function Recipes({ pageData, global, preview, locale }) {
  return (
    <>
      <Seo seo={pageData.seo} />
      <RecipesPage global={global} pageData={pageData} preview={preview} />
    </>
  );
}

const query = `
    *[_type == "recipesPage" && language->languageCode == $locale][0]{
        _id,
        title,
        seo,
        'recipeFilters' : recipeFilters[]{
            value,
            title
        },
        ${getRichTextEditorQuery("landingContent")},
        ${getRichImageQuery("landingImage")},
        'recipes' : recipes[defined(@->)]->{
            _id,
            'slug' : slug.current,
            title,
            catagories,
            ${getRichImageQuery("previewImage")},
            ${getRichTextEditorQuery("summary")},
            ${getRichImageQuery("bannerImage")}
        }
    }
`;

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
