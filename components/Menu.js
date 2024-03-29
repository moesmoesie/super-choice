import { motion, AnimatePresence } from "framer-motion"
import { useContext } from "react";
import AppContext from "../lib/contexts/AppContext";

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
                        <div className="wrapper pt-32 pb-16">
                            <MenuList links={links} className='mb-7' />
                            <MenuLine className='mb-6' />
                            <ExtraMenuLinks />
                        </div>
                    </div>
                </motion.div>)}
        </AnimatePresence>
    )
}

const ExtraMenuLinks = () => {
    const variants = {
        visible: {
            opacity: 1,
            transition: { delay: 0.3 }
        },
        hidden: {
            opacity: 0
        },
    }

    const underline = {
        hover: { scaleX: 1, transition: { type: 'easeOut', duration: 0.2 } },
        rest: { scaleX: 0, transition: { type: 'easeOut', duration: 0.2 } },
    }

    return (
        <motion.div variants={variants} className="flex gap-4">
            <motion.a className="text-white text-xs relative pb-2"
                whileHover='hover' initial='rest'
                href="/privacy-policy"
            >
                Privacy Policy
                <motion.div variants={underline} className="absolute opacity-80 w-full origin-left h-px bottom-0 bg-white" />
            </motion.a>
        </motion.div>
    )
}

const MenuLine = ({ className }) => {
    const variants = {
        visible: { scaleX: 1, transition: { type: 'easeOut', duration: 0.5, delay: 0.3 } },
        hidden: { scaleX: 0, transition: { type: 'easeOut', duration: 0.3 } },
    }

    return (
        <motion.div
            variants={variants}
            className={`w-full bg-white origin-left h-px opacity-20 ${className}`}
        />
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
        visible: { opacity: 1, translateX: "0px", transition: { type: 'easeIn' } },
    }

    const underline = {
        hover: { scaleX: 1, transition: { type: 'easeOut', duration: 0.2 } },
        rest: { scaleX: 0, transition: { type: 'easeOut', duration: 0.2 } },
    }

    return (
        <motion.li
            variants={item}
            key={index}
            className="text-white md:text-left text-[17px] font-body ">
            <motion.a
                whileHover='hover'
                initial='rest'
                className="relative pb-2" href={link.slug}>
                {link.text}
                <motion.div variants={underline} className="absolute opacity-80 w-full origin-left h-px bottom-0 bg-white" />
            </motion.a>
        </motion.li>
    )
}