
import {ChatState} from "../chat_reducer";


export const getStatusSelector = (state: {chat:ChatState}) => {
	return state.chat.status
}

export const getMessagesSelector = (state: {chat:ChatState}) => {
	return state.chat.messages
}

