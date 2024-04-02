import {dialogsDataType, messageDataType} from "../types/typeReducers";
import {ThunkAction} from "redux-thunk";
import {AppStateType, InferActionsTypes} from "./store";


let  initialState = {
    dialogsData: [
        {id: 1, name: 'Mark'},
        {id: 2, name: 'Andrew'},
        {id: 3, name: 'Sveta'},
        {id: 4, name: 'Vector'}

    ] as Array<dialogsDataType>,

    messageData:[
        {id: 1, message: 'Hi'},
        {id: 2, message: 'Herooo exprensive'},
        {id: 3, message: 'MY GOD'}

    ] as Array<messageDataType>,

}

export type initialStateType = typeof initialState

const dialogsReducer = (state = initialState, action: ActionsTypes): initialStateType => {
	switch (action.type){

		case 'SN/DIALOGS/SEND_MESSAGE':
			let body = action.newMessageBody
			return  {
				...state,
				messageData: [...state.messageData, {id: 4, message: body}]
			}

		default:
			return state
	}
}

// type ThunkType = BaseThunkType<ActionsTypes>

export const actions = {
    sendMessage: (newMessageBody: string) => ({ type: 'SN/DIALOGS/SEND_MESSAGE', newMessageBody } as const)
}

type ActionsTypes = InferActionsTypes<typeof actions >




export default dialogsReducer