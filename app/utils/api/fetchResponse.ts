/* eslint-disable @typescript-eslint/no-explicit-any */
export const GET_METHOD = "GET";
export const POST_METHOD = "POST";
export const PUT_METHOD = "PUT";
export const DELETE_METHOD = "DELETE";

export interface HandleApiRequestOptions {
    method: string;
    url: string;
    data?: any;
    isBinary?: boolean;
    controller?: AbortController;
    auth?: boolean;
    JWT_TOKEN?: string;
}



export async function handleApiRequest({
    method,
    url,
    data = null,
    isBinary = false,
    controller,
    auth = true,
    JWT_TOKEN,
}: HandleApiRequestOptions) {
    const CMS_HOST_URL = process.env.NEXT_PUBLIC_CMS_HOST;
        const CMS_TOKEN = process.env.NEXT_PUBLIC_TOKEN;


    // let token: string | null = null;

    // if (auth) {
    //     if (typeof window !== "undefined") {

    //         token = getCookie(ENVIORMENT.CMS_ACCOUNT_JWT);
    //     } else {
    //         try {
    //             const { cookies } = await import("next/headers");
    //             const cookieStore = await cookies();
    //             token = cookieStore.get(ENVIORMENT.CMS_ACCOUNT_JWT)?.value || null;
    //         } catch {
    //             token = JWT_TOKEN || null;
    //         }
    //     }
    // }

    const SERVER_URL = `${CMS_HOST_URL}/api`;

    const headers: HeadersInit = {};

    if (auth) {
        headers["Authorization"] = `Bearer ${CMS_TOKEN}`;
    }

    if ((method === "POST" || method === "PUT") && !isBinary) {
        headers["Content-Type"] = "application/json";
    }

    const options: RequestInit = {
        method,
        headers,
        signal: controller?.signal,
    };

    if ((method === "POST" || method === "PUT") && data) {
        options.body = isBinary ? data : JSON.stringify(data);
    }

    const res = await fetch(`${SERVER_URL}${url}`, options);

    if (res.status === 204) return null;

    if (method === "DELETE" && res.status === 200) {
        const text = await res.text();
        if (!text) return null;
        try {
            return JSON.parse(text);
        } catch {
            return text;
        }
    }

    let response: any = null;

    try {
        response = await res.json();
    } catch {
        response = null;
    }

    if (res.status >= 400 && res.status < 500) {
        console.error("FULL BACKEND ERROR 👉", response);

        throw new CustomError(
            response?.error?.message ||
            response?.message ||
            "Something went wrong.",
            response // ✅ send FULL response, not just error
        );
    }

    if (res.status >= 500) {
        throw new Error("Server error");
    }

    return response;
}

export class CustomError extends Error {
    details?: any;

    constructor(message: string, details?: any) {
        super(message);
        this.name = "CustomError";
        this.details = details;
    }
}

// export async function uploadFile(
//     url: string, // Specify the type of URL as a string
//     method: string, // Specify the type of method as a string
//     data: any = null
// ) {
//     try {
//         const CMS_TOKEN = process.env.NEXT_PUBLIC_API_TOKEN; // keep private

//         const SERVER_URL = `${CMS_HOST_URL}/api`;

//         const requestOptions: any = {
//             method: method,
//             mode: 'no-cors',
//             headers: {
//                 Authorization: `Bearer ${CMS_TOKEN}`,
//             },
//         };

//         if (data) {
//             requestOptions.body = data;
//         }

//         const response = await fetch(`${SERVER_URL}/${url}`, requestOptions);

//         return await response.json();
//     } catch (error) {
//         return error;
//     }
// }