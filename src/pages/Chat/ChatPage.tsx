import React from "react";
import {Chat} from "./Chat";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";


const ChatPageOwn = () => {


	return <>
		<Chat/>
	</>

}

export const ChatPage = withAuthRedirect(ChatPageOwn)









