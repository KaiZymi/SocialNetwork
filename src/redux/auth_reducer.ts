import {ResultCodeForCaptcha, ResultCodesEnum} from "../api/api";
import {FormAction, stopSubmit} from "redux-form";
import {ThunkAction} from "redux-thunk";
import {AppStateType, BaseThunkType, InferActionsTypes} from "./store";
import {authAPI} from "../api/auth-api";
import {securityAPI} from "../api/security-api";



let initialState = {
	userId: null as number | null,
	email: null as string | null,
	login: null as string | null,
	isAuth: false,
	captchaURL: null as string | null

};

export type initialStateType = typeof initialState

const authReducer = (state = initialState, action: ActionsTypes):initialStateType => {
	switch (action.type) {
		case 'SN/auth/SET_USERS_DATA':
		case 'SN/auth/GET_CAPTCHA_SUCCESS':
			return {
				...state,
				...action.payload
			}

		default:
			return state;
	}
}

type ActionsTypes = InferActionsTypes<typeof actions>

type ThunkType = BaseThunkType<ActionsTypes | FormAction>

export const actions = {
    setAuthUsersData: (userId:number | null , email: string | null, login: string | null, isAuth:boolean ) => ({
        type: 'SN/auth/SET_USERS_DATA', payload:
            {userId, email, login, isAuth}
    } as const),
    getCaptchaSuccess: (captchaURL:string) => ({
        type: 'SN/auth/GET_CAPTCHA_SUCCESS', payload: {captchaURL}
    } as const )
}








export const getAuthUserData = ():ThunkType => async (dispatch:any) => {
	const meData = await authAPI.me()
	if (meData.resultCode === ResultCodesEnum.Success) {
		let {id, login, email} = meData.data
		dispatch(actions.setAuthUsersData(id, email, login, true));
	}

}




export const login = (email:string, password:string, rememberMe:boolean, captcha:string): ThunkType => async (dispatch: any) => {
	const data = await authAPI.login(email, password, rememberMe, captcha)
	// success, get auth data
	if (data.resultCode === ResultCodesEnum.Success) {
		dispatch(getAuthUserData())
	} else {
		if (data.resultCode === ResultCodeForCaptcha.CaptchaIsRequired) {
			dispatch(getCaptchaUrl())
		}

		let message = data.message.length > 0 ? data.message[0] :
			"Some error"
		dispatch(stopSubmit("login", {_error: message}))
	}

}
export const getCaptchaUrl = (): ThunkType => async (dispatch) => {
	const data = await securityAPI.getCaptcha()
	const captchaURL = data.url
	dispatch(actions.getCaptchaSuccess(captchaURL))

}

export const logout = (): ThunkType => async (dispatch) => {
	const response = await authAPI.logout()

	if (response.data.resultCode === 0) {
		dispatch(actions.setAuthUsersData(null, null, null, false));
	}

}

export default authReducer