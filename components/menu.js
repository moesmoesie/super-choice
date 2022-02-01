import { motion, AnimatePresence } from "framer-motion"
import { useContext } from "react";
import AppContext from "../lib/contexts/AppContext";

export default function Menu({ data }) {
    const { isMenuOpen } = useContext(AppContext);

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

    const item = {
        hidden: { opacity: 0, translateX: "-40px" , transition:{type: 'easeIn'} },
        show: { opacity: 1, translateX: "0px", transition:{type: 'easeIn'}}
    }

    return (
        <>
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{ translateY: '-100%' }}
                        animate={{ translateY: '0px' }}
                        exit={{ translateY: '-100%' }}
                        transition={{ type: 'easeOut', duration: 0.3 }}
                        className={`w-full absolute top-0 bg-primary5`}
                    >

                        <div className="wrapper">
                            <motion.ul
                            variants={container}
                            initial="hidden"
                            animate="show"
                            className="grid gap-5 mt-32 mb-32">
                                {[1, 2, 3, 4, 5].map((el, index) => {
                                    return <motion.li 
                                    variants={item}
                                    key={index} 
                                    className="text-white text-2xl font-bold font-header">Hello World {index}</motion.li>
                                })}
                            </motion.ul>
                        </div>
                    </motion.div>)}
            </AnimatePresence>
        </>
    )
}

