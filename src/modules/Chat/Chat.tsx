import React, {FC, useEffect} from "react";
import {useSelector} from "react-redux";

import {Messages} from "./Messages";
import {AddMessageForm} from "./AddMessageForm";
import {getStatusSelector} from "./model/selector_chat";
import {startMessagesListening, stopMessagesListening} from "./model/chat_actions";
import {useAppDispatch} from "../../shared/lib/redux";

export const Chat: FC<any> = () => {
	const dispatch = useAppDispatch()
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