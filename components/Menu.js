import { motion, AnimatePresence } from "framer-motion"
import { useContext } from "react";
import AppContext from "../lib/contexts/AppContext";
import Link from "next/link";

export default function Menu({ links }) {
    const { isMenuOpen } = useContext(AppContext);

    const variants = {
        visible: {
            translateY: '0px',
            transition: {
                type: 'easeOut',
            }
        },
        hidden: {
            translateY: '-100%',
            transition: {
                type: 'easeOut',
                when: "afterChildren",
            }
        },
    }

    return (
        <>
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial='hidden'
                        animate='visible'
                        exit='hidden'
                        variants={variants}
                        className={`w-full absolute top-0`}
                    >
                        <div className="bg-primary5 z-50">
                            <div className="wrapper pt-32 pb-20">
                                <MenuList links={links} />
                            </div>
                        </div>
                    </motion.div>)}
            </AnimatePresence>
        </>
    )
}

const Backdrop = () => {
    const { isMenuOpen, setIsMenuOpen } = useContext(AppContext);

    const variants = {
        visible: {
            opacity: 0.6,
            transition: {
                delay:0.2,
                type: 'easeOut',
                duration : 0.2
            }
        },
        hidden: {
            opacity: 0
        },
    }
    return (
        <motion.div
            onClick={(e) => setIsMenuOpen(false)}
            variants={variants}
            className="w-full h-screen bg-black" />
    )
}

const MenuList = ({ className, links }) => {
    const container = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                delay: 0.3,
                delayChildren: 0.3,
                staggerChildren: 0.1
            }
        }
    }

    return (
        <motion.ul
            variants={container}
            className={`grid gap-5 ${className}`}>
            {links.map((el, index) => {
                return <MenuItem link={el} key={index} index={index} />
            })}
        </motion.ul>
    )
}

const MenuItem = ({ index, link }) => {
    const item = {
        hidden: { opacity: 0, translateX: "-40px", transition: { type: 'easeIn' } },
        visible: { opacity: 1, translateX: "0px", transition: { type: 'easeIn' } }
    }

    return (
        <motion.li
            variants={item}
            key={index}
            className="text-white text-2xl font-bold font-header">
            <a href={link.slug}>
                {link.text}
            </a>
        </motion.li>
    )

}

