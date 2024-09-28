import {AppStateType} from "../store";


export const getStatusSelector = (state: AppStateType) => {
	return state.chat.status
}

export const getMessagesSelector = (state: AppStateType) => {
	return state.chat.messages
}


