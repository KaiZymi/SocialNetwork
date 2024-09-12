import React, {FC, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../redux/store";
import {sendMessage} from "../../redux/chat_reducer";

export const AddMessageForm: FC<{}> = ({}) => {

	const [message, setMessage] = useState('')

	const status = useSelector((state: AppStateType) => state.chat.status)


	const dispatch: any = useDispatch()


	const sendMessageHandler = () => {

		if (!message) {
			return
		}

		dispatch(sendMessage(message))

		setMessage('')
	}


	return <>
		<div>
			<textarea onChange={(e) => setMessage(e.currentTarget.value)} value={message}></textarea>
		</div>
		<div>
			<button disabled={status !== 'ready'} onClick={sendMessageHandler}>Send</button>
		</div>

	</>
}