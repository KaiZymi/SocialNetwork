import React, {FC, useEffect, useRef, useState} from "react";
import {useSelector} from "react-redux";
import {AppStateType} from "../../features/store";
import {Message} from "./Message";
import {getMessagesSelector} from "../../features/chat/selector_chat";

export const Messages: FC<{}> = () => {
	const messages = useSelector(getMessagesSelector)
	const messagesAnchorRef = useRef<HTMLDivElement>(null)
	const [isAutoScroll, setIsAutoScroll] = useState(true)

	const scrollHandler = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
		const element = e.currentTarget
		if (Math.abs((element.scrollHeight - element.scrollTop) - element.clientHeight) < 100) {
			!isAutoScroll && setIsAutoScroll(true)
		} else {
			isAutoScroll && setIsAutoScroll(false)
		}

	}


	useEffect(() => {
		if (isAutoScroll) {
			setTimeout(() => {
				messagesAnchorRef.current?.scrollIntoView({ behavior: "smooth" });
			}, 500);
		}
	}, [messages, isAutoScroll]);


	return <div style={{height: "400px", overflowY: 'auto'}} onScroll={scrollHandler}>
		{messages.map((m) => <Message key={m.id} message={m}/>)}
		<div ref={messagesAnchorRef}></div>

	</div>
}