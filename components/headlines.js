export function Headline1({children,className}) {
    return (
        <>
            <h1 className={`
                w-full text-primary4 font-black font-header 
                text-[40px] leading-[48px]
                md:text-[58px] md:leading-[66px]
                lg:text-[72px] lg:leading-[80px]
                ${className}`}>
                {children}
            </h1> 
        </>
    )
}

export function Headline2({children,className}) {
    return (
        <>
            <h2 className={`
                w-full font-black font-header 
                text-[36px] leading-[42px]
                md:text-[50px] md:leading-[58px]
                lg:text-[60px] lg:leading-[72px]
                ${className}`}>
                {children}
            </h2> 
        </>
    )
}

export function Headline3({children,className}) {
    return (
        <>
            <h3 className={`
                w-full font-black font-header 
                text-[32px] leading-[36px]
                md:text-[38px] md:leading-[46px]
                lg:text-[52px] lg:leading-[60px]
                ${className}`}>
                {children}
            </h3> 
        </>
    )
}