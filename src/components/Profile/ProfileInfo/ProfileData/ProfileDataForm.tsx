import React, {FC} from "react";

import {createField, GetStringKeys, Input, Textarea} from "../../../../common/FormsControls/FormsControls";
import style from "../../../../common/FormsControls/FormsControls.module.css";
import s from '../ProfileInfo.module.css';
import {ProfileType} from "../../../../types/typeReducers";
import {Controller, FieldValues, useForm} from "react-hook-form";
import {required} from "../../../../utils/validators/validations";


type Data = {
	formData: ProfileType
	FieldValues: FieldValues
}


type OwnPropsType = {
    profile: ProfileType,
	onSubmit: (data: Data) => void
}




type ProfileTypeKeys = GetStringKeys<ProfileType>

export const ProfileDataForm: FC< OwnPropsType> = ({ profile, onSubmit}) => {

	const {control, handleSubmit, formState:{errors}} = useForm<any>({
		mode : "onChange"
	})

	const error = '404'

	return <form onSubmit={handleSubmit(onSubmit)}>

		<div><button>save</button></div>
		{error && <div className={style.formSummaryError}>
			{error}
		</div>}

		<div>
			<b>Full name</b> :
			<Controller
				name={'fullName'}
				control={control}
				aria-invalid ={errors.fullName && <div>{'ss'}</div>}
				rules = {{validate:{
					required
					}}}
				render = {({field}) => <input type="text" placeholder={"Full Name"} {...field}/>}

			/>



		</div>
		<div>
			<b>Looking for a job</b> :
			<Controller
				name={'lookingForAJob'}
				control={control}
				render = {({field}) => <input type="checkbox" {...field}/>}

			/>
			{/*{createField<ProfileTypeKeys>("", 'lookingForAJob', [], Input, { type:"checkbox"})}*/}

		</div>


		<div>
			<b>My professional skills</b>:
			<Controller
				name={'lookingForAJobDescription'}
				control={control}
				rules = {{validate:{
						required
					}}}
				render = {({field}) => <textarea placeholder={"My professional skills"} {...field}/>}

			/>
			{/*{createField<ProfileTypeKeys>("My professional skills", 'lookingForAJobDescription', [], Textarea)}*/}

		</div>


		<div>
			<b>About me</b>:

			<Controller
				name={'aboutMe'}
				control={control}
				rules = {{validate:{
						required
					}}}
				render = {({field}) => <textarea placeholder={"About me"} {...field}/>}

			/>
			{/*{createField<ProfileTypeKeys>("About me", 'aboutMe', [], Textarea)}*/}

		</div>
		<div>
			<b>Contacts</b>: {Object.keys(profile.contacts).map(key => {
			return <div key={key} className={s.contact}>
                //todo: create some solutions for embedded objects
				<b>{key}:

					<Controller
						name={key}
						control={control}
						render = {({field}) => <input placeholder={"contacts." + key} {...field}/>}

					/>

					{/*{createField("contacts." + key, key, [], Input)}*/}
				</b>
			</div>
		})}
		</div>

	</form>
}

// const ProfileDataReduxForm = reduxForm<ProfileType,OwnPropsType>({
// 	form: 'edit-profile',
// 	enableReinitialize: true
// })(ProfileDataForm)

