import React, {FC} from "react";
import {InjectedFormProps, reduxForm} from "redux-form";
import {createField, GetStringKeys, Input, Textarea} from "../../../../common/FormsControls/FormsControls";
import style from "../../../../common/FormsControls/FormsControls.module.css";
import s from '../ProfileInfo.module.css';
import {ProfileType} from "../../../../types/typeReducers";

type OwnPropsType = {
    profile: ProfileType,
}

type ProfileTypeKeys = GetStringKeys<ProfileType>

const ProfileDataForm: FC<InjectedFormProps<ProfileType, OwnPropsType> & OwnPropsType> = ({handleSubmit, profile, error}) => {

	return <form onSubmit={handleSubmit}>

		<div><button>save</button></div>
		{error && <div className={style.formSummaryError}>
			{error}
		</div>}

		<div>
			<b>Full name</b> : {createField<ProfileTypeKeys>("Full Name", 'fullName', [], Input)}


		</div>
		<div>
			<b>Looking for a job</b> : {createField<ProfileTypeKeys>("", 'lookingForAJob', [], Input, { type:"checkbox"})}

		</div>


		<div>
			<b>My professional skills</b>: {createField<ProfileTypeKeys>("My professional skills", 'lookingForAJobDescription', [], Textarea)}

		</div>


		<div>
			<b>About me</b>: {createField<ProfileTypeKeys>("About me", 'aboutMe', [], Textarea)}

		</div>
		<div>
			<b>Contacts</b>: {Object.keys(profile.contacts).map(key => {
			return <div key={key} className={s.contact}>
                //todo: create some solutions for embedded objects
				<b>{key}: {createField("contacts." + key, key, [], Input)}</b>
			</div>
		})}
		</div>

	</form>
}

const ProfileDataReduxForm = reduxForm<ProfileType,OwnPropsType>({
	form: 'edit-profile',
	enableReinitialize: true
})(ProfileDataForm)

export default ProfileDataReduxForm