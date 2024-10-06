import {ResultCodeForCaptcha, ResultCodesEnum} from "../../api/api";

// import {ThunkAction} from "redux-thunk";
// import {AppStateType, BaseThunkType, InferActionsTypes} from "./store";
import {authAPI} from "../../api/auth-api";
import {securityAPI} from "../../api/security-api";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";


const initialState = {
	userId: null as number | null,
	email: null as string | null,
	login: null as string | null,
	isAuth: false,
	captchaURL: null as string | null
}


export const getAuthUserData = createAsyncThunk('auth/getAuthUserData', async (_, {dispatch}: any) => {
	const meData = await authAPI.me()
	if (meData.resultCode === ResultCodesEnum.Success) {
		let {id, login, email} = meData.data

		dispatch(setAuthUsersData({userId: id, email, login, isAuth: true}))
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


		return data.message.length > 0 ? data.message[0] : "Some error"
	}


})

export const getCaptchaUrl = createAsyncThunk('auth/getCaptchaUrl', async (_, {dispatch}: any) => {
	const data = await securityAPI.getCaptcha()
	const captchaURL = data.url
	dispatch(getCaptchaSuccess(captchaURL))
})

export const logout = createAsyncThunk('auth/logout', async (_, {dispatch}: any) => {
	const response = await authAPI.logout()

	if (response.data.resultCode === 0) {
		dispatch(setAuthUsersData({userId: null, email: null, login: null, isAuth: false}));
	}

})


export const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		setAuthUsersData: (state, {payload}) => {
			Object.assign(state, payload)


		},
		getCaptchaSuccess: (state, action) => {
			state.captchaURL = action.payload.captchaURL
		}
	}
})

export const {setAuthUsersData, getCaptchaSuccess} = authSlice.actions




