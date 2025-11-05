import axios from "axios";

export const instance = axios.create({
    withCredentials: true,
    baseURL: `https://social-network.samuraijs.com/api/1.0/`,
    headers: {
        "API-KEY": "8ac4cc7c-8c0b-49bc-bfec-041e65da5f38",
    }

})



export type APIResponseType<D = {}, RC = ResultCodesEnum> = {
    data: D
    message: Array<string>
    resultCode: RC
}

export enum ResultCodesEnum {
    Success=0,
    Error = 1,

}

export enum ResultCodeForCaptcha{
    CaptchaIsRequired= 10
}









