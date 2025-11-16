import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {rootReducer} from "../../shared/lib/redux";


const initialState = {
	userId: null as number | null,
	email: null as string | null,
	login: null as string | null,
	isAuth: false,
	captchaURL: null as string | null
}



export const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		setAuthUsersData: (state, {payload}) => {
			Object.assign(state, payload)


		},
		getCaptchaSuccess: (state, action : PayloadAction<string>) => {
			state.captchaURL = action.payload
		}
	}
}).injectInto(rootReducer)

export type AuthState = typeof initialState

export const {actions:authActions} = authSlice





