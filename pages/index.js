import groq from "groq"
import { getClient, getGlobalData } from '../lib/sanity/sanity.server'
import Header from "../components/header"
import React from "react"
import anime from "animejs"
import Image from "../components/image"
import Link from "next/link"
import Layout from "../components/layout"

export default function Home({ homePage, global, locale }) {
  return (
    <Layout data={global}>

      {/* Landing Section */}
      <div className=" h-screen w-full relative">

        <Image
          className="absolute w-full h-full"
          objectFit="object-cover"
          asset={homePage.landingImage.asset}
          placeholder={homePage.landingImage.metadata.lqip}
          caption={homePage.landingImage.title}
          alt={homePage.landingImage.alt}
          sizes={[600, 1500, 4000]}
          loading={"eager"}
        />

        <div className="absolute bottom-[5vh]  w-full flex flex-col items-center">
          <h1 className="font-header text-6xl md:text-9xl font-black text-center text-white mb-5 md:mb-12">
            {homePage.title}
          </h1>

          <div className="flex flex-col md:flex-row items-center gap-5 md:mb-3">
            <Link href="#">
              <a className="bg-primary4 button">
                {homePage.callToAction1.text}
              </a>
            </Link>
            <Link href="#">
              <a className="button">
                {homePage.callToAction2.text}
              </a>
            </Link>
          </div>

          <img className="h-44 hidden md:block"
            src="/finestSelection.svg" />
        </div>
      </div>

      {/* Navigation Section */}
      <HomeNavigation data={homePage.navigation} />
    </Layout>
  )
}

const HomeNavigation = ({ data }) => {
  return (
    <div className="grid grid-cols-12 grid-rows-[repeat(6,20rem)] md:grid-rows-[repeat(4,22rem)] lg:grid-rows-[repeat(4,25rem)]">
      {data.map((element, index) =>
        <HomeNavigationItem index={index} data={element} key={`HomeNavigationItem${index}`} />
      )}
    </div>
  )
}

const HomeNavigationItem = ({ data, index }) => {
  const getColumnSpan = (index) => {
    if(index == 0){
      return "col-span-full lg:col-span-8"
    }else if(index == 1){
      return "col-span-full md:col-span-6 lg:col-span-4"
    } else if (index == 2){
      return "col-span-full md:col-span-6 lg:col-span-4"
    } else if (index == 3){
      return "col-span-full md:col-span-5 lg:col-span-5"
    } else if (index == 4){
      return "col-span-full md:col-span-7"
    } else if (index == 5){
      return "col-span-full lg:col-span-7"
    }
  }

  const  getRowSpan = (index) => {
    if(index == 0){
      return "lg:row-span-2"
    }else if(index == 1){
      return ""
    } else if (index == 2){
      return ""
    } else if (index == 3){
      return "lg:row-span-2"
    } else if (index == 4){
      return ""
    } else if (index == 5){
      return ""
    }
  }

  //ANIMATION
  const DURATION = 1000
  const SCALE = { FROM: 1, TO: 1.2 }
  const OPACITY = { FROM: 0.4, TO: 0.2 }
  const EASING = "easeInOutSine"

  const onMouseEnter = () => {
    anime({
      targets: `#HomeNavigationItemImage${index}`,
      scale: SCALE.TO,
      easing: EASING,
      duration: DURATION
    });

    anime({
      targets: `#HomeNavigationItemBackground${index}`,
      opacity: OPACITY.TO,
      easing: EASING,
      duration: DURATION
    });
  }

  const onMouseLeave = () => {
    anime({
      targets: `#HomeNavigationItemImage${index}`,
      scale: SCALE.FROM,
      easing: EASING,
      duration: DURATION
    });

    anime({
      targets: `#HomeNavigationItemBackground${index}`,
      opacity: OPACITY.FROM,
      easing: EASING,
      duration: DURATION
    });
  }


  return (
    <div className={`${getRowSpan(index)} ${getColumnSpan(index)} grid place-items-center relative overflow-hidden`}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >

      <Image className="absolute w-full h-full"
        id={`HomeNavigationItemImage${index}`}
        asset={data.image.asset}
        sizes={[1000, 2000]}
        placeholder={data.image.metadata.lqip}
        loading={"lazy"}
        objectFit='object-cover'
      />

      <div className="absolute w-full h-full bg-black opacity-40 group-hover:opacity-10"
        id={`HomeNavigationItemBackground${index}`}
      />

      <h2 className="font-header font-bold text-3xl md:text-4xl text-white pointer-events-none z-10 drop-shadow-2xl">
        {data.title}
      </h2>

    </div>
  )
}


export async function getStaticProps(context) {
  const {locale,defaultLocale} = context
  
  const query = groq`
    *[_type == "homePage" && language->languageCode == '${locale}'][0]{
      _id,
      title,
      'locale' : language->languageCode,
      'landingImage': landingImage  {
        ...,
        'metadata': asset->metadata
      },
      callToAction1,
      callToAction2,
      'navigation': navigation[] {
        ...,
        'image' : image {
        ...,
        'metadata': asset->metadata
        }
      }
    }
  `

  const homePage = await getClient(context?.preview).fetch(query)
  const global = await getGlobalData(context?.preview, locale, defaultLocale)

  return {
    props: {
      "homePage": homePage,
      global,
      locale
    }
  }
}