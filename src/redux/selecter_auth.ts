import {AppStateType} from "./store";

export const isAuthSelector = (state: AppStateType) => {
	return state.auth.isAuth
}

export const currentUserSelector = (state: AppStateType) => {
	return state.auth.login
}
