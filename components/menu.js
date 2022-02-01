import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link";
import { useContext } from "react";
import AppContext from "../lib/contexts/AppContext";

export default function Menu({ data }) {
    const { isMenuOpen } = useContext(AppContext);

    return (
        <>
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{ translateY: '-100%' }}
                        animate={{ translateY: '0px' }}
                        exit={{ translateY: '-100%'}}
                        transition={{ type: 'easeOut', duration: 0.3 }}
                        className={`w-full absolute top-0 bg-primary5`}
                    >
                        <div className="wrapper mt-32 mb-32">
                            <MenuList className="mb-8" />
                            <MenuLine />
                        </div>
                    </motion.div>)}
            </AnimatePresence>
        </>
    )
}

const BottomLinks = () => {
    return (
        <div className="flex">
            <Link href={flex}>
            </Link>

            <Link>
            </Link>
        </div>
    )
}

const MenuLine = () => {
    return (
        <motion.div
            transition={{delay: 1, type: 'easeOut'}}
            exit={{width: "0%"}}
            initial={{ width: '0%' }}
            animate={{ width: '100%' }}
            className="h-[1px] bg-white/20"
        />
    )
}

const MenuList = ({className}) => {
    const container = {
        hidden: { opacity: 0 },
        show: {
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
            initial="hidden"
            animate="show"
            className={`grid gap-5 ${className}`}>
            {[1, 2, 3, 4, 5].map((el, index) => {
                return <MenuItem index={index} />
            })}
        </motion.ul>
    )
}

const MenuItem = ({ index }) => {
    const item = {
        hidden: { opacity: 0, translateX: "-40px", transition: { type: 'easeIn' } },
        show: { opacity: 1, translateX: "0px", transition: { type: 'easeIn' } }
    }

    return (
        <motion.li
            variants={item}
            key={index}
            className="text-white text-2xl font-bold font-header">
            Hello World {index}
        </motion.li>
    )

}

