import React, {useEffect} from 'react'

import styles from "./Users.module.css";

import User from "./User";
import Paginator from "../../common/Paginators/Paginator";
import {UsersSearchForm} from "./UsersSearchForm";
import {FilterType, follow, requestUsers, unfollow} from "../../redux/users_reducer";
import {
    getCurrentPage,
    getFollowingInProgress,
    getPageSize,
    getTotalUserCount,
    getUsers,
    getUsersFilter
} from "../../redux/selecter_users";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate, useSearchParams} from "react-router-dom";


export const Users = () => {

    const users = useSelector(getUsers)
    const pageSize = useSelector(getPageSize)
    const totalUsersCount = useSelector(getTotalUserCount)
    const currentPage = useSelector(getCurrentPage)
    const filter = useSelector(getUsersFilter)
    const followingInProgress = useSelector(getFollowingInProgress)

    const dispatch:any = useDispatch()
    const history = useNavigate()
    const [searchParams] = useSearchParams()

    useEffect(() => {
        history({
            pathname: "/users",
            search: `?term=${filter.term}&friend=${filter.friend}&page=${currentPage}`
        })
    }, [filter, currentPage]);

    useEffect(() => {

        const parsed = Object.fromEntries(new URLSearchParams(searchParams.toString())) as {term: string, page: string, friend: string}

        let actualPage = currentPage
        let actualFilter = filter

        if(!!parsed.page) actualPage = Number(parsed.page)
        if(!!parsed.term) actualFilter = {...actualFilter, term: parsed.term as string}
        switch (parsed.friend){
            case "null":
                actualFilter = {...actualFilter, friend: null}
                break
            case "true":
                actualFilter = {...actualFilter, friend: true}
                break
            case "false":
                actualFilter = {...actualFilter, friend: false}
                break
        }

        dispatch(requestUsers(actualPage, pageSize, actualFilter))
    }, []);

    const onPageChanged = (pageNumber:number) => {
        dispatch(requestUsers(pageNumber, pageSize, filter))

    }

    const onFilterChanged = (filter: FilterType) => {
        dispatch(requestUsers(1, pageSize, filter))
    }

    const followHandler = (userId: number) => {
        dispatch(follow(userId))
    }

    const unfollowHandler = (userId: number) =>{
        dispatch(unfollow(userId))
    }




    return <div className={styles.cheloveniki}>

        <UsersSearchForm onFilterChanged={onFilterChanged}/>
        <Paginator currentPage={currentPage} onPageChanged={onPageChanged}
                   totalItemsCount={totalUsersCount} pageSize={pageSize}/>

        {
            users.map(u => <User user={u}
									   followingInProgress={followingInProgress}
									   key={u.id}
                                 unfollowHandler={unfollowHandler}
                                 followHandler={followHandler}/>)
        }


    </div>

}





