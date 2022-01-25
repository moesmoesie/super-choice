import Footer from './footer'
import Header from './header'
import Head from 'next/head'
import Menu from './menu'
export default function Layout({ children, data }) {
    return (
        <div className='min-h-screen flex flex-col'>
            <Menu/>
            <Header data={data} />
            <main>{children}</main>
            <Footer data={data} />
        </div>
    )
}