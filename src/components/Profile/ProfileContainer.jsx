import React from "react";
import Profile from "./Profile";

import {connect} from "react-redux";
import {getUserProfile, getUserStatus, savePhoto, saveProfile, updateUserStatus} from "../../redux/profile_reducer";
import { useParams} from 'react-router-dom'
import {WithAuthRedirect} from "../../hoc/AuthRedirect";
import {compose} from "redux";


export function withRouter(Children) {
    return (props) => {

        const match = {params: useParams()};
        return <Children {...props} match={match}/>
    }
}



class ProfileContainer extends React.Component{

	refreshProfile = () =>{
		let userId = this.props.match.params.userId;
		if (!userId) {
			userId = this.props.authorizedUserId;
			if (!userId) {
				this.props.history.push("/login");
			}
		}


		this.props.getUserProfile(userId)
		this.props.getUserStatus(userId);
	}

    componentDidMount() {
		this.refreshProfile()
    }

	componentDidUpdate(prevProps, prevState, snapshot) {
		if (this.props.match.params.userId !== prevProps.match.params.userId){
			this.refreshProfile()
		}
	}

	render() {

        return (
            <div>

                <Profile {...this.props} profile={this.props.profile}
                         status={this.props.status || 'status'}
						 updateUserStatus = {this.props.updateUserStatus}
						 isOwner={!this.props.match.params.userId}
						 savePhoto={this.props.savePhoto}
						 saveProfile={this.props.saveProfile}
				/>
                
            </div>
        );
    }

}

let mapStateToProps = (state) => ({
    profile: state.profilePage.profile,
    status: state.profilePage.status,
	authorizedUserId: state.auth.userId,
	isAuth: state.auth.isAuth
});






export default compose(
	withRouter,
    connect(mapStateToProps, {getUserProfile, getUserStatus, updateUserStatus, savePhoto, saveProfile}),
    WithAuthRedirect
)(ProfileContainer)

