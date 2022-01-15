import groq from "groq"
import { urlForImage } from "../lib/sanity/sanity"
import { getClient, getGlobalData } from '../lib/sanity/sanity.server'
import Header from "../components/header"
import React from "react"
import anime from "animejs"

export default function Home({ homePage,global }) {

  return (
    <div>
      <Header logo={global.logo}/>

      {/* Landing Section */}
      <div className=" h-screen w-full relative">
        <img className="absolute w-full h-full object-cover"
          src={urlForImage(homePage.landingImage.image.asset)}
        />

        <div className="absolute bottom-[5vh]  w-full flex flex-col items-center">
          <h1 className="text-center text-white text-6xl md:text-9xl font-black mb-5 md:mb-12">
            {homePage.title}
          </h1>

          <div className="flex flex-col md:flex-row items-center gap-5 md:mb-3">
            <a href="#" className="bg-primary4 button">
              {homePage.callToAction.primary.text}
            </a>
            <a href="#" className="button">
              {homePage.callToAction.secondary.text}
            </a>
          </div>

          <img className="w-full max-w-2xl hidden md:block"
            src="/finestSelection.svg" />
        </div>
      </div>

      {/* Navigation Section */}
      <HomeNavigation data={homePage} />
    </div>
  )
}

const HomeNavigation = ({ data }) => {
  return (
    <div className="grid grid-cols-1 grid-rows-[repeat(6,20rem)] md:grid-rows-[repeat(4,20rem)] md:grid-cols-3">
      {data.navigation.map((element, index) =>
        <HomeNavigationItem index={index} data={element} key={`HomeNavigationItem${index}`} />
      )}
    </div>
  )
}

const HomeNavigationItem = ({ data, index }) => {
  const getRowSpan = (index) =>
    [0, 3].includes(index) ? "md:row-span-2" : "md:row-span-1"

  const getColumnSpan = (index) =>
    [0, 4, 5].includes(index) ? "md:col-span-2" : "md:col-span-1"

  //ANIMATION

  const DURATION = 1000
  const SCALE = { FROM: 1, TO: 1.2 }
  const OPACITY = { FROM: 0.6, TO: 0.2 }
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

      <img className="absolute w-full h-full object-cover"
        id={`HomeNavigationItemImage${index}`}
        src={urlForImage(data.richImage.image.asset)} />

      <div className="absolute w-full h-full bg-black opacity-60 group-hover:opacity-10"
        id={`HomeNavigationItemBackground${index}`} />

      <h2 className="pointer-events-none z-10 text-white font-bold text-3xl md:text-4xl drop-shadow-2xl">
        {data.title}
      </h2>

    </div>
  )
}





export async function getStaticProps(context) {

  const query = groq`
    *[_type == "homePage"][0]{
        _id,
        callToAction{
                primary{text, "url":url->slug},
                secondary{text, "url": url->slug}
        },
        seo,
        landingImage,
        title,
        navigation[]{richImage,title,"url":url->slug},
    }
  `

  const homePage = await getClient(context?.preview).fetch(query)
  const global = await getGlobalData(context?.preview)

  return {
    props: {
      "homePage": homePage,
      global
    }
  }
}