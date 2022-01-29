import { getGlobalData, getClient } from '../../lib/sanity/sanity.server'
import React from "react"
import Layout from "../../components/layout"
import ContactPageQuery from '../../lib/sanity/queries/ContactPageQuery'
import { Headline1 } from '../../components/headlines'
import BannerImage from '../../components/BannerImage'
import { AiTwotonePhone } from '@react-icons/all-files/ai/AiTwotonePhone'
import { FaFax } from '@react-icons/all-files/fa/FaFax'
import { AiOutlineFacebook } from '@react-icons/all-files/ai/AiOutlineFacebook'
import { AiOutlineInstagram } from '@react-icons/all-files/ai/AiOutlineInstagram'
import { AiOutlineLinkedin } from '@react-icons/all-files/ai/AiOutlineLinkedin'

export default function ContactPage({ pageData, global, locale }) {
    return (
        <Layout data={global}>
            <div className='wrapper mt-24'>
                <InfoSection pageData={pageData} global={global} />
            </div>
        </Layout>
    )
}

const InfoSection = ({ pageData, className, global }) => {
    return (
        <div className={` ${className}`}>
            <BannerImage className="mb-12" image={pageData.landingImage} />
            <Headline1 className="mb-6">
                {pageData.title}
            </Headline1>
            <CompanyInfo data={global} />
        </div>
    )
}

const CompanyInfo = ({ data}) => {
    return (
        <div className="grid md:grid-cols-2 lg:grid-cols-1 lg:mx-auto">
            <div>
                <p className="text-primary4 lg:col-start-1 lg:row-start-1 lg:self-center mb-1 pb-0 font-bold">
                    Adress
                </p>

                <ul className="w-full grid text-bodyColor gap-1 mb-6">
                    <li>{data.contact.addressLine1}</li>
                    <li>{data.contact.postalCode} {data.contact.city} </li>
                    <li>{data.contact.country}</li>
                </ul>
            </div>

            <ul className="w-full flex text-bodyColor gap-1 lg:gap-x-2 flex-col">
                <li className="flex gap-4">
                    {data.socialMedia.map((element) => {
                        return <SocialMediaLink key={element._key} data={element} />
                    })}
                </li>
                <li className="flex items-center gap-2">
                    <AiTwotonePhone className="text-primary4" />
                    {data.contact.phone}
                </li>
                <li className="flex items-center gap-2">
                    <FaFax className="text-primary4" />
                    {data.contact.fax}
                </li>
            </ul>
        </div>
    )
}

const SocialMediaLink = ({ data }) => {
    if (data.type == "instagram") {
        return (
            <a aria-label="Instagram profile" href={data.url} rel="noreferrer" target="_blank">
                <AiOutlineInstagram className="text-primary4" size={20} />
            </a>
        )
    } else if (data.type == 'linkedin') {
        return (
            <a aria-label="Linkedin profile" href={data.url} rel="noreferrer" target="_blank">
                <AiOutlineLinkedin className="text-primary4" size={20} />
            </a>
        )
    } else if (data.type == 'facebook') {
        return (
            <a aria-label="Facebook profile" href={data.url} rel="noreferrer" target="_blank">
                <AiOutlineFacebook className="text-primary4" size={20} />
            </a>
        )
    }
    return <></>
}

export async function getStaticProps(context) {
    const { locale, defaultLocale } = context

    var pageData = await getClient(context?.preview).fetch(ContactPageQuery, { locale })

    if (!pageData) {
        pageData = await getClient(context?.preview).fetch(ContactPageQuery, { locale: defaultLocale })
    }

    const global = await getGlobalData(context?.preview, locale, defaultLocale)

    return {
        props: {
            pageData,
            global,
            locale
        }
    }
}