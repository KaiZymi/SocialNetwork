import React, {FC, useEffect} from 'react';
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import {useDispatch, useSelector} from "react-redux";
import {getUserProfile, getUserStatus, savePhoto, updateUserStatus} from "../../features/profile/profile_reducer";
import {Navigate, useParams} from "react-router-dom";
import {compose} from "redux";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {MyPosts} from "./MyPosts/MyPosts";
import {getProfileSelector, getStatusSelector} from "../../features/profile/selector_profile";
import {getUserIdSelector} from "../../features/auth/selector_auth";


const ProfilePage: FC<{}> = (props) => {

	const profile = useSelector(getProfileSelector)
	const status = useSelector(getStatusSelector)

	const authorizedUserId = useSelector(getUserIdSelector)

	let { userId } = useParams<{ userId: string }>();



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

				<Navigate to = '/login' />

			}
		}


		getUserProfileCreator(id as number)
		getUserStatusCreator(id as number);
	}

	useEffect(() => {
		refreshProfile()
	}, [userId, authorizedUserId]);


	let isOwner = authorizedUserId  === (userId ? Number(userId) : authorizedUserId)


	return (
        <div>
            <ProfileInfo profile={profile}  status={status}
                         updateUserStatus = {updateUserStatusCreator}
						 isOwner = {isOwner}
						 savePhoto={savePhotoCreator}
						 />
            <MyPosts />
        </div>
    )


}



export const Profile =  compose<React.ComponentType>(
	withAuthRedirect
)(ProfilePage)


