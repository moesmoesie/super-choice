import Head from "next/head"
export default function Seo({ seo }) {
    return (
        <Head>
            <title>{seo?.title}</title>
            <meta name="description" content={seo?.description}/>
            <meta name="keywords" content={seo?.keywords}/>
        </Head>
    )
}