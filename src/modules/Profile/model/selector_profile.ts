import {ProfileState} from "../profile_reducer";

export const getProfileSelector = (state: {profile: ProfileState}) =>{
	return state.profile.profile
}

export const getStatusSelector = (state: {profile: ProfileState}) =>{
	return state.profile.status
}

export const getPostsSelector = (state: {profile: ProfileState}) =>{
	return state.profile.posts
}
