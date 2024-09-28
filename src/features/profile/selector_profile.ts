import {AppStateType} from "../store";

export const getProfileSelector = (state: AppStateType) =>{
	return state.profilePage.profile
}

export const getStatusSelector = (state: AppStateType) =>{
	return state.profilePage.status
}

