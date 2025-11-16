import React from "react";
import {Chat} from "./Chat";
import {withAuthRedirect} from "../../app/hoc/withAuthRedirect";


const ChatPageOwn = () => {


	return <>
		<Chat/>
	</>

}

export const ChatPage = withAuthRedirect(ChatPageOwn)









