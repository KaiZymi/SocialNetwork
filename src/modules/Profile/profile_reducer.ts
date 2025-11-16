import {PhotosType, PostType, ProfileType} from "../../shared/types/typeReducers";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {rootReducer} from "../../shared/lib/redux";


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
}).injectInto(rootReducer)



export type ProfileState = typeof initialState;
export const {actions: profileActions} = profileSlice






