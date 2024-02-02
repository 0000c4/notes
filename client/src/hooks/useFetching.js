import { useState } from "react"

export const useFetching = (callback) =>{
    const [isLoading, setIsLoading] = useState();
    const [isError, setIsError] = useState();

    const fetching = async() =>{
        try {
            setIsLoading(true)
            await callback();
        } catch (error) {
            setIsError(error.message)
        }
        finally{
            setIsLoading(false)
        }
    }

    return [fetching, isLoading, isError]
}