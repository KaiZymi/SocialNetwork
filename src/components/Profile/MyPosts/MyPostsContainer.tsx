import React from 'react'
import {profileActions} from "../../../redux/profile_reducer";
import MyPosts from "./MyPosts";
import {connect} from "react-redux";
import {AppStateType} from "../../../redux/store";
import {PostType} from "../../../types/typeReducers";

type MapStatePropsType = {
    posts: Array<PostType>,
}
type MapDispatchType = {
    addPost: (newPostElement:string) => void
}

let mapStateToProps = (state: AppStateType): MapStatePropsType => {
    return{
        posts: state.profilePage.posts,

    }
}



const MyPostsContainer = connect<MapStatePropsType, MapDispatchType,  {}, AppStateType>(mapStateToProps, {
    addPost: profileActions.addPostActionCreator
})(MyPosts)

export default MyPostsContainer