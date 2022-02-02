export const CustomNumberedList = ({ children }) => {
    return (
        <ol className='grid gap-6'>
            {children.map((el, index) => {
                return (
                    <div key={index} className={` flex`}>
                        <p className=' min-w-[3rem] pl-2 text-2xl text-primary2'>{index + 1}.</p>
                        {el}
                    </div>
                )
            })}
        </ol>
    )
}

export const CustomList = ({ children }) => {
    return <ul className="list-disc pl-6 grid gap-2">{children}</ul>
}

export const ItalicText = ({ children }) => {
    return <span className="italic">{children}</span>
}

export const BoldText = ({ children }) => {
    return <span className="font-bold">{children}</span>
}

export const PrimaryColor = ({ children }) => {
    return <span className="text-primary3">{children}</span>
}

export const AscColor = ({ children }) => {
    return <span className="text-[#1AA4A0]">{children}</span>
}

export const MscColor = ({ children }) => {
    return <span className="text-[#0A529B]">{children}</span>
}

export const LinkText = ({ children, link }) => {
    return (
        <Link href={link}>
            <a className="text-primary3 underline">
                {children}
            </a>
        </Link>
    )
}