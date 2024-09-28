import React, {FC, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../features/store";
import {startMessagesListening, stopMessagesListening} from "../../features/chat/chat_reducer";
import {Messages} from "./Messages";
import {AddMessageForm} from "./AddMessageForm";
import {getStatusSelector} from "../../features/chat/selector_chat";

export const Chat: FC<any> = () => {
	const dispatch: any = useDispatch()
	const status = useSelector(getStatusSelector)

	useEffect(() => {

		dispatch(startMessagesListening())
		return () => {
			dispatch(stopMessagesListening())
		}
	}, []);

	return <>
		{status === 'error' && <div> Some error occured. Please refresh page</div>}

		<Messages/>

		<br/>
		<AddMessageForm/>

	</>

}