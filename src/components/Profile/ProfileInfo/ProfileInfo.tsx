import s from './ProfileInfo.module.css'
import React, {ChangeEvent, FC, useState} from 'react';
// @ts-ignore
import userPhoto from "../../../assets/images/user.png";
import Preloader from "../../../common/preloader/Preloader";
import {ProfileStatus} from "./ProfileStatus"
import {ProfileDataForm} from "./ProfileData/ProfileDataForm";
import {ProfileType} from "../../../types/typeReducers";
import ProfileData from "./ProfileData/ProfileData";
import {saveProfile} from "../../../redux/profile_reducer";
import {useDispatch} from "react-redux";
import {FieldValues} from "react-hook-form";


type PropsType = {
    profile: ProfileType | null
    status: string
    updateUserStatus: (status:string) => void
    isOwner: boolean
    savePhoto: (file: File) => void


}

type Data = {
	formData: ProfileType
	FieldValues: FieldValues
}



const ProfileInfo: FC<PropsType> = (props) => {



	const [editMode, setEditMode] = useState(false)
	const dispatch:any = useDispatch();

	// const saveProfileCreator = (profile: ProfileType) => {
	// 	dispatch(saveProfile(profile))
	// }


	const onSubmit = (data: Data) => {
        //todo: remove then
		dispatch(saveProfile(data.formData)).then(() => {
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