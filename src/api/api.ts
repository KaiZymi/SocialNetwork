import axios from "axios";

export const instance = axios.create({
    withCredentials: true,
    baseURL: `https://social-network.samuraijs.com/api/1.0/`,
    headers: {
        "API-KEY": "01ec87c8-5f6d-4380-8bba-cf2a27196bd7",
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

