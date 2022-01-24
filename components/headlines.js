export function Headline1({children,className}) {
    return (
        <>
            <h1 className={`
                w-full text-primary4 font-black text-5xl font-header 
                md:text-6xl
                lg:text-7xl
                ${className}`}>
                {children}
            </h1> 
        </>
    )
}