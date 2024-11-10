import React, {FC, useState} from "react";
import {useDispatch, useSelector} from "react-redux";

import {getStatusSelector} from "../../features/chat/selector_chat";
import {Button, Input} from "antd";
import {SendOutlined} from "@ant-design/icons";
import {useActions} from "../../lib/hooks/useActions";
import {sendMessage} from "../../features/chat/chat_actions";


const {TextArea} = Input

export const AddMessageForm: FC<{}> = ({}) => {

	const [message, setMessage] = useState('')

	const status = useSelector(getStatusSelector)


	const dispatch:any = useDispatch()


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