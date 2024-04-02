import {getAuthUserData} from "./auth_reducer";
import {InferActionsTypes} from "./store";


let initialState = {
    initialized: false
};

export type initialStateType =  typeof initialState

type ActionsType = InferActionsTypes<typeof actions>

const appReducer = (state = initialState, action: ActionsType):initialStateType => {
    switch(action.type) {
        case 'SN/APP/INITIALIZED_SUCCESS':
            return {
                ...state,
				initialized: true
            }

        default:
            return state;
    }
}



export const actions = {
    initializedSuccess: () => ({ type: 'SN/APP/INITIALIZED_SUCCESS'})
}



// type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, initializedSuccessType>

export const initializeApp = () => (dispatch:any) => {
	let promise =  dispatch(getAuthUserData())

	Promise.all([promise])
		.then(() => {
			dispatch(actions.initializedSuccess());
		});

}




export default appReducer