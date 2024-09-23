import {getAuthUserData, setAuthUsersData} from "./auth_reducer";
import {InferActionsTypes} from "./store";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {authAPI} from "../api/auth-api";
import {ResultCodesEnum} from "../api/api";


let initialState = {
    initialized: false
};

export const initializeApp = createAsyncThunk('app/initializeApp', async (_, {dispatch}:any) =>{
	let promise =  dispatch(getAuthUserData())

	Promise.all([promise])
		.then(() => {
			dispatch(initializedSuccess());
		});
})


export const appSlice = createSlice({
	name: 'app',
	initialState,
	reducers:{
		initializedSuccess: (state) => {
			state.initialized = true
		}
	}
})


// export type initialStateType =  typeof initialState
//
// type ActionsType = InferActionsTypes<typeof actions>


export const {initializedSuccess} = appSlice.actions


// const appReducer = (state = initialState, action: ActionsType):initialStateType => {
//     switch(action.type) {
//         case 'SN/APP/INITIALIZED_SUCCESS':
//             return {
//                 ...state,
// 				initialized: true
//             }
//
//         default:
//             return state;
//     }
// }
//
//
//
// export const actions = {
//     initializedSuccess: () => ({ type: 'SN/APP/INITIALIZED_SUCCESS'})
// }



// type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, initializedSuccessType>

// export const initializeApp = () => (dispatch:any) => {
// 	let promise =  dispatch(getAuthUserData())
//
// 	Promise.all([promise])
// 		.then(() => {
// 			dispatch(actions.initializedSuccess());
// 		});
//
// }




