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
import { useState } from 'react'
import Seo from '../../components/Seo'
export default function ContactPage({ pageData, preview, global, locale }) {
    return (
        <>
            <Seo seo={pageData.seo}/>
            <Layout preview={preview} data={global}>
                <div className='wrapper'>
                    <BannerImage className="wrapper mb-12" image={pageData.landingImage} />
                    <div className='grid lg:grid-cols-3 gap-8 mb-12'>
                        <InfoSection pageData={pageData} global={global} />
                        {/* <ContactForm className="lg:col-span-2" /> */}
                    </div>
                </div>
            </Layout>
        </>

    )
}

const ContactForm = ({ className }) => {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [message, setMessage] = useState('')
    const [submitted, setSubmitted] = useState(false)

    async function fromSubmit(e) {
        e.preventDefault();
        alert(`
            First Name: ${firstName}
            Last Name: ${lastName}
            Email: ${email}
            Message: ${message}
        `)
        return false
    }

    return (
        <form className={`grid md:grid-cols-2 gap-5 mb-16 ${className}`}>
            <ContactFromInput placeholder="First name" onChange={(e) => setFirstName(e.target.value)} />
            <ContactFromInput placeholder="Last name" onChange={(e) => setLastName(e.target.value)} />
            <ContactFromInput className="md:col-span-2" placeholder={"Email address"} onChange={(e) => setEmail(e.target.value)} />
            <ContactFromTextArea className="md:col-span-2" placeholder="Write your message" onChange={(e) => setMessage(e.target.value)} />
            <div className='md:col-span-2'>
                <ContactFromSubmitButton onClick={fromSubmit} />
            </div>
        </form>
    )
}

const ContactFromSubmitButton = ({ onClick }) => {
    return (
        <button className='bg-primary3 px-12 py-2 text-white rounded-md font-medium'
            type='submit'
            onClick={onClick}>
            Verstuur
        </button>
    )
}

const ContactFromTextArea = ({ placeholder, className, onChange }) => {
    return (
        <textarea className={`${className}
            from-input bg-[#53D8FB]/5 border border-[#66C3FF] rounded-md py-2 px-2
            text-primary3 min-h-[15rem]
            placeholder:text-primary2
            focus:border-primary4 focus:outline-none focus:text-primary4 focus:placeholder:text-primary4`}
            type='text'
            onChange={onChange}
            placeholder={placeholder}
        />
    )
}

const ContactFromInput = ({ placeholder, className, onChange }) => {
    return (
        <>
            <input className={` ${className}
                from-input bg-[#53D8FB]/5 border border-[#66C3FF] rounded-md py-2 px-2
                text-primary3
                placeholder:text-primary2
                focus:border-primary4 focus:outline-none focus:text-primary4 focus:placeholder:text-primary4`}
                type='text'
                maxLength={25}
                onChange={onChange}
                placeholder={placeholder}
            />
        </>
    )
}

const InfoSection = ({ pageData, className, global }) => {
    return (
        <div className={` ${className}`}>
            <Headline1 className="mb-6">
                {pageData.title}
            </Headline1>
            <CompanyInfo data={global} />
        </div>
    )
}

const CompanyInfo = ({ data }) => {
    return (
        <div className="grid md:grid-cols-2 lg:grid-cols-1 lg:mx-auto">
            <div>
                <p className="text-primary4 lg:col-start-1 lg:row-start-1 lg:self-center mb-1 pb-0 font-bold">
                    Adres
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
                    <a href={`tel:${data.contact.phone}`} >{data.contact.phone}</a>
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
            'preview': context.preview ?? false,
            locale
        }
    }
}