import {chatAPI, ChatMessageAPIType, StatusType} from "../api/chat-api";
import {BaseThunkType, InferActionsTypes} from "./store";
import {FormAction} from "redux-form";
import {Dispatch} from "redux";
import {v1} from 'uuid'
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";


let initialState = {
	messages: [] as ChatMessageType[],
	status: 'pending' as StatusType

}

let _newMessageHandler: ((messages: ChatMessageAPIType[]) => void) | null = null

const newMessageHandlerCreator = (dispatch: Dispatch) => {
	if(_newMessageHandler === null){
		_newMessageHandler = (messages) => {
			dispatch(messagesReceived(messages))
		}

	}
	return _newMessageHandler
}


let _statusChangedHandler: ((status: StatusType) => void) | null = null

const statusChangedHandlerCreator = (dispatch: Dispatch) =>{
	if(_statusChangedHandler === null){
		_statusChangedHandler = (status) => {
			dispatch(statusChanged(status))
		}

	}

	return _statusChangedHandler
}

export const startMessagesListening = createAsyncThunk('chat/startMessagesListening', async (_, {dispatch}:any) =>{
	chatAPI.start()
	chatAPI.subscribe('messages-received',newMessageHandlerCreator(dispatch))
	chatAPI.subscribe('status-changed',statusChangedHandlerCreator(dispatch))
})

export const stopMessagesListening = createAsyncThunk('chat/stopMessagesListening', async (_, {dispatch}:any) =>{
	chatAPI.unsubscribe('messages-received',newMessageHandlerCreator(dispatch))
	chatAPI.unsubscribe('status-changed',statusChangedHandlerCreator(dispatch))
	dispatch(clearMessages())
	chatAPI.stop()
})

export const sendMessage = createAsyncThunk('chat/sendMessage', async (message:string, {dispatch}:any) =>{
	chatAPI.sendMessage(message)
})



export const chatSlice = createSlice({
	name: 'chat',
	initialState,
	reducers:{
		messagesReceived: (state, action: PayloadAction<ChatMessageAPIType[]>) => {
			Object.assign(state.messages, action.payload.map( m => ({...m, id: v1()}))).filter((m,index,array) => index >= array.length - 100)

		},
		statusChanged: (state,action) => {
			state.status = action.payload
		},
		clearMessages: (state) => {
			state.messages = []
		}
	}
})

export const {messagesReceived, statusChanged, clearMessages} = chatSlice.actions



// export type initialStateType = typeof initialState
//
// type ActionsTypes = InferActionsTypes<typeof actions>
//
// type ThunkType = BaseThunkType<ActionsTypes | FormAction>

type ChatMessageType = ChatMessageAPIType & {id:string}




// const chatReducer = (state = initialState, action: ActionsTypes):initialStateType => {
// 	switch (action.type) {
// 		case 'SN/chat/MESSAGES_RECEIVED':
// 			return {
// 				...state,
// 				messages: [...state.messages, ...action.payload.messages.map( m => ({...m, id: v1()}) ) ]
// 					.filter((m,index,array) => index >= array.length - 100)
// 			}
// 		case 'CLEAR_MESSAGES':
// 			return {
// 				...state,
// 				messages: [],
// 			};
// 		case 'SN/chat/STATUS_CHANGED':
// 			return {
// 				...state,
// 				status: action.payload.status
// 			}
// 		default:
// 			return state;
// 	}
// }
//
// export const actions = {
// 	messagesReceived: (messages: ChatMessageAPIType[]) => ({
// 		type: 'SN/chat/MESSAGES_RECEIVED', payload:
// 			{messages}
// 	} as const),
// 	statusChanged: (status: StatusType) => ({
// 		type: 'SN/chat/STATUS_CHANGED', payload:
// 			{status}
// 	} as const),
// 	clearMessages: () =>({
// 		type: 'CLEAR_MESSAGES'
// 	} as const)
//
// }
//
//
//
//

// export const startMessagesListening = (): ThunkType => async (dispatch) => {
// 	chatAPI.start()
// 	chatAPI.subscribe('messages-received',newMessageHandlerCreator(dispatch))
// 	chatAPI.subscribe('status-changed',statusChangedHandlerCreator(dispatch))
// }
// export const stopMessagesListening = (): ThunkType => async (dispatch) => {
// 	chatAPI.unsubscribe('messages-received',newMessageHandlerCreator(dispatch))
// 	chatAPI.unsubscribe('status-changed',statusChangedHandlerCreator(dispatch))
// 	dispatch(actions.clearMessages())
// 	chatAPI.stop()
//
// }
//
// export const sendMessage = (message:string): ThunkType => async (dispatch) => {
// 	chatAPI.sendMessage(message)
// }
