import { getGlobalData, getClient } from '../../lib/sanity/sanity.server'
import React from "react"
import CollectionSlugs from '../../lib/sanity/queries/CollectionSlugs'
import ArticleDetailPageQuery from '../../lib/sanity/queries/ArticleDetailPageQuery'
import { Headline1 } from '../../components/headlines'
import Layout from '../../components/layout'
import BannerImage from '../../components/BannerImage'
import SanityBlockContent from '@sanity/block-content-to-react'
import { getSerializer } from '../../lib/serializers'
import Link from 'next/link'
import Image from '../../components/image'
export default function NewsArticle({ pageDetail, global,preview, locale }) {
    return (
        <Layout preview={preview} data={global}>
            <div className='wrapper mb-12'>
                <BannerImage className='wrapper mb-12' image={pageDetail.bannerImage} />
                <div className='lg:gap-20 grid relative lg:grid-cols-[auto,20rem]'>
                    <div>
                        <Headline1 className='mb-4'>
                            {pageDetail.title}
                        </Headline1>
                        <SanityBlockContent blocks={pageDetail.content} serializers={getSerializer()} />
                    </div>
                    <div className='self-start'>
                        <p className='text-3xl mt-8 mb-4 font-header font-bold text-primary4'>Latest Posts</p>
                        <div className='grid md:grid-cols-2 lg:grid-cols-1 gap-4'>
                            {pageDetail.latestPosts.map((article, index) => {
                                return (
                                    <Link key={index} href={`/news/${article.slug}`}>
                                        <a className='flex gap-4 relative items-center'>
                                            <Image image={article.previewImage} objectFit='object-cover' 
                                            className=' relative brightness-75 overflow-x-hidden min-w-[6rem] w-24 md:h-44 lg:w-24 lg:h-24 md:w-full h-24 bg-red-500 rounded-md' />
                                            <p className='text-primary4 font-semibold text-xl 
                                                md:absolute md:text-white md:left-1/2 md:top-1/2 md:-translate-y-1/2 md:-translate-x-1/2
                                                lg:relative lg:left-auto lg:top-auto lg:translate-y-0 lg:translate-x-0 lg:text-primary4
                                        '>
                                                {article.title}</p>
                                        </a>
                                    </Link>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}


export const getStaticPaths = async () => {
    const data = await getClient(false).fetch(CollectionSlugs, { collection: 'article' })
    var paths = data.map((el) => {
        return { params: { slug: el.slug }, locale: el.language }
    })

    return {
        paths: paths,
        fallback: false,
    }
}

export async function getStaticProps(context) {
    const { locale, defaultLocale, params } = context

    var pageDetail = await getClient(context?.preview).fetch(ArticleDetailPageQuery, { locale, slug: params.slug })

    if (!pageDetail) {
        pageDetail = await getClient(context?.preview).fetch(ArticleDetailPageQuery, { locale: defaultLocale, slug: params.slug })
    }

    const global = await getGlobalData(context?.preview, locale, defaultLocale)

    return {
        props: {
            pageDetail,
            global,
            locale,
            'preview': context.preview ?? false,
        }
    }
}