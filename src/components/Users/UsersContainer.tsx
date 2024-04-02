import React, {ComponentType} from 'react'
import {connect} from "react-redux";
import {actions, follow, requestUsers, unfollow} from "../../redux/users_reducer";


import Users from "./Users";

import Preloader from "../../common/preloader/Preloader";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {compose} from "redux";
import {
    getCurrentPage,
    getFollowingInProgress,
    getIsFetching,
    getPageSize,
    getTotalUserCount,
    getUsers,
} from "../../redux/selecter_users";


import {UsersType} from "../../types/typeReducers";
import {AppStateType} from "../../redux/store";


type MapStatePropsType = {
    currentPage: number,
    pageSize: number,
    followingInProgress: Array<number>
    isFetching: boolean,
    users: Array<UsersType>,
    totalUsersCount: number,



}
type MapDispatchPropsType = {
    unfollow: (userId:number) =>void,
    follow: (userId:number) => void,
    getUsers: (currentPage: number, pageSize: number) => void,
    setCurrentPage: (pageNumber: number)=>void,

}
type OwnPropsType = {
    pageTitle: string
}




type PropsType = MapDispatchPropsType & MapStatePropsType & OwnPropsType



class UsersComponent extends React.Component<PropsType> {
    
    componentDidMount() {
        this.props.getUsers(this.props.currentPage, this.props.pageSize)
    }

    onPageChanged = (pageNumber:number) => {
        this.props.setCurrentPage(pageNumber);
        this.props.getUsers(pageNumber, this.props.pageSize)

    }


    render() {
        return <>
            <h2>{this.props.pageTitle}</h2>
            {this.props.isFetching ? <Preloader/> : null }
            <Users currentPage={this.props.currentPage}
                   users={this.props.users}
                   unfollow={this.props.unfollow}
                   follow={this.props.follow}
                   onPageChanged = {this.onPageChanged}
                   followingInProgress = {this.props.followingInProgress}
                   totalUsersCount={this.props.totalUsersCount}
                   pageSize={this.props.pageSize}/>
        </>
    }

}

let mapStateToProps = (state:AppStateType):MapStatePropsType => {
    return {
        users: getUsers(state),
        pageSize: getPageSize(state),
        totalUsersCount: getTotalUserCount(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        followingInProgress: getFollowingInProgress(state),


    }
}

export default compose<ComponentType>(

    connect<MapStatePropsType, MapDispatchPropsType,OwnPropsType, AppStateType>(mapStateToProps,
        {follow, unfollow, setCurrentPage: actions.setCurrentPage, getUsers: requestUsers }),
    withAuthRedirect
)(UsersComponent)