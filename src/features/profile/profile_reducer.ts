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

export const {actions: profileActions, reducer: profileReducer} = profileSlice






