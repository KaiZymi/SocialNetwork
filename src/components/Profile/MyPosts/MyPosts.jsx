import React from 'react'
import s from './MyPosts.module.css'
import Post from './Post/Post'
import {Field, reduxForm} from "redux-form";
import {Textarea} from "../../../common/FormsControls/FormsControls";
import {maxLengthCreator, required} from "../../../utils/validators/validations";


const MyPosts = (props) => {

	let postsElemets = props.posts.map(post => <Post message={post.message} likesCount={post.likesCount}/>)



	const addNewPost = (values) => {
		props.addPost(values.newPostText)
	}

	return (
		<div>
			<div>
				<h1>My posts</h1>
			</div> 

			<PostReduxForm onSubmit={addNewPost}/>

			<div className={s.posts}>
				{postsElemets}
			</div>
		</div>
	)
}


const PostForm = (props) => {

	const maxLength = maxLengthCreator(15)

	return (
		<div className={s.postsBlock}>

			<form onSubmit={props.handleSubmit}>
				<div>
					<Field component={Textarea} name={"newPostText"}
							validate={[required, maxLength] }
					></Field>
				</div>
				<div>
					<button>Add post</button>
				</div>
			</form>

		</div>
	)
}


const PostReduxForm = reduxForm({
	form: 'postsForm'
})(PostForm)

export default MyPosts