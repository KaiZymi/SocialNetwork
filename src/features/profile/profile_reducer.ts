
import {PhotosType, PostType, ProfileType} from "../../types/typeReducers";

import {profileAPI} from "../../api/profile-api";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";


let initialState = {
	posts: [
		{id: 1, message: 'Hi man', likesCount: 12},
		{id: 2, message: 'Hi cliiman', likesCount: 11}
	]as Array<PostType>,
	profile: null as ProfileType | null,
	status: ""
}

export const getUserProfile = createAsyncThunk('profile/getUserProfile', async (userId:number, {dispatch}:any) =>{
	const data = await profileAPI.getProfile(userId)
	dispatch(setUserProfile(data));
})

export const getUserStatus = createAsyncThunk('profile/getUserStatus', async (userId:number, {dispatch}:any) =>{
	const data = await profileAPI.getStatus(userId)
	dispatch(setStatus(data));
})

export const savePhoto = createAsyncThunk('profile/savePhoto', async (file:File, {dispatch}:any) =>{
	const data = await profileAPI.savePhoto(file)
	dispatch(setPhoto(data.data.photos));
})

export const saveProfile = createAsyncThunk('profile/savePhoto', async (profile:ProfileType, {dispatch, getState}:any) =>{
	const userId = getState().auth.userId;
	const response = await profileAPI.saveProfile(profile)

	if(response.data.resultCode === 0){
		if (userId != null){
			await dispatch(getUserProfile(userId))
		}else{
			throw new Error ("userId can't be null")
		}

	} else{
		return Promise.reject(response.messages[0]);
	}
})

export const updateUserStatus = createAsyncThunk('profile/savePhoto', async (status:string, {dispatch}:any) =>{
	const data = await profileAPI.updateStatus(status)
	if (data.resultCode === 0) {
		dispatch(setStatus(status));
	}
})

export const profileSlice = createSlice({
	name: 'profile',
	initialState,
	reducers:{
		addPost: (state, action: PayloadAction<string>) => {
			let newPost = {
				id: Date.now(),
				message: action.payload,
				likesCount: 0
			}
			state.posts.push(newPost);
		},
		deletePost(state, action: PayloadAction<number>) {
			state.posts = state.posts.filter(p => p.id !== action.payload);
		},
		setUserProfile(state, action: PayloadAction<ProfileType>) {
			state.profile = action.payload;
		},
		setStatus(state, action: PayloadAction<string>) {
			state.status = action.payload;
		},
		setPhoto(state, action: PayloadAction<PhotosType>) {
			if (state.profile) {
				state.profile.photos = action.payload;
			}
		},

	}
})

export const {addPost, deletePost, setUserProfile, setStatus, setPhoto} = profileSlice.actions


// export type initialStateType = typeof initialState
// type ActionsTypes = InferActionsTypes<typeof profileActions>
// type ThunkType = BaseThunkType<ActionsTypes | FormAction>

// export const profileReducer = (state = initialState, action:ActionsTypes): initialStateType => {
// 	switch (action.type) {
// 		case 'SN/PROFILE/ADD-POST':
// 			let newPost = {
// 				id: 3,
// 				message: action.newPostText,
// 				likesCount: 0
// 			}
// 			return {
// 				...state,
// 				posts: [...state.posts, {...newPost}],
//
// 			}
//
//
// 		case 'SN/PROFILE/DELETE_POST': {
// 			return {
// 				...state,
// 				posts: state.posts.filter(p => p.id !== action.postId)
// 			}
// 		}
//
// 		case 'SN/PROFILE/SET_PHOTO':{
// 			return{
// 				...state,
// 				profile: {...state.profile, photos: action.photos} as ProfileType
// 			}
// 		}
//
// 		case 'SN/PROFILE/SET_USER_PROFILE': {
// 			return {...state, profile: action.profile}
// 		}
//
// 		case 'SN/PROFILE/SET_STATUS': {
// 			return {...state, status: action.status}
// 		}
//
// 		default:
// 			return state
//
// 	}
// }
//
// export const profileActions = {
//     addPostActionCreator: (newPostText: string) => ({type: 'SN/PROFILE/ADD-POST', newPostText} as const),
//
//     deletePost: (postId: number) => ({type: 'SN/PROFILE/DELETE_POST', postId} as const),
//
//     setUserProfile: (profile:ProfileType) => ({type: 'SN/PROFILE/SET_USER_PROFILE', profile} as const),
//
//     setStatus: (status: string) => ({type: 'SN/PROFILE/SET_STATUS', status} as const),
//
//     setPhoto: (photos:PhotosType) => ({type: 'SN/PROFILE/SET_PHOTO', photos} as const) ,
// }
//
// export const getUserProfile = (userId:number): ThunkType => async (dispatch) => {
// 	const data = await profileAPI.getProfile(userId)
// 		dispatch(profileActions.setUserProfile(data));
//
// }
//
// export const getUserStatus = (userId:number): ThunkType => async (dispatch) => {
// 	const data = await profileAPI.getStatus(userId)
// 		dispatch(profileActions.setStatus(data));
//
// }
//
// export const savePhoto = (file: File): ThunkType => async (dispatch) => {
// 	const data = await profileAPI.savePhoto(file)
// 	dispatch(profileActions.setPhoto(data.data.photos));
//
// }
//
// export const saveProfile = (profile: ProfileType): ThunkType => async (dispatch, getState) => {
// 	const userId = getState().auth.userId;
// 	const response = await profileAPI.saveProfile(profile)
//
// 	if(response.data.resultCode === 0){
//         if (userId != null){
//             await dispatch(getUserProfile(userId))
//         }else{
//             throw new Error ("userId can't be null")
//         }
//
// 	} else{
// 		dispatch(stopSubmit("edit-profile", {_error: response.messages[0] }));
// 		return Promise.reject(response.messages[0]);
// 	}
// }
//
// export const updateUserStatus = (status: string): ThunkType => async (dispatch: any) => {
// 	const data = await profileAPI.updateStatus(status)
// 	if (data.resultCode === 0) {
// 		dispatch(profileActions.setStatus(status));
// 	}
// }





