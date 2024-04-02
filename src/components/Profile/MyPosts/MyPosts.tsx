import React, {FC} from 'react'
import s from './MyPosts.module.css'
import Post from './Post/Post'
import PostReduxForm, {AddPostFormValuesType} from "./AddPostForm/AddPostForm";
import {PostType} from "../../../types/typeReducers";


type MapStatePropsType = {
    posts: Array<PostType>,


}
type MapDispatchPropsType = {
    addPost: (newPostText:string) => void
}

const MyPosts: FC<MapStatePropsType & MapDispatchPropsType> = (props) => {

	let postsElements = props.posts.map(post => <Post message={post.message} likesCount={post.likesCount}/>)

	const addNewPost = (values:AddPostFormValuesType) => {
		props.addPost(values.newPostText)
	}

	return (
		<div>
			<div>
				<h1>My posts</h1>
			</div> 

			<PostReduxForm onSubmit={addNewPost}/>

			<div className={s.posts}>
				{postsElements}
			</div>
		</div>
	)
}




const MyPostsMemorized = React.memo(MyPosts);

export default MyPostsMemorized;


