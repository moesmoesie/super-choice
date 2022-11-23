import React from "react";
import Highlight from "../../../components/highlight";
import Gallary from "./Gallary";
import Landing from "./Landing";
import SmallScreenImage from "./SmallScreenImage";
import Page from "../../../components/Page";
import Seo from "../../../components/Seo";
export default function About({ pageData, preview, global, locale }) {
  return (
    <>
      {pageData?.seo && <Seo seo={pageData.seo} />}
      <Page preview={preview} data={global}>
        <Landing title={pageData.title} landingContent={pageData.landingContent} landingImage={pageData.landingImage} />

        <SmallScreenImage className="md:mb-16" image={pageData.gallary.image2} />

        <Highlight className="md:mb-16" highlight={pageData.highlight} />

        <Gallary gallary={pageData.gallary} />
      </Page>
    </>
  );
}
