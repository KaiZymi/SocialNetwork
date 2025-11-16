import {AuthState} from "../auth_reducer";

export const isAuthSelector = (state: {auth: AuthState}) => {
	return state.auth.isAuth
}

export const currentUserSelector = (state: {auth: AuthState}) => {
	return state.auth.login
}

export const getUserIdSelector = (state: {auth: AuthState}) => {
	return state.auth.userId
}

export const getCaptchaURLSelector = (state: {auth: AuthState}) => {
	return state.auth.captchaURL
}


