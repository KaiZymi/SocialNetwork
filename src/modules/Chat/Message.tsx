import React, {FC} from "react";
import {ChatMessageAPIType} from "./chat-api";

export const Message: FC<{ message: ChatMessageAPIType }> = React.memo(({message}) => {

	return <>

		<img src={message.photo} alt=""/> <b>{message.userName}</b>

		<br/>

		{message.message}

		<hr/>
	</>
})