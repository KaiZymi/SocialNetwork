import {authAPI, securityAPI} from "../api/api";
import {stopSubmit} from "redux-form";

const SET_USERS_DATA = 'SET_USERS_DATA'
const GET_CAPTCHA_SUCCESS = 'GET_CAPTCHA_SUCCESS'


let initialState = {
	userId: null,
	email: null,
	login: null,
	isAuth: false,
	captchaURL: null

};

const authReducer = (state = initialState, action) => {
	switch (action.type) {
		case SET_USERS_DATA:
		case GET_CAPTCHA_SUCCESS:
			return {
				...state,
				...action.payload
			}

		default:
			return state;
	}
}


export const setAuthUsersData = (userId, email, login, isAuth) => ({
	type: SET_USERS_DATA, payload:
		{userId, email, login, isAuth}
})

export const getCaptchaSuccess = (captchaURL) => ({
	type: GET_CAPTCHA_SUCCESS, payload: {captchaURL}
})



export const getAuthUserData = () => async (dispatch) => {
	const response = await authAPI.me()

	if (response.data.resultCode === 0) {
		let {id, login, email} = response.data.data
		dispatch(setAuthUsersData(id, email, login, true));
	}

}


export const login = (email, password, rememberMe, captcha) => async (dispatch) => {
	const response = await authAPI.login(email, password, rememberMe, captcha)
	// success, get auth data
	if (response.data.resultCode === 0) {
		dispatch(getAuthUserData())
	} else {
		if (response.data.resultCode === 10) {
			dispatch(getCaptchaUrl())
		}

		let message = response.data.messages.length > 0 ? response.data.messages[0] :
			"Some error"
		dispatch(stopSubmit("login", {_error: message}))
	}

}
export const getCaptchaUrl = () => async (dispatch) => {
	const response = await securityAPI.getCaptcha()
	const captchaURL = response.data.url
	dispatch(getCaptchaSuccess(captchaURL))

}

export const logout = () => async (dispatch) => {
	const response = await authAPI.logout()

	if (response.data.resultCode === 0) {
		dispatch(setAuthUsersData(null, null, null, false));
	}

}

export default authReducer