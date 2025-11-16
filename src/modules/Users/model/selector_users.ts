import {createSelector} from "@reduxjs/toolkit";
import {UsersState} from "../users_reducer";

export const userSelector = (state: {users:UsersState}) =>{
	return state.users.users
}

export const getUsers = createSelector(userSelector,
	(users) =>{
	return users.filter(u => true)
})



export const getPageSize = (state: {users:UsersState}) =>{
	return state.users.pageSize
}

export const getTotalUserCount = (state: {users:UsersState}) =>{
	return state.users.totalUsersCount
}

export const getCurrentPage = (state: {users:UsersState}) =>{
	return state.users.currentPage
}

export const getIsFetching= (state: {users:UsersState}) =>{
	return state.users.isFetching
}

export const getFollowingInProgress = (state: {users:UsersState}) =>{
	return state.users.followingInProgress
}

export const getUsersFilter = (state: {users:UsersState}) => {
	return state.users.filter
}