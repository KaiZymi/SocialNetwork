import React, {FC, useEffect} from 'react';
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../redux/store";
import {getUserProfile, getUserStatus, savePhoto, updateUserStatus} from "../../redux/profile_reducer";
import {Navigate, useParams} from "react-router-dom";
import {compose} from "redux";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {MyPosts} from "./MyPosts/MyPosts";


const ProfilePage: FC<{}> = (props) => {

	const profile = useSelector((state:AppStateType) => state.profilePage.profile)
	const status = useSelector((state:AppStateType)=> state.profilePage.status)
	const authorizedUserId = useSelector((state:AppStateType) => state.auth.userId)
	const isAuth = useSelector((state:AppStateType)=> state.auth.isAuth);

	let {userId} = useParams();


	const dispatch:any = useDispatch()

	const getUserProfileCreator = (userId: number) => {
		dispatch(getUserProfile(userId))
	}
	const getUserStatusCreator = (userId: number) => {
		dispatch(getUserStatus(userId))
	}
	const updateUserStatusCreator = (status: string) => {
		dispatch(updateUserStatus(status))
	}
	const savePhotoCreator = (file: File) => {
		dispatch(savePhoto(file))
	}

	const refreshProfile = () => {
		let id = Number(userId) as number | null
		if (!id ) {
			id = authorizedUserId;
			if (!id) {
				//todo with redirect
				<Navigate to='/login' />

			}
		}


		getUserProfileCreator(id as number)
		getUserStatusCreator(id as number);
	}

	useEffect(() => {
		refreshProfile()
	}, [userId, authorizedUserId]);





	return (
        <div>
            <ProfileInfo profile={profile}  status={status}
                         updateUserStatus = {updateUserStatusCreator}
						 isOwner = {!!userId}
						 savePhoto={savePhotoCreator}
						 />
            <MyPosts />
        </div>
    )


}



export const Profile =  compose<React.ComponentType>(
	withAuthRedirect
)(ProfilePage)


