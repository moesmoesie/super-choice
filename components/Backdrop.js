import { AnimatePresence, motion } from "framer-motion"

export default function Backdrop({show = false}){
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
            {show && <motion.div
                animate="visible"
                initial="hidden"
                exit="hidden"
                onClick={(e) => setIsMenuOpen(false)}
                variants={variants}
                className="w-full absolute h-screen bg-black" />}
        </AnimatePresence>
    )
}