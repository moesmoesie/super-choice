import Footer from './footer'
import Header from './header'
import Menu from './Menu'

export default function Page({children, data, preview }) {
    return (
        <div className='min-h-screen relative flex flex-col'>
            <StickyArea>
                <Header preview={preview} data={data} />
                <Menu links={data.footerLinks} />
            </StickyArea>
            <main>{children}</main>
            <Footer data={data} />
        </div>
    )
}

const StickyArea = ({ children }) => {
    return (
        <div className='sticky top-0 z-50'>
            <div className='w-full absolute h-full top-0 bg-white' />
            {children}
        </div>
    )
}