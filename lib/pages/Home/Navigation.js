import NavigationItem from "./NavigationItem"

export default function ({items}) {
    return (
        <div className="pointer-events-none 
            grid grid-cols-12 grid-rows-[repeat(6,20rem)]
            md:grid-rows-[repeat(4,22rem)] 
            lg:grid-rows-[repeat(4,25rem)]">
            {items.map((element, index) =>{
                switch(index) {
                    case 0:
                        return <NavigationItem className='col-span-full lg:col-span-8 lg:row-span-2' 
                            item={element} key={index} />
                    case 1:
                        return <NavigationItem className='col-span-full md:col-span-6 lg:col-span-4' 
                            item={element} key={index} />
                    case 2:
                        return <NavigationItem className='col-span-full md:col-span-6 lg:col-span-4' 
                            item={element} key={index} />
                    case 3:
                        return <NavigationItem className='col-span-full md:col-span-5 lg:col-span-5 lg:row-span-2' 
                            item={element} key={index} />
                    case 4:
                        return <NavigationItem className='col-span-full md:col-span-7' 
                            item={element} key={index} />
                    case 5:
                        return <NavigationItem className='col-span-full lg:col-span-7'
                            item={element} key={index} />
                    default:
                        return <></>
                }
            })}
        </div>
    )
}