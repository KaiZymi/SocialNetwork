import React, {FC, useState} from "react";
import {useSelector} from "react-redux";

import {getStatusSelector} from "./model/selector_chat";
import {Button, Input} from "antd";
import {SendOutlined} from "@ant-design/icons";
import {sendMessage} from "./model/chat_actions";
import {useAppDispatch} from "../../shared/lib/redux";


const {TextArea} = Input

export const AddMessageForm: FC<{}> = ({}) => {

	const [message, setMessage] = useState('')

	const status = useSelector(getStatusSelector)


	const dispatch = useAppDispatch()


	const sendMessageHandler = () => {

		if (!message) {
			return
		}


		dispatch(sendMessage(message))

		setMessage('')
	}


	return <>
		<div>

			<TextArea
				rows={3}
				onChange={(e) => setMessage(e.currentTarget.value)}
				value={message}
				maxLength={100}
				placeholder={'Введите своё сообщение'}
				showCount
				style={{resize: 'none', width: '40%'}}
			/>
		</div>
		<div>
			<Button disabled={status !== 'ready'} onClick={sendMessageHandler}
					icon={<SendOutlined/>} iconPosition={'end'}
			>Send</Button>

		</div>

	</>
}