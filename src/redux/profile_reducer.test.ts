import profileReducer, {profileActions} from "./profile_reducer";
import {PostType} from "../types/typeReducers";

let state = {
	posts: [
		{message: 'Hi man', likesCount: 12},
		{message: 'Hi cliiman', likesCount: 11}
	]as Array<PostType>,
    profile: null,
    status: ""
}

it('length of posts should be incremented', () =>{
	let action = profileActions.addPostActionCreator("ouououo")
	let newState = profileReducer(state, action)

	expect(newState.posts.length).toBe(3)
})


it('length deleting of message should be decrement', () =>{
	let action = profileActions.deletePost(1)
	let newState = profileReducer(state, action)

	expect(newState.posts.length).toBe(2)
})