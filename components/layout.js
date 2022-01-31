import Footer from './footer'
import Header from './header'
import Head from 'next/head'
import Menu from './menu'
export default function Layout({ children, data, preview }) {
    return (
        <div className='min-h-screen relative flex flex-col'>
            <Menu />
            <Header preview={preview} data={data} />
            <main>{children}</main>
            <Footer data={data} />
        </div>
    )
}