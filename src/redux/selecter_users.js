import {createSelector} from "reselect";

export const userSelector = (state) =>{
	return state.usersPage.users
}

export const getUsers = createSelector(userSelector,
	(users) =>{
	return users.filter(u => true)
})



export const getPageSize = (state) =>{
	return state.usersPage.pageSize
}

export const getTotalUserCount = (state) =>{
	return state.usersPage.totalUsersCount
}

export const getCurrentPage = (state) =>{
	return state.usersPage.currentPage
}

export const getIsFetching= (state) =>{
	return state.usersPage.isFetching
}

export const getFollowingInProgress = (state) =>{
	return state.usersPage.followingInProgress
}