import {chatAPI, ChatMessageAPIType, StatusType} from "../chat-api";
import {Dispatch} from "redux";
import {createAsyncThunk} from "@reduxjs/toolkit";
import {chatActions} from "../chat_reducer";

let _newMessageHandler: ((messages: ChatMessageAPIType[]) => void) | null = null

const newMessageHandlerCreator = (dispatch: Dispatch) => {
	if (_newMessageHandler === null) {
		_newMessageHandler = (messages) => {
			dispatch(chatActions.messagesReceived(messages))
		}

	}
	return _newMessageHandler
}


let _statusChangedHandler: ((status: StatusType) => void) | null = null

const statusChangedHandlerCreator = (dispatch: Dispatch) => {
	if (_statusChangedHandler === null) {
		_statusChangedHandler = (status) => {
			dispatch(chatActions.statusChanged(status))
		}

	}

	return _statusChangedHandler
}

export const startMessagesListening = createAsyncThunk('chat/startMessagesListening', async (_, {dispatch}: any) => {
	chatAPI.start()
	chatAPI.subscribe('messages-received', newMessageHandlerCreator(dispatch))
	chatAPI.subscribe('status-changed', statusChangedHandlerCreator(dispatch))
})

export const stopMessagesListening = createAsyncThunk('chat/stopMessagesListening', async (_, {dispatch}: any) => {
	chatAPI.unsubscribe('messages-received', newMessageHandlerCreator(dispatch))
	chatAPI.unsubscribe('status-changed', statusChangedHandlerCreator(dispatch))
	dispatch(chatActions.clearMessages())
	chatAPI.stop()
})

export const sendMessage = createAsyncThunk('chat/sendMessage', async (message: string, {dispatch}: any) => {
	chatAPI.sendMessage(message)
})
