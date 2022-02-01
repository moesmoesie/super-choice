import FishBackground from "./FishBackground"
import { motion } from "framer-motion"
export default function CollectionGrid({ children, type = "small" }) {
    const smallGridStyle = `
        grid-cols-[minmax(auto,22rem)]
        md:grid-cols-[repeat(2,minmax(auto,22rem))] 
        lg:grid-cols-[repeat(3,19rem)]
        xl:grid-cols-[repeat(3,22rem)]
    `

    return (
        <div className='bg-[#E0F3FF] '>
            <div className='relative min-h-[100vh] overflow-hidden'>
                <FishBackground />
                <div className={`
                    ${type == 'small' ? smallGridStyle : ''}
                    wrapper w-full grid py-20 gap-y-8 
                    gap-8 justify-center place-items-center`}>
                    {children}
                </div>
            </div>
        </div>
    )
}