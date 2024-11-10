import {chatAPI, ChatMessageAPIType, StatusType} from "../../api/chat-api";
import {Dispatch} from "redux";
import {v1} from 'uuid'
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";


let initialState = {
	messages: [] as ChatMessageType[],
	status: 'pending' as StatusType

}



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
})

export const {actions: chatActions, reducer: chatReducer} = chatSlice


type ChatMessageType = ChatMessageAPIType & { id: string }

