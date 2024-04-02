import axios from "axios";

export const instance = axios.create({
    baseURL: `https://social-network.samuraijs.com/api/1.0/`,
    withCredentials: true,
    params: {
        api_key: "3378157f-93c6-4c28-a01b-29a25b22b2a0"
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

