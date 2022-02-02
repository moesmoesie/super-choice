import Footer from './footer'
import Header from './header'
import Menu from './Menu'
import { motion, AnimatePresence } from 'framer-motion'
import { useContext } from 'react'
import AppContext from '../lib/contexts/AppContext'
export default function Layout({ children, data, preview }) {

    return (
        <div className='min-h-screen relative flex flex-col'>
            <div className='sticky top-0 bg-white z-40'>
                <Backdrop/>
                <Menu links={data.footerLinks} />
                <Header preview={preview} data={data} />
            </div>
            <main>{children}</main>
            <Footer data={data} />
        </div>
    )
}


const Backdrop = () => {
    const {setIsMenuOpen,isMenuOpen} = useContext(AppContext);

    const variants = {
        visible: {
            opacity: 0.6,
            transition: {
                duration: 1
            }
        },
        hidden: {
            opacity: 0,
            transition: {
                duration: 1
            }
        },
    }

    return (
        <AnimatePresence>
            {isMenuOpen && <motion.div
                animate="visible"
                initial="hidden"
                exit="hidden"
                onClick={(e) => setIsMenuOpen(false)}
                variants={variants}
                className="w-full absolute h-screen bg-black" />}
            
        </AnimatePresence>
    )
}