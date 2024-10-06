import React, {FC} from "react";
import s from '../ProfileInfo.module.css';
import {ContactsType, ProfileType} from "../../../../types/typeReducers";
import {Controller, SubmitErrorHandler, useForm} from "react-hook-form";
import {required} from "../../../../utils/validators/validations";
import {Button, Checkbox, Form, Input} from "antd";


type OwnPropsType = {
	profile: ProfileType,
	onSubmit: (data: ProfileType) => void
	toCloseEditMode: () => void
};


type ProfileKeysType = keyof ContactsType


export const ProfileDataForm: FC<OwnPropsType> = ({profile, onSubmit, toCloseEditMode}) => {

	const {control, handleSubmit, formState: {errors}} = useForm<ProfileType>({
		mode: "onChange"
	})

	const error: SubmitErrorHandler<any> = data =>{
		console.log(data)

	}

	return <Form onFinish={handleSubmit(onSubmit, error)}>

		<div>
			<Button htmlType={'submit'}>save</Button>
			<Button onClick={toCloseEditMode}>close</Button>
		</div>

		<div>
			<b>Full name</b> :
			<Controller
				name={'fullName'}
				defaultValue={profile.fullName}
				control={control}
				aria-invalid={errors.fullName && <div>{'ss'}</div>}
				rules={{
					validate: {
						required
					}
				}}
				render={({field}) => <Input
					placeholder={"Full Name"}
					{...field}
					style={{
						borderColor: errors.fullName ? 'red' : undefined,
					}}
				/>}

			/>

			{errors.fullName && <span style={{color: 'red'}}>Full Name is required</span>}
		</div>

		<div>
			<b>About me</b>:

			<Controller
				name={'aboutMe'}
				defaultValue={profile.aboutMe}
				control={control}
				rules={{
					validate: {
						required
					}
				}}
				render={({field}) => <Input.TextArea
					placeholder="About me"

					style={{
						borderColor: errors.aboutMe ? 'red' : undefined,
					}}
					{...field}
				/>}

			/>
			{errors.aboutMe && <span style={{color: 'red'}}>About me is required</span>}
		</div>

		<div>
			<b>Looking for a job</b> :
			<Controller
				name={'lookingForAJob'}
				defaultValue={profile.lookingForAJob}
				control={control}
				render={({field}) =>
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
				defaultValue={profile.lookingForAJobDescription}
				control={control}
				rules={{
					validate: {
						required
					}
				}}
				render={({field}) => <Input.TextArea
					placeholder="My professional skills"
					style={{
						borderColor: errors.lookingForAJobDescription ? 'red' : undefined,
					}}
					{...field}
				/>}

			/>
			{errors.lookingForAJobDescription && <span style={{color: 'red'}}>Skills are required</span>}

		</div>


		<div>
			<b>Contacts</b>: {Object.keys(profile.contacts).map(key => {
			return <div key={key} className={s.contact}>

				<b>{key}:

					<Controller
						name={`contacts.${key as ProfileKeysType}`}
						defaultValue={`contacts.${key as ProfileKeysType}`}
						control={control}
						render={({field}) => <Input
							placeholder={`contacts.${key}`}
							{...field}
						/>}

					/>


				</b>
			</div>
		})}
		</div>

	</Form>
}


