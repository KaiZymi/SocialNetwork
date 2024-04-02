import React, {FC} from 'react'
// @ts-ignore
import styles from "./Users.module.css";

import User from "./User";
import Paginator from "../../common/Paginators/Paginator";
import {UsersType} from "../../types/typeReducers";

type PropsType = {
    totalUsersCount: number,
    pageSize: number,
    currentPage:number,
    onPageChanged: (pageNumber:number)=> void,
    users: Array<UsersType>,
    followingInProgress: Array<number>,
    unfollow: (userId:number) => void,
    follow: (userId:number)=>void
}


let Users: FC<PropsType> = (props) => {

    return <div className={styles.cheloveniki}>
		<Paginator currentPage={props.currentPage} onPageChanged={props.onPageChanged}
				   totalItemsCount={props.totalUsersCount} pageSize={props.pageSize}/>

        {
            props.users.map(u => <User user={u}
									   followingInProgress={props.followingInProgress}
									   key={u.id}
									   unfollow={props.unfollow}
									   follow={props.follow}/>)
        }
    </div>

}

export default Users

