import {createAsyncThunk} from "@reduxjs/toolkit";
import {authAPI} from "../auth-api";
import {ResultCodeForCaptcha, ResultCodesEnum} from "../../../shared/api/api";
import {securityAPI} from "../../../shared/api/security-api";
import {authActions} from "../auth_reducer";


export const getAuthUserData = createAsyncThunk('auth/getAuthUserData', async (_, {dispatch}: any) => {
	const meData = await authAPI.me()
	if (meData.resultCode === ResultCodesEnum.Success) {
		let {id, login, email} = meData.data

		dispatch(authActions.setAuthUsersData({userId: id, email, login, isAuth: true}));
	}

})

export const login = createAsyncThunk('auth/login', async (payload: {
	email: string,
	password: string,
	rememberMe: boolean,
	captcha: string
}, {dispatch}: any) => {
	const data = await authAPI.login(payload.email, payload.password, payload.rememberMe, payload.captcha)
	if (data.resultCode === ResultCodesEnum.Success) {
		dispatch(getAuthUserData())
	} else {
		if (data.resultCode === ResultCodeForCaptcha.CaptchaIsRequired) {
			dispatch(getCaptchaUrl())
		}

		return data.messages.length > 0 ? data.messages[0] : "Some error"
	}


})

export const getCaptchaUrl = createAsyncThunk('auth/getCaptchaUrl', async (_, {dispatch}: any) => {
	const data = await securityAPI.getCaptcha()
	const captchaURL = data.url

	dispatch(authActions.getCaptchaSuccess(captchaURL))
})

export const logout = createAsyncThunk('auth/logout', async (_, {dispatch}: any) => {
	const response = await authAPI.logout()


	if (response.data.resultCode === 0) {
		dispatch(authActions.setAuthUsersData({userId: null, email: null, login: null, isAuth: false}))
	}

})