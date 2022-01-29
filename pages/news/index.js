import { getGlobalData, getClient } from '../../lib/sanity/sanity.server'
import React from "react"
import Layout from "../../components/layout"
import NewsPageQuery from '../../lib/sanity/queries/NewsPageQuery'
import { Headline1 } from '../../components/headlines'
import BannerImage from '../../components/BannerImage'
import SanityBlockContent from '@sanity/block-content-to-react'
import { getSerializer } from '../../lib/serializers'
import FilterRow from '../../components/FilterRow'
import { useState, useContext, useEffect } from 'react'
const PageContext = React.createContext();
import Link from 'next/link'
import Image from '../../components/image'
import FishBackground from '../../components/FishBackground'

export default function News({ pageData, global, locale }) {
    return (
        <Layout data={global}>
            <LandingSection className="mb-12" pageData={pageData} />
            <MainSection pageData={pageData} />
        </Layout>
    )
}

const MainSection = ({ pageData }) => {
    const [selectedFilter, setSelectedFilter] = useState(null);

    function onFilterClick(value) {
        setSelectedFilter(selectedFilter == value ? null : value)
    }

    return (
        <PageContext.Provider value={{ selectedFilter, setSelectedFilter }}>
            <FilterRow
                onClick={onFilterClick}
                currentFilter={selectedFilter}
                filters={pageData.articleFilters} />
            <ArticleSection pageData={pageData} />
        </PageContext.Provider>
    )
}

const ArticleSection = ({ pageData }) => {
    const [currentArticles, setCurrentArticles] = useState(pageData.articles);
    const { selectedFilter } = useContext(PageContext);
    useEffect(() => {
        if (!selectedFilter) {
            setCurrentArticles(pageData.articles)
        } else {
            const p = pageData.articles.filter((el) => {
                return el.catagories.includes(selectedFilter)
            })
            setCurrentArticles(p)
        }
    }, [selectedFilter, pageData.articles]);


    return (
        <div className='bg-[#E0F3FF]'>
            <div className='min-h-[40rem] relative overflow-hidden'>
                <FishBackground />
                <div className='wrapper w-full grid py-20 gap-y-8 grid-cols-[minmax(auto,22rem)] md:grid-cols-[repeat(2,minmax(auto,22rem))] lg:grid-cols-[repeat(3,minmax(auto,22rem))] gap-8 justify-center place-items-center'>
                    {currentArticles.map((el, index) =>
                        <ArticleCard key={index} article={el} cta="Lees meer" />
                    )}
                </div>
            </div>

        </div>
    )
}

const ArticleCard = ({ article, cta }) => {
    return (
        <Link href="#">
            <a className='w-full z-20 h-full flex min-h-[32rem] flex-col bg-white overflow-hidden rounded-md cardShadow group'>
                <div className='overflow-hidden h-80 mb-6 w-full'>
                    <Image
                        className="relative group-hover:scale-110 h-full duration-300 w-full  "
                        image={article.previewImage}
                        objectFit='object-cover'
                    />
                </div>

                <div className='flex flex-1 flex-col pl-6 pr-6 pb-8'>
                    <p className='text-primary3 font-medium font-header text-3xl truncate'>{article.title}</p>
                    <p className='text-[#8D8F94] font-header mb-6'>12 feb 2022</p>
                    <p className='mb-8'>{article.summary}</p>
                    <button className={`button2 duration-300 mt-auto group-hover:text-white group-hover:bg-primary3`}>
                        {cta}
                    </button>
                </div>
            </a>
        </Link>
    )
}



const LandingSection = ({ pageData, className }) => {
    return (
        <div className={`wrapper grid lg:grid-rows-[min-content,auto] lg:grid-cols-2 ${className}`}>
            <BannerImage className="mb-14 lg:col-start-2 lg:h-full lg:col-span-full lg:row-span-2 lg:mb-0" image={pageData.landingImage} />
            <Headline1 className="mb-12 lg:my-12 lg:row-start-1">{pageData.title}</Headline1>
            <div className='lg:col-start-1 lg:pb-12 lg:max-w-[80%]'>
                <SanityBlockContent
                    blocks={pageData.landingContent} serializers={getSerializer()} />
            </div>
        </div>
    )
}

export async function getStaticProps(context) {
    const { locale, defaultLocale } = context

    var pageData = await getClient(context?.preview).fetch(NewsPageQuery, { locale })

    if (!pageData) {
        pageData = await getClient(context?.preview).fetch(NewsPageQuery, { locale: defaultLocale })
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