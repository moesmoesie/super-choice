import { getGlobalData, getClient } from '../../lib/sanity/sanity.server'
import React from "react"
import Layout from "../../components/layout"
import RecipePageQuery from '../../lib/sanity/queries/RecipePageQuery'
import BannerImage from '../../components/BannerImage'
import { Headline1 } from '../../components/headlines'
import SanityBlockContent from '@sanity/block-content-to-react'
import { getSerializer } from '../../lib/serializers'
import { useState } from 'react'
import FilterRow from '../../components/FilterRow'
import Image from '../../components/image'
import { useFilterCollection } from '../../lib/hooks/useFilterCollection'
import CollectionGrid from '../../components/CollectionGrid'
import Link from 'next/link'

const PageContext = React.createContext();

export default function RecipesPage({ pageData, global,preview, locale }) {
    return (
        <Layout preview={preview} data={global}>
            <LandingSection pageData={pageData} className="mb-12" />
            <MainSection pageData={pageData} />
        </Layout>
    )
}

const MainSection = ({ pageData }) => {
    const [selectedFilter, setSelectedFilter] = useState(null);
    const { data } = useFilterCollection({ filter: selectedFilter, collection: pageData.recipes })
    function onFilterClick(value) {
        setSelectedFilter(selectedFilter == value ? null : value)
    }

    return (
        <PageContext.Provider value={{ selectedFilter, setSelectedFilter }}>
            <FilterRow
                onClick={onFilterClick}
                currentFilter={selectedFilter}
                filters={pageData.recipeFilters} />
            <RecipesSection recipes={data ? data : []} />
        </PageContext.Provider>
    )
}

const RecipesSection = ({ recipes }) => {
    return (
        <CollectionGrid type='wide'>
            {recipes.map((el, index) =>
                <RecipeCard
                    key={index}
                    recipe={el}
                    cta="Zie recept" />
            )}
        </CollectionGrid>
    )
}

const RecipeCard = ({ recipe, cta }) => {
    return (
        <Link href={`recipes/${recipe.slug}`}>
            <a className={`w-full bg-white z-20 overflow-hidden rounded-md cardShadow group
                grid md:grid-cols-10 md:min-h-[15rem]`}>

                <div className='w-full md:col-span-4 md:p-6 h-72 md:h-auto'>
                    <div className='w-full h-full overflow-hidden md:rounded-md'>
                        <Image className="relative group-hover:scale-110 duration-300 w-full h-full overflow-hidden"
                            objectFit="object-cover"
                            image={recipe.previewImage} />
                    </div>
                </div>

                <div className='flex flex-col p-6 md:col-span-6'>
                    <p className='text-primary4 font-bold font-header text-4xl md:text-5xl md:mb-2 truncate'>
                        {recipe.title}
                    </p>
                    <p className='text-[#8D8F94] font-header mb-6'>
                        12 feb 2022
                    </p>
                    <p className='mb-8'>
                        {recipe.summary}
                    </p>
                    <button className={`button2 self-start duration-300 mt-auto group-hover:text-white group-hover:bg-primary3`}>
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
            <BannerImage className="mb-14 lg:col-start-2 lg:h-full lg:col-span-full lg:row-span-2 lg:mb-0"
                image={pageData.landingImage} />
            <Headline1 className="mb-12 lg:my-12 lg:row-start-1">
                {pageData.title}
            </Headline1>
            <div className='lg:col-start-1 lg:pb-12 lg:max-w-[80%]'>
                <SanityBlockContent
                    blocks={pageData.landingContent}
                    serializers={getSerializer()} />
            </div>
        </div>
    )
}

export async function getStaticProps(context) {
    const { locale, defaultLocale } = context

    var pageData = await getClient(context?.preview).fetch(RecipePageQuery, { locale })

    if (!pageData) {
        pageData = await getClient(context?.preview).fetch(RecipePageQuery, { locale: defaultLocale })
    }

    const global = await getGlobalData(context?.preview, locale, defaultLocale)

    return {
        props: {
            pageData,
            global,
            locale,
            'preview': context.preview ?? false,
        }
    }
}