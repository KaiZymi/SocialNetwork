import {AppStateType} from "../store";

export const isAuthSelector = (state: AppStateType) => {
	return state.auth.isAuth
}

export const currentUserSelector = (state: AppStateType) => {
	return state.auth.login
}

export const getUserIdSelector = (state: AppStateType) => {
	return state.auth.userId
}

export const getCaptchaURLSelector = (state: AppStateType) => {
	return state.auth.captchaURL
}


