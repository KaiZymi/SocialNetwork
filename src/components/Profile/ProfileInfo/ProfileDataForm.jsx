import React from "react";
import {Field, reduxForm} from "redux-form";
import {Input, Textarea} from "../../../common/FormsControls/FormsControls";
import style from "../../../common/FormsControls/FormsControls.module.css";
import s from './ProfileInfo.module.css';



const ProfileDataForm = ({handleSubmit, profile, error}) => {

	return <form onSubmit={handleSubmit}>

		<div><button>save</button></div>
		{error && <div className={style.formSummaryError}>
			{error}
		</div>}

		<div>
			<b>Full name</b> : <Field component={Input} name={"fullName"} placeholder={"fullName"} />

		</div>
		<div>
			<b>Looking for a job</b> : <Field component={Input} name={"lookingForAJob"} type="checkbox"/>
		</div>


		<div>
			<b>My professional skills</b>:  <Field component={Textarea} name={"lookingForAJobDescription"} placeholder={"fullName"}/>
		</div>


		<div>
			<b>About me</b>:
			 <Field component={Textarea} name={"aboutMe"} placeholder={"About me"}/>
		</div>
		<div>
			<b>Contacts</b>: {Object.keys(profile.contacts).map(key => {
			return <div key={key} className={s.contact}>
				<b>{key}: <Field component={Input} name={key} placeholder={ "contacts." + key} /></b>
			</div>
		})}
		</div>

	</form>
}

const ProfileDataReduxForm = reduxForm({
	form: 'edit-profile',
	enableReinitialize: true
})(ProfileDataForm)

export default ProfileDataReduxForm