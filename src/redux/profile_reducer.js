import {profileAPI, usersAPI} from "../api/api";

const ADD_POST = 'ADD-POST';
const SET_USER_PROFILE = 'SET_USER_PROFILE'
const SET_STATUS = 'SET_STATUS'
const DELETE_POST = 'DELETE_POST'


let initialState = {
	posts: [
		{id: 1, message: 'Hi man', likesCount: 12},
		{id: 2, message: 'Hi cliiman', likesCount: 11}
	],
	profile: null,
	status: ""
}

export const profileReducer = (state = initialState, action) => {
	switch (action.type) {
		case ADD_POST:
			let newPost = {
				id: 3,
				message: action.newPostText,
				likesCount: 0
			}
			return {
				...state,
				posts: [...state.posts, {...newPost}],

			}


		case DELETE_POST: {
			return {
				...state,
				posts: state.posts.filter(p => p.id !== action.postId)
			}
		}

		case SET_USER_PROFILE: {
			return {...state, profile: action.profile}
		}

		case SET_STATUS: {
			return {...state, status: action.status}
		}

		default:
			return state

	}
}

export const addPostActionCreator = (newPostText) => ({type: ADD_POST, newPostText})
export const deletePost = (postId) => ({type: DELETE_POST, postId})

export const setUserProfile = (profile) => ({type: SET_USER_PROFILE, profile})
export const setStatus = (status) => ({type: SET_STATUS, status})


export const getUserProfile = (userId) => async (dispatch) => {
	const response = await usersAPI.getProfile(userId)
		dispatch(setUserProfile(response.data));


}

export const getUserStatus = (userId) => async (dispatch) => {
	const response = await profileAPI.getStatus(userId)
		dispatch(setStatus(response.data));

}

export const updateUserStatus = (status) => async (dispatch) => {
	const response = await profileAPI.updateStatus(status)
	if (response.data.resultCode === 0) {
		dispatch(setStatus(status));
	}

}


export default profileReducer