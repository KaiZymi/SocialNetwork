import {createAsyncThunk} from "@reduxjs/toolkit";
import {appActions} from "../app_reducer";
import {getAuthUserData} from "../../Login";

export const initializeApp = createAsyncThunk('app/initializeApp', async (_, {dispatch}) => {
	let promise = dispatch(getAuthUserData())
	Promise.all([promise])
		.then(() => {
			dispatch(appActions.initializedSuccess());
		});
})
