// import {ThunkAction} from "redux-thunk";
// import {AppStateType, BaseThunkType, InferActionsTypes} from "./store";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";


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
})


export const {actions:authActions, reducer:authReducer} = authSlice




