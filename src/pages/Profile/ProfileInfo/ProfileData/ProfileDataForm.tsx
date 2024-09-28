import React, {FC} from "react";
import s from '../ProfileInfo.module.css';
import {ContactsType, ProfileType} from "../../../../types/typeReducers";
import {Controller, useForm} from "react-hook-form";
import {required} from "../../../../utils/validators/validations";
import {Button, Checkbox, Input} from "antd";


// type Data = {
// 	formData: ProfileType
// 	FieldValues: FieldValues
// }
//
//
// type OwnPropsType = {
//     profile: ProfileType,
// 	onSubmit: (data: Data) => void
// }


type OwnPropsType = {
	profile: ProfileType,
	onSubmit: (data: ProfileType) => void
};


type ProfileKeysType = keyof ContactsType


export const ProfileDataForm: FC< OwnPropsType> = ({ profile, onSubmit}) => {

	const {control, handleSubmit, formState:{errors}} = useForm<ProfileType>({
		mode : "onChange"
	})



	return <form onSubmit={handleSubmit(onSubmit)}>

		<div><Button>save</Button></div>
		{/*{error && <div className={style.formSummaryError}>*/}
		{/*	{error}*/}
		{/*</div>}*/}

		<div>
			<b>Full name</b> :
			<Controller
				name={'fullName'}
				control={control}
				aria-invalid ={errors.fullName && <div>{'ss'}</div>}
				rules = {{validate:{
					required
					}}}
				render = {({field}) => <Input  placeholder={"Full Name"} {...field}/>}

			/>

			{errors.fullName && <span className="error-message">Full Name is required</span>}
		</div>
		<div>
			<b>Looking for a job</b> :
			<Controller
				name={'lookingForAJob'}
				control={control}
				render = {({field}) =>
					<Checkbox
						checked={field.value}
						onChange={e => field.onChange(e.target.checked)}
					>
						Looking for a Job
					</Checkbox>}

			/>


		</div>


		<div>
			<b>My professional skills</b>:
			<Controller
				name={'lookingForAJobDescription'}
				control={control}
				rules = {{validate:{
						required
					}}}
				render = {({field}) => <Input.TextArea
					placeholder="My professional skills"
					{...field}
				/>}

			/>
			{errors.lookingForAJobDescription && <span className="error-message">Skills are required</span>}

		</div>


		<div>
			<b>About me</b>:

			<Controller
				name={'aboutMe'}
				control={control}
				rules = {{validate:{
						required
					}}}
				render = {({field}) => <Input.TextArea
					placeholder="About me"
					{...field}
				/>}

			/>
			{errors.aboutMe && <span className="error-message">About me is required</span>}
		</div>

		<div>
			<b>Contacts</b>: {Object.keys(profile.contacts).map(key => {
			return <div key={key} className={s.contact}>

				<b>{key}:

					<Controller
						name={`contacts.${key as ProfileKeysType}`}
						control={control}
						render = {({field}) => <Input
							placeholder={`contacts.${key}`}
							{...field}
						/>}

					/>


				</b>
			</div>
		})}
		</div>

	</form>
}


