import {createSlice} from "@reduxjs/toolkit";


let initialState = {
	initialized: false
};



export const appSlice = createSlice({
	name: 'app',
	initialState,
	reducers: {
		initializedSuccess: (state) => {
			state.initialized = true
		}
	}
})




export const {actions: appActions, reducer: appReducer} = appSlice








