import React from "react";
import Profile from "./Profile";

import {connect} from "react-redux";
import {getUserProfile, getUserStatus, savePhoto, saveProfile, updateUserStatus} from "../../redux/profile_reducer";

import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {compose} from "redux";
import {ProfileType} from "../../types/typeReducers";
import {AppStateType} from "../../redux/store";
import {withRouter} from "../../hoc/withRouter";
import {NavigateFunction} from "react-router-dom";





type MapStatePropsType = ReturnType<typeof mapStateToProps>

type MapDispatchPropsType = {
    getUserProfile: (userId: number)=> void,
    getUserStatus: (userId: number | null)=> void ,
    updateUserStatus: (status: string)=> void,
    savePhoto: (file: File)=> void,
    saveProfile: (profile: ProfileType)=> Promise<void>


}

type PathParamsType = {
    userId: string
    router: {
        location: Location;
        navigate: NavigateFunction;
        params: Record<"userId", number | null>

    }
    history: any
}


type PropsType = MapDispatchPropsType & MapStatePropsType & PathParamsType

class ProfileContainer extends React.Component<PropsType>{

	refreshProfile = () =>{
		let userId = this.props.router.params.userId;
		if (!userId) {
			userId = this.props.authorizedUserId;
			if (!userId) {
                //todo with redirect
				this.props.history.push("/login");
			}
		}


		this.props.getUserProfile(userId as number)
		this.props.getUserStatus(userId as number);
	}

    componentDidMount() {
		this.refreshProfile()
    }

	componentDidUpdate(prevProps:PropsType, prevState:PropsType) {
		if (this.props.router.params.userId !== prevProps.router.params.userId){
			this.refreshProfile()
		}
	}

	render() {

        return (
            <div>

                <Profile {...this.props} profile={this.props.profile}
                         status={this.props.status || 'status'}
						 updateUserStatus = {this.props.updateUserStatus}
						 isOwner={!this.props.router.params.userId}
						 savePhoto={this.props.savePhoto}
						 saveProfile={this.props.saveProfile}
				/>
                
            </div>
        );
    }

}

let mapStateToProps = (state: AppStateType) => ({
    profile: state.profilePage.profile,
    status: state.profilePage.status,
	authorizedUserId: state.auth.userId,
	isAuth: state.auth.isAuth
});






export default compose<React.ComponentType>(
	withRouter,
    connect(mapStateToProps, {getUserProfile, getUserStatus, updateUserStatus, savePhoto, saveProfile}),
    withAuthRedirect
)(ProfileContainer)

