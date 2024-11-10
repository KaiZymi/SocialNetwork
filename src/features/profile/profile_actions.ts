import {createAsyncThunk} from "@reduxjs/toolkit";
import {profileAPI} from "../../api/profile-api";
import {ProfileType} from "../../types/typeReducers";
import {profileActions} from "./profile_reducer";

export const getUserProfile = createAsyncThunk('profile/getUserProfile', async (userId:number, {dispatch}:any) =>{
	const data = await profileAPI.getProfile(userId)
	dispatch(profileActions.setUserProfile(data));
})

export const getUserStatus = createAsyncThunk('profile/getUserStatus', async (userId:number, {dispatch}:any) =>{
	const data = await profileAPI.getStatus(userId)
	dispatch(profileActions.setStatus(data));
})

export const savePhoto = createAsyncThunk('profile/savePhoto', async (file:File, {dispatch}:any) =>{
	const data = await profileAPI.savePhoto(file)
	dispatch(profileActions.setPhoto(data.data.photos));
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
		dispatch(profileActions.setStatus(status));
	}
})