import FishBackground from "./FishBackground"

export default function CollectionGrid({ children, type = "small" }) {
    const smallGridStyle = `
        grid-cols-[minmax(auto,22rem)]
        md:grid-cols-[repeat(2,minmax(auto,22rem))] 
        lg:grid-cols-[repeat(3,22rem)]
    `

    return (
        <div className='bg-[#E0F3FF] '>
            <div className='relative overflow-hidden'>
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