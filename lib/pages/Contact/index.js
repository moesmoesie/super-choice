import Seo from "../../../components/Seo";
import BannerImage from "../../../components/BannerImage";
import CompanyDetails from "./CompanyDetails";
import Page from "../../../components/Page";
import Form from "./Form";

export default function Contact({ pageData, global, preview }) {
  return (
    <>
      {pageData?.seo && <Seo seo={pageData.seo} />}
      <Page preview={preview} data={global}>
        <div className="wrapper">
          <BannerImage className="wrapper mb-12" image={pageData.landingImage} />
          <div className="grid lg:grid-cols-3 gap-8 mb-12">
            <CompanyDetails pageData={pageData} global={global} />
            <Form className="lg:col-span-2" contactForm={pageData.contactForm} />
          </div>
        </div>
      </Page>
    </>
  );
}
