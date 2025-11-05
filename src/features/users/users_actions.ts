import {createAsyncThunk} from "@reduxjs/toolkit";
import {usersAPI} from "../../api/users-api";
import {Dispatch} from "redux";
import {APIResponseType} from "../../api/api";
import {FilterType, usersActions} from "./users_reducer";

export const requestUsers = createAsyncThunk('users/requestUsers', async (payload: {
	currentPage: number,
	pageSize: number,
	filter: FilterType
}, {dispatch}) => {
	dispatch(usersActions.toggleIsFetching(true))
	dispatch(usersActions.setFilter(payload.filter))

	let data = await usersAPI.getUsers(payload.currentPage, payload.pageSize, payload.filter.term, payload.filter.friend)
	dispatch(usersActions.setCurrentPage(payload.currentPage))
	dispatch(usersActions.toggleIsFetching(false))
	dispatch(usersActions.setUsers(data.items))
	dispatch(usersActions.setTotalUserCount(data.totalCount))


})

const _followUnfollowFlow = async (dispatch: Dispatch<any>,
								   userId: number,
								   apiMethod: (userId: number) => Promise<APIResponseType>,
								   actionCreator: (userId: number) => any) => {
	dispatch(usersActions.toggleFollowingProgress({isFetching: true, userId}))
	let response = await apiMethod(userId)

	if (response.resultCode == 0) {
		dispatch(actionCreator(userId))
	}
	dispatch(usersActions.toggleFollowingProgress({isFetching: false, userId}))
}

export const follow = createAsyncThunk('users/follow', async (userId: number, {dispatch}) => {
	await _followUnfollowFlow(dispatch, userId, usersAPI.follow.bind(usersAPI), usersActions.followSuccess)
})

export const unfollow = createAsyncThunk('users/unfollow', async (userId: number, {dispatch}) => {
	await _followUnfollowFlow(dispatch, userId, usersAPI.unfollow.bind(usersAPI), usersActions.unfollowSuccess)
})