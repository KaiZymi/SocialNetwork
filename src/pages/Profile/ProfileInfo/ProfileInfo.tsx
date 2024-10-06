import s from './ProfileInfo.module.css'
import React, {ChangeEvent, FC, useEffect, useState} from 'react';
// @ts-ignore
import userPhoto from "../../../assets/images/user.png";
import Preloader from "../../../common/preloader/Preloader";
import {ProfileStatus} from "./ProfileStatus"
import {ProfileDataForm} from "./ProfileData/ProfileDataForm";
import {ProfileType} from "../../../types/typeReducers";
import ProfileData from "./ProfileData/ProfileData";
import {getUserProfile, saveProfile} from "../../../features/profile/profile_reducer";
import {useDispatch, useSelector} from "react-redux";
import {FieldValues} from "react-hook-form";
import {Button, Input, Upload} from "antd";
import { UploadOutlined } from '@ant-design/icons';
import {getProfileSelector} from "../../../features/profile/selector_profile";
import store from "../../../features/store";

type PropsType = {
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
	const profile = useSelector(getProfileSelector)
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		console.log('RerenderProfileInfo')
		if (editMode && !uploading) {
			setEditMode(false)
		}
	}, [profile, uploading]);

	const onSubmit = async (data: ProfileType) => {
		setLoading(true);
		try {
			await dispatch(saveProfile(data));
		} finally {
			//Change method get profile before editMode
			setLoading(false);

			dispatch(getUserProfile(store.getState().auth.userId as number)).then(() => setEditMode(false));


		}
	}

	if (!profile) {
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
			{loading ?  <Preloader/> : null}
			<div className={s.description_block}>
				<img className={s.img} src={profile?.photos.large != null ? profile.photos.large : userPhoto}
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
					? <ProfileDataForm  profile={profile} toCloseEditMode = {closeEditMode} onSubmit={onSubmit}/>
					: <ProfileData toOpenEditMode={openEditMode} toCloseEditMode = {closeEditMode}
								   profile={profile} isOwner={props.isOwner}/>
				}

				<ProfileStatus updateUserStatus={props.updateUserStatus}
							   status={props.status} />
			</div>
		</>
	)
}




export default ProfileInfo

function getState() {
    throw new Error('Function not implemented.');
}
