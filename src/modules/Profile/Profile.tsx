import React, {FC, useEffect} from 'react';
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import {useSelector} from "react-redux";
import {Navigate, useParams} from "react-router-dom";
import {MyPosts} from "./MyPosts/MyPosts";
import {getStatusSelector} from "./model/selector_profile";
import {withAuthRedirect} from "../../app/hoc/withAuthRedirect";
import {getUserProfile, getUserStatus, savePhoto, updateUserStatus} from "./model/profile_actions";
import {useAppDispatch} from "../../shared/lib/redux";
import {getUserIdSelector} from "../Login";
import s from './Profile.module.css'

const ProfilePage: FC<{}> = () => {


	const status = useSelector(getStatusSelector)

	const authorizedUserId = useSelector(getUserIdSelector)

	let {userId} = useParams<{ userId: string }>();

	const dispatch = useAppDispatch()



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
		if (!id) {
			id = authorizedUserId;

			if (!id) {

				<Navigate to='/login'/>

			}
		}


		getUserProfileCreator(id as number)
		getUserStatusCreator(id as number);
	}

	useEffect(() => {
		refreshProfile()
	}, [userId, authorizedUserId]);


	let isOwner = authorizedUserId === (userId ? Number(userId) : authorizedUserId)


	return (
		<div className={s.profile}>
			<ProfileInfo status={status}
						 updateUserStatus={updateUserStatusCreator}
						 isOwner={isOwner}
						 savePhoto={savePhotoCreator}
			/>
			<MyPosts/>
		</div>
	)


}

export const Profile = withAuthRedirect(ProfilePage)



