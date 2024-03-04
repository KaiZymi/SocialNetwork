import s from './ProfileInfo.module.css'
import React, {useState} from 'react';
import userPhoto from "../../../assets/images/user.png";
import Preloader from "../../../common/preloader/Preloader";
import ProfileStatus from "./ProfileStatus.jsx"
import ProfileDataForm from "./ProfileDataForm";

const ProfileInfo = (props) => {


	const [editMode, setEditMode] = useState(false)

	const onSubmit = (formData) => {
		props.saveProfile(formData).then( () =>{
			setEditMode(false)
		})
	}

	if (!props.profile) {
		return <Preloader/>
	}


	let onMainPhotoSelected = (e) => {
		if (e.target.files.length) {
			props.savePhoto(e.target.files[0])
		}
	}




	return (

		<div>


			<div className={s.description_block}>
				<img className={s.img} src={props.profile.photos.large != null ? props.profile.photos.large : userPhoto}
					 alt="ava"/>
				{props.isOwner && <input type="file" onChange={onMainPhotoSelected}/>}
				{editMode
					? <ProfileDataForm initialValues={props.profile} profile={props.profile}  onSubmit={onSubmit}/>
					: <ProfileData toEditMode={() => {setEditMode(true)} } profile={props.profile} isOwner={props.isOwner}/>
				}

				<ProfileStatus updateUserStatus={props.updateUserStatus}
							   status={props.status}/>
			</div>
		</div>
	)


}


const ProfileData = (props) => {
	return <div>

		{props.isOwner && <button onClick={props.toEditMode}>edit</button>}

		<div>
			<b>Full name</b> : {props.profile.fullName}
		</div>
		<div>
			<b>Looking for a job</b> : {props.profile.lookingForAJob ? "yes" : "no"}
		</div>

		{props.profile.lookingForAJob &&
			<div>
				<b>My professional skills</b>: {props.profile.lookingForAJobDescription}
			</div>
		}

		<div>
			<b>About me</b>: {props.profile.aboutMe}
		</div>
		<div>
			<b>Contacts</b>: {Object.keys(props.profile.contacts).map(key => {
			return <Contact key={key} contactTitle={key} contactValue={props.profile.contacts[key]}/>
		})}
		</div>

	</div>
}




const Contact = ({contactTitle, contactValue}) => {
	return <div><b>{contactTitle}</b>: {contactValue} </div>
}


export default ProfileInfo