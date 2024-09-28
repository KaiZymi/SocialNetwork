import s from './ProfileInfo.module.css'
import React, {ChangeEvent, FC, useState} from 'react';
// @ts-ignore
import userPhoto from "../../../assets/images/user.png";
import Preloader from "../../../common/preloader/Preloader";
import {ProfileStatus} from "./ProfileStatus"
import {ProfileDataForm} from "./ProfileData/ProfileDataForm";
import {ProfileType} from "../../../types/typeReducers";
import ProfileData from "./ProfileData/ProfileData";
import {saveProfile} from "../../../features/profile/profile_reducer";
import {useDispatch} from "react-redux";
import {FieldValues} from "react-hook-form";
import {Button, Input, Upload} from "antd";
import { UploadOutlined } from '@ant-design/icons';

type PropsType = {
    profile: ProfileType | null
    status: string
    updateUserStatus: (status:string) => void
    isOwner: boolean
    savePhoto: (file: File) => void


}





const ProfileInfo: FC<PropsType> = (props) => {



	const [editMode, setEditMode] = useState(false)
	const dispatch:any = useDispatch();
	const [uploading, setUploading] = useState(false)
	const [errorMessage, setErrorMessage] = useState('');

	// const saveProfileCreator = (profile: ProfileType) => {
	// 	dispatch(saveProfile(profile))
	// }


	const onSubmit = (data: ProfileType) => {
        //todo: remove then
		dispatch(saveProfile(data)).then(() => {
			setEditMode(false)
		})
	}

	if (!props.profile) {
		return <Preloader/>
	}


	let onMainPhotoSelected = (file:File) => {
		setUploading(true)
		props.savePhoto(file)
		setUploading(false)
	}

	let openEditMode = () =>{
		setEditMode(true)
	}
	let closeEditMode = () => {
		setEditMode(false)
	}

	const beforeUpload = (file: File) => {
		const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
		if (!isJpgOrPng) {
			setErrorMessage('Вы можете загружать только JPG/PNG файлы!');
		}
		return isJpgOrPng;
	}



	return (
		<>
			<div className={s.description_block}>
				<img className={s.img} src={props.profile.photos.large != null ? props.profile.photos.large : userPhoto}
					 alt="ava"/>
				{props.isOwner &&
					<Upload
                        showUploadList={false}
						customRequest={({file, onSuccess}) => {
							onMainPhotoSelected(file as File)
							if(onSuccess){
								onSuccess(file)
							}

						}}
						beforeUpload={beforeUpload}
					>
                    	<Button loading={uploading}  icon={<UploadOutlined />}>Загрузить фото</Button>
					</Upload>
				}

				{editMode
					? <ProfileDataForm  profile={props.profile} onSubmit={onSubmit}/>
					: <ProfileData toOpenEditMode={openEditMode} toCloseEditMode = {closeEditMode}
								   profile={props.profile} isOwner={props.isOwner}/>
				}

				<ProfileStatus updateUserStatus={props.updateUserStatus}
							   status={props.status} />
			</div>
		</>
	)
}




export default ProfileInfo