import Image from "./image";
import { AiOutlineInstagram } from "@react-icons/all-files/ai/AiOutlineInstagram";
import { AiOutlineLinkedin } from "@react-icons/all-files/ai/AiOutlineLinkedin";
import { AiOutlineFacebook } from "@react-icons/all-files/ai/AiOutlineFacebook";
import { AiTwotonePhone } from "@react-icons/all-files/ai/AiTwotonePhone";
import { FaFax } from "@react-icons/all-files/fa/FaFax";
import Link from "next/link";

export default function Footer({ data }) {
  return (
    <footer className="grid lg:grid-cols-2 mt-auto">
      <div className="bg-primary4 px-6">
        <div className="grid lg:grid-cols-2 py-12 max-w-xl lg:mx-auto">
          {/* Logo */}
          <Link href={"/"}>
            <a aria-label="Super Choice Logo">
              <Image className="w-16 h-16 relative mb-4" loading="eager" image={data.logo} withPlaceholder={false} mediaQueries={[{ w: 10, s: 128 }]} />
            </a>
          </Link>

          <p className="text-white mb-4 lg:col-start-1 lg:mb-0 lg:self-end">
            © 2021 <span className="font-bold">Super Choice.</span> <br /> All rights reserved
          </p>

          <p className="text-white lg:col-start-2 lg:row-start-1 lg:self-center uppercase mb-1 pb-0 font-bold">Links</p>

          <ul className="w-full flex lg:grid lg:grid-cols-2 text-white gap-1 gap-x-3 lg:gap-x-4 flex-wrap">
            {data?.footerLinks?.map((link) => {
              return (
                <li key={link._key}>
                  <Link href={link.slug}>
                    <a>{link.text}</a>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      <div className="bg-primary5 px-6">
        <div className="grid lg:grid-cols-2 py-12 lg:mx-auto max-w-xl">
          <div className="w-16 h-16 mb-4 hidden lg:block lg:col-start-2" />
          <p className="text-white lg:col-start-1 lg:row-start-1 lg:self-center uppercase mb-1 pb-0 font-bold">Contact</p>

          <ul className="w-full grid text-white gap-1 mb-6">
            <li>{data?.contact?.addressLine1}</li>
            <li>
              {data?.contact?.postalCode} {data?.contact?.city}{" "}
            </li>
            <li>{data?.contact?.country}</li>
          </ul>

          <ul className="w-full flex  text-white gap-1 lg:gap-x-2 flex-col">
            <li className="flex gap-4">
              {data?.socialMedia?.map((element) => {
                return <SocialMediaLink key={element._key} data={element} />;
              })}
            </li>
            <li className="flex items-center gap-2">
              <AiTwotonePhone className="text-primary2" />
              <a href={`tel:${data?.contact?.phone}`}>{data?.contact?.phone}</a>
            </li>
            <li className="flex items-center gap-2">
              <FaFax className="text-primary2" />
              {data?.contact?.fax}
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

const SocialMediaLink = ({ data }) => {
  if (data.type == "instagram") {
    return (
      <a aria-label="Instagram profile" href={data.url} rel="noreferrer" target="_blank">
        <AiOutlineInstagram className="text-primary2" size={20} />
      </a>
    );
  } else if (data.type == "linkedin") {
    return (
      <a aria-label="Linkedin profile" href={data.url} rel="noreferrer" target="_blank">
        <AiOutlineLinkedin className="text-primary2" size={20} />
      </a>
    );
  } else if (data.type == "facebook") {
    return (
      <a aria-label="Facebook profile" href={data.url} rel="noreferrer" target="_blank">
        <AiOutlineFacebook className="text-primary2" size={20} />
      </a>
    );
  }
  return <></>;
};
