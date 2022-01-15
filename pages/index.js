import groq from "groq"
import { urlForImage } from "../lib/sanity/sanity"
import { sanityClient, getClient, overlayDrafts } from '../lib/sanity/sanity.server'

export default function Home({ homePage }) {

  return (
    <div>
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
      {buildNavigation(homePage)}
    </div>
  )
}

function buildNavigation(homePage) {
  function getRowSpan(index) {
    if ([0, 3].includes(index)) {
      return "md:row-span-2"
    } else {
      return "md:row-span-1"
    }
  }

  function getColumnSpan(index) {
    if ([0, 4, 5].includes(index)) {
      return "md:col-span-2"
    } else {
      return "md:col-span-1"
    }
  }


  return <div className="grid grid-cols-1 grid-rows-[repeat(6,20rem)] md:grid-rows-[repeat(4,20rem)] md:grid-cols-3">
    {homePage.navigation.map((element, index) => {
      return (
        <div className={`${getRowSpan(index)} ${getColumnSpan(index)} grid place-items-center relative overflow-hidden group`}
          key={element.title}
        >

          <img
            className="absolute w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
            src={urlForImage(element.richImage.image.asset)}
          />

          <div
            className="absolute w-full h-full bg-black opacity-60 group-hover:opacity-10 transition-opacity duration-1000"
          />

          <h2 className="pointer-events-none z-10 text-white font-bold text-3xl md:text-4xl drop-shadow-2xl">{element.title}</h2>

        </div>
      )
    })}
  </div>
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

  const homePage = await getClient(context.preview).fetch(query)

  return {
    props: {
      "homePage": homePage
    }
  }
}