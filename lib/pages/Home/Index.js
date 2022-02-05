import React from "react"
import Seo from "../../../components/Seo"
import Landing from "./Landing"
import Navigation from "./Navigation"
import Layout from '../../../components/layout'
import Page from "../../../components/Page"


export default function Home ({pageData, global, preview}) {
  return (
    <>
      <Seo seo={pageData.seo} />
      <Page fadeInWhite={true} preview={preview} data={global}>
        <Landing cta={pageData.callToAction1}/>
        <Navigation items={pageData.navigation} />
      </Page>
    </>
  )
}