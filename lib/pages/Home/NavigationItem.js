import Link from "next/link"
import { motion } from "framer-motion"
import Image from "../../../components/image"

export default function ({ item, className }) {
    return (
        <Link href={item.slug}>
            <motion.a className={`${className} pointer-events-auto cursor-pointer grid place-items-center relative overflow-hidden`}
                initial="rest" whileHover="hover" animate="rest">
                <Title>
                    {item.text}
                </Title>
                <BackgroundImage image={item.image} />
                <Background />
            </motion.a>
        </Link>
    )
}

const BackgroundImage = ({ image }) => {
    const variant = {
        rest: {
            transition: {
                type: 'easeOut',
                duration: 0.3,
            },
            scale: 1,
        },
        hover: {
            transition: {
                duration: 0.3,
                type: 'easeOut'
            },
            scale: 1.1
        }
    }

    return (
        <motion.div variants={variant}
            className="absolute w-full h-full">
            <Image className="absolute w-full h-full"
                image={image}
                objectFit='object-cover'
                mediaQueries={[
                    { w: 375, s: 500 },
                    { w: 768, s: 1000 },
                    { w: 1024, s: 1300 },
                    { w: 1500, s: 2000 }
                ]}
            />
        </motion.div>
    )
}

const Title = ({ children }) => {
    return (
        <h2 className="font-header font-bold text-3xl md:text-4xl text-white pointer-events-none z-10"
            style={{ textShadow: "2px 2px 5px rgba(0, 0, 0, 0.40)" }}>
            {children}
        </h2>
    )
}

const Background = () => {
    const variant = {
        rest: {
            transition: {
                type: 'linear',
                duration: 0.3,
            },
            opacity: 0.2,
        },
        hover: {
            transition: {
                type: 'linear',
                duration: 0.5,
            },
            opacity: 0,
        }
    }

    return (
        <motion.div className="absolute w-full h-full bg-black"
            variants={variant}
        />
    )
}