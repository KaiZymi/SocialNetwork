import React, {useCallback, useEffect} from 'react'

import styles from "./Users.module.css";

import User from "./User";
import Paginator from "../../common/Paginators/Paginator";
import {UsersSearchForm} from "./UsersSearchForm";
import {FilterType} from "../../features/users/users_reducer";
import {
	getCurrentPage,
	getFollowingInProgress,
	getPageSize,
	getTotalUserCount,
	getUsers,
	getUsersFilter
} from "../../features/users/selector_users";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate, useSearchParams} from "react-router-dom";
import {follow, requestUsers, unfollow} from "../../features/users/users_actions";


export const Users = () => {

	const users = useSelector(getUsers)
	const pageSize = useSelector(getPageSize)
	const totalUsersCount = useSelector(getTotalUserCount)
	const currentPage = useSelector(getCurrentPage)
	const filter = useSelector(getUsersFilter)
	const followingInProgress = useSelector(getFollowingInProgress)

	const dispatch: any = useDispatch()
	const history = useNavigate()
	const [searchParams] = useSearchParams()

	useEffect(() => {
		history({
			pathname: "/users",
			search: `?term=${filter.term}&friend=${filter.friend}&page=${currentPage}`
		})
	}, [filter, currentPage]);

	useEffect(() => {

		const parsed = Object.fromEntries(new URLSearchParams(searchParams.toString())) as {
			term: string,
			page: string,
			friend: string
		}

		let actualPage = currentPage
		let actualFilter = filter

		if (!!parsed.page) actualPage = Number(parsed.page)
		if (!!parsed.term) actualFilter = {...actualFilter, term: parsed.term as string}
		switch (parsed.friend) {
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

		dispatch(requestUsers({currentPage: actualPage, pageSize, filter: actualFilter}))
	}, []);

	const onPageChanged = useCallback((pageNumber: number) => {
		dispatch(requestUsers({currentPage: pageNumber, pageSize, filter}))

	}, [dispatch, filter, pageSize])

	const onFilterChanged = useCallback((filter: FilterType) => {
		dispatch(requestUsers({currentPage: 1, pageSize, filter}))
	}, [dispatch, pageSize])

	const followHandler = useCallback((userId: number) => {
		dispatch(follow(userId))
	}, [dispatch])

	const unfollowHandler = useCallback((userId: number) => {
		dispatch(unfollow(userId))
	}, [dispatch])


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





