import { API_URLS } from "./apiUrls";
import { handleApiRequest, POST_METHOD } from "./fetchResponse";

export const addAdmission = async(data:any) =>(
    await handleApiRequest({ 
        method:POST_METHOD,
        url:API_URLS.ADMISSION,
        data
    })
)