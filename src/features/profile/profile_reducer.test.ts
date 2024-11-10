import { profileSlice} from "./profile_reducer";
import {PostType} from "../../types/typeReducers";
import {useActions} from "../../lib/hooks/useActions";

let state = {
	posts: [
		{message: 'Hi man', likesCount: 12},
		{message: 'Hi cliiman', likesCount: 11}
	]as Array<PostType>,
    profile: null,
    status: ""
}

const {addPost, deletePost} = useActions()

it('length of posts should be incremented', () =>{
	let action = addPost("ouououo")
	let newState = profileSlice.reducer(state, action)

	expect(newState.posts.length).toBe(3)
})


it('length deleting of message should be decrement', () =>{
	let action = deletePost(1)
	let newState = profileSlice.reducer(state, action)

	expect(newState.posts.length).toBe(2)
})