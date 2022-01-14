import groq from "groq"
import { client,urlFor } from "../lib/client"

export default function Home({ homePage }) {

  return (
    <div>

      <div className=" h-screen w-full relative">
        <img className="absolute w-full h-full object-cover"
          src={urlFor(homePage.landingImage.image.asset)}
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
            src="/finestSelection.svg"/>

        </div>
      </div>
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
  const homePage = await client.fetch(query)

  return {
    props: {
      "homePage": homePage
    }
  }
}