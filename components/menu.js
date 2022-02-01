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
                delay: 0.7,
                delayChildren: 0.7,
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
                        initial={{ translateY: '-100vh' }}
                        animate={{ translateY: '0px' }}
                        exit={{ translateY: '-100vh' }}
                        transition={{ type: 'easeOut', duration: 0.75 }}
                        className={`w-full absolute grid place-items-center top-0 h-screen bg-primary5`}
                    >

                        <div>
                            <motion.ul
                            variants={container}
                            initial="hidden"
                            animate="show"
                            className="grid gap-5">
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

