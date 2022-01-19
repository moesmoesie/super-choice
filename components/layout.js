import Footer from './footer'
import Header from './header'
import Head from 'next/head'
export default function Layout({ children, data }) {
    return (
        <>
            <Header data={data} />
            <main>{children}</main>
            <Footer data={data} />
        </>
    )
}