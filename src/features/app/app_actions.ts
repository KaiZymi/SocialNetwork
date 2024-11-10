import {createAsyncThunk} from "@reduxjs/toolkit";

import {appActions} from "./app_reducer";
import {useActions} from "../../lib/hooks/useActions";
import {getAuthUserData} from "../auth/auth_actions";

export const initializeApp = createAsyncThunk('app/initializeApp', async (_, {dispatch}: any) => {


	let promise = dispatch(getAuthUserData())

	Promise.all([promise])
		.then(() => {
			dispatch(appActions.initializedSuccess());
		});
})
