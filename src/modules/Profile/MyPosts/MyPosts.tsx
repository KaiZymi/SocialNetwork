import React, {FC} from 'react'
import s from './MyPosts.module.css'
import Post from './Post/Post'
import {AddPostForm} from "./AddPostForm/AddPostForm";
import {useSelector} from "react-redux";
import {getPostsSelector} from "../model/selector_profile";



export const MyPosts: FC<{}> = React.memo((props) => {

	const posts = useSelector(getPostsSelector)

	let postsElements = posts.map(post => <Post key ={post.id} message={post.message} likesCount={post.likesCount}/>)

	return (
		<div>
			<div>
				<h1>My posts</h1>
			</div>

			<AddPostForm/>

			<div className={s.posts}>
				{postsElements}
			</div>


		</div>
	)
})







