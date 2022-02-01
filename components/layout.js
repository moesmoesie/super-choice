import Footer from './footer'
import Header from './header'
import Head from 'next/head'
import Menu from './Menu'
export default function Layout({ children, data, preview }) {
    return (
        <div className='min-h-screen relative flex flex-col'>
            <div className='sticky top-0 bg-white z-40'>
                <Menu/>
                <Header preview={preview} data={data} />
            </div>
            <main>{children}</main>
            <Footer data={data} />
        </div>
    )
}