import Footer from './footer'
import Header from './header'
import Menu from './Menu'
import { motion, AnimatePresence } from 'framer-motion'
import { useContext, useState, useEffect } from 'react'
import AppContext from '../lib/contexts/AppContext'

export default function Layout({ children, data, fadeInWhite = false, preview }) {

    return (
        <div className='min-h-screen relative flex flex-col'>
            <TopSection data={data} fadeInWhite={fadeInWhite} preview={preview} />
            <main>{children}</main>
            <Footer data={data} />
        </div>
    )
}

const TopSection = ({ data, preview, fadeInWhite = false }) => {
    const [isAtTop, setIsAtTop] = useState(fadeInWhite);

    if (fadeInWhite) {
        function logit() {
            if (window.pageYOffset > 500 && isAtTop) {
                setIsAtTop(false)
            } else if (window.pageYOffset < 500 && !isAtTop) {
                setIsAtTop(true)
            }
        }

        useEffect(() => {
            function watchScroll() {
                window.addEventListener("scroll", logit);
            }
            watchScroll();
            return () => {
                window.removeEventListener("scroll", logit);
            };
        });
    }



    return (
        <div className={`sticky top-0 z-40 bg-white transition-colors duration-300 ease-out
            ${isAtTop ? "bg-white/0" : "bg-white/100"}
        `}>
            <Backdrop />
            <Menu links={data.footerLinks} />
            <Header preview={preview} data={data} />
        </div>
    )
}


const Backdrop = () => {
    const { setIsMenuOpen, isMenuOpen } = useContext(AppContext);

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