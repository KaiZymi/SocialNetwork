import s from './ProfileInfo.module.css'
import React, {ChangeEvent, FC, useState} from 'react';
// @ts-ignore
import userPhoto from "../../../assets/images/user.png";
import Preloader from "../../../common/preloader/Preloader";
import ProfileStatus from "./ProfileStatus"
import ProfileDataForm from "./ProfileData/ProfileDataForm";
import {ProfileType} from "../../../types/typeReducers";
import ProfileData from "./ProfileData/ProfileData";


type PropsType = {
    profile: ProfileType | null
    status: string
    updateUserStatus: (status:string) => void
    isOwner: boolean
    savePhoto: (file: File) => void
    saveProfile: (formData:any) => Promise<void>

}


const ProfileInfo: FC<PropsType> = (props) => {

	const [editMode, setEditMode] = useState(false)

	const onSubmit = (formData:ProfileType) => {
        //todo: remove then
		props.saveProfile(formData).then(() => {
			setEditMode(false)
		})
	}

	if (!props.profile) {
		return <Preloader/>
	}


	let onMainPhotoSelected = (e: ChangeEvent<HTMLInputElement>) => {
		if (e.target.files && e.target.files.length) {
			props.savePhoto(e.target.files[0])
		}
	}


	return (
		<>
			<div className={s.description_block}>
				<img className={s.img} src={props.profile.photos.large != null ? props.profile.photos.large : userPhoto}
					 alt="ava"/>
				{props.isOwner && <input type="file" onChange={onMainPhotoSelected}/>}
				{editMode
					? <ProfileDataForm  profile={props.profile} onSubmit={onSubmit}/>
					: <ProfileData goToEditMode={() => {
						setEditMode(true)
					}} profile={props.profile} isOwner={props.isOwner}/>
				}

				<ProfileStatus updateUserStatus={props.updateUserStatus}
							   status={props.status} />
			</div>
		</>
	)
}




export default ProfileInfo