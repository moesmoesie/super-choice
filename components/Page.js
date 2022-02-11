import Footer from './footer'
import Header from './header'
import Menu from './Menu'
import Cookies from './Cookies'
import { motion } from 'framer-motion'
import { useContext } from 'react'
import AppContext from '../lib/contexts/AppContext'
import { AnimatePresence } from 'framer-motion'

export default function Page({ children, data, preview }) {
    return (
        <div className='min-h-screen relative flex flex-col'>
            <StickyArea>
                <Cookies />
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
            <BackDrop />
            <div className='w-full absolute h-full top-0 bg-white' />
            {children}
        </div>
    )
}

const BackDrop = () => {
    const { isMenuOpen } = useContext(AppContext);
    const varients = {
        'open': {
            opacity: 0.3
        },
        'close': {
            opacity: 0
        }
    }

    return (
        <AnimatePresence>
            {isMenuOpen && (
                <motion.div
                    variants={varients}
                    initial='close'
                    animate='open'
                    exit='close'
                    className='absolute bg-black w-full h-screen top-0 pointer-events-none'
                />
            )}
        </AnimatePresence>

    )
}