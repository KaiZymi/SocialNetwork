import React, {FC, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../redux/store";
import {startMessagesListening, stopMessagesListening} from "../../redux/chat_reducer";
import {Messages} from "./Messages";
import {AddMessageForm} from "./AddMessageForm";

export const Chat: FC<any> = () => {
	const dispatch: any = useDispatch()
	const status = useSelector((state: AppStateType) => state.chat.status)

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