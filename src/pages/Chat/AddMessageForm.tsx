import React, {FC, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {sendMessage} from "../../features/chat/chat_reducer";
import {getStatusSelector} from "../../features/chat/selector_chat";
import {Button, Input} from "antd";
import {SendOutlined} from "@ant-design/icons";


const {TextArea} = Input

export const AddMessageForm: FC<{}> = ({}) => {

	const [message, setMessage] = useState('')

	const status = useSelector(getStatusSelector)


	const dispatch: any = useDispatch()


	const sendMessageHandler = () => {

		if (!message) {
			return
		}
		// dispatch(messagesReceived([{
		// 	userId: profile?.userId as number,
		// 	message,
		// 	photo: profile?.photos.small as string,
		// 	userName: profile?.fullName as string
		// }]));

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
				style = {{resize: 'none', width: '40%'}}
			/>
		</div>
		<div>
			<Button disabled={status !== 'ready'} onClick={sendMessageHandler}
					icon={<SendOutlined />} iconPosition = {'end'}
			>Send</Button>

		</div>

	</>
}