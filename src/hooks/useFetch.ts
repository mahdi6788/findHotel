import axios from "axios"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"

function useFetch(url, query){
    const [isLoading, setIsLoading] = useState(false)
    const [data, setData] = useState([])

    /// when project gets render, should fetch the data, so we need useEffect
    useEffect(()=>{
        /// need to use async-await because fetching data happens in different time: sending request and then getting response
        async function fetchingData(){
            try {
                setIsLoading(true)
                const {data} = await axios.get(`${url}?${query}`)
                setData(data)
            } catch (err) {
                setData([])
                toast.error(err?.message)
            } finally {
                setIsLoading(false)
            }

        } fetchingData()
    }, [url, query])

    return {data, isLoading}
}

export default useFetch