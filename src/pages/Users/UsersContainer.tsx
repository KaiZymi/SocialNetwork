import React, {FC} from 'react'
import {useSelector} from "react-redux";




import Preloader from "../../common/preloader/Preloader";
import {getIsFetching,} from "../../features/users/selector_users";
import {Users} from "./Users";


type PropsType = {
    pageTitle: string
}



export const UsersPage: FC<PropsType> = (props) => {

    const isFetching = useSelector(getIsFetching);
    return <>
        <h2>{props.pageTitle}</h2>
        {isFetching ? <Preloader/> : null}
        <Users/>
    </>
}

