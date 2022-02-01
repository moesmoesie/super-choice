import { useEffect, useState } from "react"

export const useFilterCollection = (options) => {
    const [data, setData] = useState(null)

    useEffect(() => {
        var newData
        const randomNumber = Math.random()
        setData([])

        if(options.filter){
            newData = options.collection.filter((el) => {
                return el.catagories.includes(options.filter)
            })
        }else{
            newData = options.collection
        }

        newData = newData.map((el,index) => {
            el.key = index + randomNumber
            return el
        })

        const timer = setTimeout(() => {
            setData(newData)
        }, 300);

        return () => clearTimeout(timer);
    }, [options.filter])

    return { data }
}