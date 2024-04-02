import {FormAction, stopSubmit} from "redux-form";
import {PhotosType, PostType, ProfileType} from "../types/typeReducers";
import { BaseThunkType, InferActionsTypes} from "./store";

import {profileAPI} from "../api/profile-api";


let initialState = {
	posts: [
		{id: 1, message: 'Hi man', likesCount: 12},
		{id: 2, message: 'Hi cliiman', likesCount: 11}
	]as Array<PostType>,
	profile: null as ProfileType | null,
	status: ""
}



export const profileReducer = (state = initialState, action:ActionsTypes): initialStateType => {
	switch (action.type) {
		case 'SN/PROFILE/ADD-POST':
			let newPost = {
				id: 3,
				message: action.newPostText,
				likesCount: 0
			}
			return {
				...state,
				posts: [...state.posts, {...newPost}],

			}


		case 'SN/PROFILE/DELETE_POST': {
			return {
				...state,
				posts: state.posts.filter(p => p.id !== action.postId)
			}
		}

		case 'SN/PROFILE/SET_PHOTO':{
			return{
				...state,
				profile: {...state.profile, photos: action.photos} as ProfileType
			}
		}

		case 'SN/PROFILE/SET_USER_PROFILE': {
			return {...state, profile: action.profile}
		}

		case 'SN/PROFILE/SET_STATUS': {
			return {...state, status: action.status}
		}

		default:
			return state

	}
}

export const profileActions = {
    addPostActionCreator: (newPostText: string) => ({type: 'SN/PROFILE/ADD-POST', newPostText} as const),

    deletePost: (postId: number) => ({type: 'SN/PROFILE/DELETE_POST', postId} as const),

    setUserProfile: (profile:ProfileType) => ({type: 'SN/PROFILE/SET_USER_PROFILE', profile} as const),

    setStatus: (status: string) => ({type: 'SN/PROFILE/SET_STATUS', status} as const),

    setPhoto: (photos:PhotosType) => ({type: 'SN/PROFILE/SET_PHOTO', photos} as const) ,
}

export const getUserProfile = (userId:number): ThunkType => async (dispatch) => {
	const data = await profileAPI.getProfile(userId)
		dispatch(profileActions.setUserProfile(data));

}

export const getUserStatus = (userId:number): ThunkType => async (dispatch) => {
	const data = await profileAPI.getStatus(userId)
		dispatch(profileActions.setStatus(data));

}

export const savePhoto = (file: File): ThunkType => async (dispatch) => {
	const data = await profileAPI.savePhoto(file)
	dispatch(profileActions.setPhoto(data.data.photos));

}

export const saveProfile = (profile: ProfileType): ThunkType => async (dispatch, getState) => {
	const userId = getState().auth.userId;
	const response = await profileAPI.saveProfile(profile)

	if(response.data.resultCode ===0){
        if (userId != null){
            await dispatch(getUserProfile(userId))
        }else{
            throw new Error ("userId can't be null")
        }

	} else{
		dispatch(stopSubmit("edit-profile", {_error: response.data.messages[0] }));
		return Promise.reject(response.data.messages[0]);
	}
}

export const updateUserStatus = (status: string): ThunkType => async (dispatch: any) => {
	const data = await profileAPI.updateStatus(status)
	if (data.resultCode === 0) {
		dispatch(profileActions.setStatus(status));
	}
}


export default profileReducer


export type initialStateType = typeof initialState
type ActionsTypes = InferActionsTypes<typeof profileActions>
type ThunkType = BaseThunkType<ActionsTypes | FormAction>