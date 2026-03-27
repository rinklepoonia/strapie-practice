import { API_URLS } from "./apiUrls";
import { GET_METHOD, handleApiRequest, POST_METHOD } from "./fetchResponse";
/* eslint-disable @typescript-eslint/no-explicit-any */
export const addAdmission = async(data:any) =>(
    await handleApiRequest({ 
        method:POST_METHOD,
        url:API_URLS.ADMISSION,
        data
    })
)
export const getAdmission = async(docId ?: string | number) =>(
    await handleApiRequest({ 
        method:GET_METHOD,
        url:API_URLS.ADMISSION +(docId?`/${docId}`:''),  
    })
)

