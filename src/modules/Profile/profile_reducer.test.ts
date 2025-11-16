import {profileActions, profileSlice} from "./profile_reducer";
import {PostType} from "../../shared/types/typeReducers";

let state = {
	posts: [
		{message: 'Hi man', likesCount: 12},
		{message: 'Hi cliiman', likesCount: 11}
	]as Array<PostType>,
    profile: null,
    status: ""
}

// const {addPost, deletePost} = useActions()

it('length of posts should be incremented', () =>{
	let action = profileActions.addPost("ouououo")
	let newState = profileSlice.reducer(state, action)

	expect(newState.posts.length).toBe(3)
})


it('length deleting of message should be decrement', () =>{
	let action = profileActions.deletePost(1)
	let newState = profileSlice.reducer(state, action)

	expect(newState.posts.length).toBe(2)
})