import s from './ProfileInfo.module.css'
import React, {FC, useEffect, useState} from 'react';
// @ts-ignore
import userPhoto from "../../../app/assets/images/user.png";
import Preloader from "../../../common/preloader/Preloader";
import {ProfileDataForm} from "./ProfileData/ProfileDataForm";
import {ProfileType} from "../../../shared/types/typeReducers";
import ProfileData from "./ProfileData/ProfileData";

import {useSelector} from "react-redux";
import {Button, Upload} from "antd";
import {UploadOutlined} from '@ant-design/icons';
import {getProfileSelector} from "../model/selector_profile";
import {getUserProfile, saveProfile} from "../model/profile_actions";
import {useAppDispatch, useAppSelector} from "../../../shared/lib/redux";
import {getUserIdSelector} from "../../Login";

type PropsType = {
	status: string
	updateUserStatus: (status: string) => void
	isOwner: boolean
	savePhoto: (file: File) => void

}


const ProfileInfo: FC<PropsType> = (props) => {


	const [editMode, setEditMode] = useState(false)
	const dispatch = useAppDispatch();
	const [uploading, setUploading] = useState(false)
	const profile = useAppSelector(getProfileSelector)
	const [errorMessage, setErrorMessage] = useState("")
	const userId = useAppSelector(getUserIdSelector)
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
			if(userId){
				dispatch(getUserProfile(userId)).then(() => setEditMode(false))
			}



		}
	}

	if (!profile) {
		return <Preloader/>
	}


	let onMainPhotoSelected = (file: File) => {
		setUploading(true)
		props.savePhoto(file)
		setUploading(false)
	}

	let openEditMode = () => {
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
			{loading ? <Preloader/> : null}
			<div className={s.description_block}>
				<div className={s.description_block_image}>
					<img className={s.ownImg} src={profile?.photos.large != null ? profile.photos.large : userPhoto}
						 alt="ava"/>
					{props.isOwner &&
                        <Upload
                            showUploadList={false}

                            customRequest={({file, onSuccess}) => {
								onMainPhotoSelected(file as File)
								if (onSuccess) {
									onSuccess(file)
								}

							}}
                            beforeUpload={beforeUpload}
                        >
                            <Button loading={uploading} className={s.description_block_image_button}
                                    icon={<UploadOutlined/>}>Загрузить фото</Button>
                        </Upload>
					}
				</div>
				<div className={s.description_block_info}>


					{editMode
						? <ProfileDataForm profile={profile}
										   toCloseEditMode={closeEditMode}
										   onSubmit={onSubmit}/>

						: <ProfileData toOpenEditMode={openEditMode}
									   toCloseEditMode={closeEditMode}
									   status={props.status}
									   updateUserStatus={props.updateUserStatus}
									   profile={profile}
									   isOwner={props.isOwner}/>
					}


				</div>


			</div>
		</>
	)
}


export default ProfileInfo