import React, {FC} from 'react'
import {useSelector} from "react-redux";


import Preloader from "../../common/preloader/Preloader";
import {getIsFetching,} from "./model/selector_users";
import {Users} from "./Users";
import {withAuthRedirect} from "../../app/hoc/withAuthRedirect";


type PropsType = {
	pageTitle: string
}


const UsersPageOwn: FC<PropsType> = (props) => {


	const isFetching = useSelector(getIsFetching);
	return <>
		<h2>{props.pageTitle}</h2>
		{isFetching ? <Preloader/> : null}
		<Users/>
	</>
}

export const UsersPage = withAuthRedirect(UsersPageOwn)