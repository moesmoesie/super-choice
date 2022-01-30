import { useEffect, useState } from "react"

export const filterCollection = (options) => {
    const [data, setData] = useState(null)

    useEffect(() => {
        if(options.filter){
            const newData = options.collection.filter((el) => {
                return el.catagories.includes(options.filter)
            })
            setData(newData)
        }else{
            setData(options.collection)
        }
    },[options.filter])

    return {data}
}