import Link from "next/link";
import Image from "./image";
import AppContext from '../lib/contexts/AppContext';
import { useContext } from 'react';
import { motion } from "framer-motion";
import { AnimatePresence } from "framer-motion";

export default function Header({ data, preview }) {
    return (
        <header className="z-50 pointer-events-none w-full">
            <div className='flex z-50 items-center wrapper min-h-[5rem]'>
                <Link passHref href='/'>
                    <a className='pointer-events-auto'>
                        <Image
                            className="w-16 h-16 relative"
                            loading='eager' withPlaceholder={false}
                            image={data.logo}
                            mediaQueries={[
                                { w: 10, s: 128 },
                            ]} />
                    </a>
                </Link>
                <HamburgerMenu className='ml-auto z-50 md:ml-12' />

                <div className="ml-auto hidden md:flex gap-3">
                    {preview && <ExitPreviewModeButton/>}
                    <HeaderNavigationLink slug='/contact' title='Contact' />
                </div>

            </div>
        </header>
    )
}

const ExitPreviewModeButton = () => {
    return (
        <Link href='/api/exitPreview'>
            <a className="link pointer-events-auto hidden sm:block text-primary4 font-bold uppercase">
                Exit Preview
            </a>
        </Link>
    )
}

const HeaderNavigationLink = ({ slug, title }) => {
    const { isMenuOpen } = useContext(AppContext);

    return (
        <Link passHref href={slug}>
            <motion.a
                transition={{ type: 'easeIn' }}
                animate={!isMenuOpen ? { color: 'var(--primary4)' } : { color: '#FFFFFF' }}
                className="link z-50 cursor-pointer pointer-events-auto hidden sm:block text-primary4 font-bold uppercase">
                {title}
            </motion.a>
        </Link>
    )
}

const HamburgerMenu = (props) => {
    const { isMenuOpen, setIsMenuOpen } = useContext(AppContext);

    const openMenu = () => {
        setIsMenuOpen(true)
    }

    const closeMenu = () => {
        setIsMenuOpen(false)
    }

    return (
        <button className={`pointer-events-auto flex items-center gap-2 ${props.className}`}
            onClick={isMenuOpen ? closeMenu : openMenu}>
            <HamburgerIcon />
            <MenuText />
        </button>
    )
}

const MenuText = () => {
    const { isMenuOpen } = useContext(AppContext);

    const menu = {
        active: {
            translateY: 0,
            opacity: 1
        },
        nonActive: {
            translateY: -15,
            opacity: 0
        }
    }

    const close = {
        active: {
            translateY: 0,
            opacity: 1
        },
        nonActive: {
            translateY: 15,
            opacity: 0
        }
    }

    return (
        <div className='relative hidden  md:flex items-center'>
            <AnimatePresence initial={false}>
                {!isMenuOpen && (
                    <motion.span
                        transition={{ type: 'easeIn' }}
                        variants={menu}
                        initial='nonActive'
                        exit='nonActive'
                        animate='active'
                        className="absolute sm:inline-block uppercase text-primary4 font-bold p-0 m-0" >
                        Menu
                    </motion.span>
                )}
            </AnimatePresence>

            <AnimatePresence>
                {isMenuOpen && (
                    <motion.span
                        transition={{ type: 'easeIn' }}
                        exit='nonActive'
                        initial='nonActive'
                        animate='active'
                        variants={close}
                        className="absolute sm:inline-block uppercase text-white font-bold p-0 m-0" >
                        Close
                    </motion.span>
                )}
            </AnimatePresence>

        </div>
    )
}

const HamburgerIcon = () => {
    const { isMenuOpen } = useContext(AppContext);

    const topLineVarient = {
        open: {
            rotate: 0,
            translateY: 0,
            stroke: 'var(--primary4)'
        },
        close: {
            rotate: 45,
            translateY: 30,
            stroke: '#FFFFFF'
        }
    }

    const middelLineVarient = {
        open: {
            opacity: 1
        },
        close: {
            opacity: 0
        }
    }

    const bottomLineVarient = {
        open: {
            rotate: 0,
            translateY: 0,
            stroke: 'var(--primary4)'
        },
        close: {
            rotate: -45,
            translateY: -30,
            stroke: '#FFFFFF'
        }
    }

    return (
        <motion.svg viewBox="0 0 100 100" className="w-8 stroke-primary4">
            <motion.line
                variants={topLineVarient}
                initial="open"
                animate={isMenuOpen ? "close" : "open"}
                x1="20" y1="20" x2="80" y2="20" strokeWidth={"10"} />

            <motion.line
                variants={middelLineVarient}
                animate={isMenuOpen ? "close" : "open"}
                x1="20" y1="50" x2="80" y2="50" strokeWidth={"10"} />
            <motion.line
                variants={bottomLineVarient}
                animate={isMenuOpen ? "close" : "open"}
                className="origin-left" x1="20" y1="80" x2="80" y2="80" strokeWidth={"10"} />
        </motion.svg>
    )
}