import React from "react";
import Seo from "../../../components/Seo";
import Landing from "./Landing";
import Navigation from "./Navigation";
import Page from "../../../components/Page";

export default function Home({ pageData, global, preview }) {
  return (
    <>
      {pageData?.seo && <Seo seo={pageData.seo} />}
      <Page fadeInWhite={true} preview={preview} data={global}>
        <Landing pageData={pageData} />
        <Navigation items={pageData.navigation} />
      </Page>
    </>
  );
}
