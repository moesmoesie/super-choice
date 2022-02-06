import Link from "next/link"
import { useContext } from "react";
import AppContext from "../lib/contexts/AppContext"
import { motion, AnimatePresence } from "framer-motion";
import jsCookies from "js-cookie";

export default function Cookies() {
    const { hasCookies, setCookies } = useContext(AppContext);

    function acceptCookies() {
        setCookies(true)
        jsCookies.set('hasSuperChoiceCookies', true, {expires: 90})
    }

    return (
        <AnimatePresence>
            {!hasCookies && (
                <motion.div className='h-screen pointer-events-none w-full absolute'>
                    <motion.div className='py-6 px-4 z-[200] pointer-events-auto w-full bg-primary5 absolute bottom-0 grid place-items-center'
                         initial={{translateY: '100%', transition:{ease: 'easeOut'}}}
                         animate={{translateY: 0, transition:{ease: 'easeOut', delay: 1}}}
                         exit = {{translateY: '100%', transition:{ease: 'easeOut'}}}
                    >
                        <div className="flex items-center flex-col gap-3 md:flex-row">
                            <p className='text-white text-center'>
                                Our site uses cookies. Learn more about our use of
                                <Link href='/privacy-policy'>
                                    <a> <span className="underline">cookies</span></a>
                                </Link>
                            </p>
                            <button className="px-5 rounded-md py-1 bg-white text-primary5"
                                onClick={(e) => acceptCookies()}
                            >
                                I accept
                            </button>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}