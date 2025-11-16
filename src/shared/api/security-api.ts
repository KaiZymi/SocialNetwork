import {instance} from "./api";

type getCaptchaResponseType = {
    url: string
}


export const securityAPI = {
    getCaptcha() {
        return instance.get<getCaptchaResponseType>(`security/get-captcha-url`).then(res => res.data)
    },
}