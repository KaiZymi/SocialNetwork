import {createSlice} from "@reduxjs/toolkit";
import {rootReducer} from "../../shared/lib/redux";


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
}).injectInto(rootReducer)




export const {actions: appActions} = appSlice








