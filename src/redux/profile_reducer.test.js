import profileReducer, {addPostActionCreator, deletePost} from "./profile_reducer";

let state = {
	posts: [
		{message: 'Hi man', likesCount: 12},
		{message: 'Hi cliiman', likesCount: 11}
	],
	profile: null,
	status: ""
}

it('legth of posts should be incremented ', () =>{
	let action = addPostActionCreator("ouououo")
	let newState = profileReducer(state, action)

	expect(newState.posts.length).toBe(3)
})


it('length deleting of message should be decrement', () =>{
	let action = deletePost(1)
	let newState = profileReducer(state, action)

	expect(newState.posts.length).toBe(2)
})