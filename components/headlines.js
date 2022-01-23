export function Headline1({children,className}) {
    return (
        <>
            <h1 className={`
                w-full text-primary4 font-black text-4xl 
                md:text-6xl
                lg:text-7xl
                ${className}`}>
                {children}
            </h1> 
        </>
    )
}