import {ChatMessageAPIType, StatusType} from "./chat-api";
import {v1} from 'uuid'
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {rootReducer} from "../../shared/lib/redux";


let initialState = {
	messages: [] as ChatMessageType[],
	status: 'pending' as StatusType

}
type ChatMessageType = ChatMessageAPIType & { id: string }


export const chatSlice = createSlice({
	name: 'chat',
	initialState,
	reducers: {
		messagesReceived: (state, action: PayloadAction<ChatMessageAPIType[]>) => {
			const newMessages = action.payload.map(m => ({...m, id: v1()}))
			state.messages = [...state.messages, ...newMessages].filter((m, index, array) => index >= array.length - 100)


		},
		statusChanged: (state, action) => {
			state.status = action.payload
		},
		clearMessages: (state) => {
			state.messages = []
		}
	}
}).injectInto(rootReducer)

export const {actions: chatActions} = chatSlice

export type ChatState = typeof initialState;


