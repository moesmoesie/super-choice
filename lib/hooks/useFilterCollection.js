import { useEffect, useState } from "react"

export const useFilterCollection = (options) => {
    const [data, setData] = useState(null)

    useEffect(() => {
        var newData
        setData([])

        if(options.filter){
            newData = options.collection.filter((el) => {
                return el.catagories.includes(options.filter)
            })
        }else{
            newData = options.collection
        }

        const timer = setTimeout(() => {
            setData(newData)
        }, 300);

        return () => clearTimeout(timer);
    }, [options.filter])

    return { data }
}