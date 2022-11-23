import { LandingImage } from "./LandingImage";
import Seo from "../../../components/Seo";
import SanityBlockContent from "@sanity/block-content-to-react";
import { getSerializer } from "../../serializers";
import Highlight from "../../../components/highlight";
import { Headline1 } from "../../../components/headlines";
import Page from "../../../components/Page";

export default function Sustainability({ pageData, global, preview, locale }) {
  return (
    <>
      <Seo seo={pageData?.seo} />
      <Page preview={preview} data={global}>
        <LandingImage className="w-full mb-12 h-72 md:wrapper" image={pageData.landingImage} />

        <Headline1 className="wrapper !max-w-[900px] mt-12 mb-12 w-full">{pageData.title}</Headline1>

        <div className="wrapper !max-w-[900px] mb-12">
          <SanityBlockContent blocks={pageData.landingContent} serializers={getSerializer()} />
        </div>

        <Highlight className="md:mb-16 !max-w-[900px]" highlight={pageData.highlight} />
      </Page>
    </>
  );
}
