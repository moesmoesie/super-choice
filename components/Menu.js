import { motion, AnimatePresence } from "framer-motion"
import { useContext } from "react";
import AppContext from "../lib/contexts/AppContext";

export default function Menu({ data }) {
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
                        className={`w-full absolute top-0 bg-primary5`}
                    >
                        <div className="wrapper mt-32 mb-32">
                            <MenuList />
                        </div>
                    </motion.div>)}
            </AnimatePresence>
        </>
    )
}

const MenuList = ({className}) => {
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
            {[1, 2, 3, 4, 5].map((el, index) => {
                return <MenuItem key={index} index={index} />
            })}
        </motion.ul>
    )
}

const MenuItem = ({ index }) => {
    const item = {
        hidden: { opacity: 0, translateX: "-40px", transition: { type: 'easeIn' } },
        visible: { opacity: 1, translateX: "0px", transition: { type: 'easeIn' } }
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

