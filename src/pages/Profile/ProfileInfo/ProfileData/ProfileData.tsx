import React, {FC} from "react";
import {ContactsType, ProfileType} from "../../../../types/typeReducers";
import {Button} from "antd";
import s from '../ProfileInfo.module.css';
import {ProfileStatus} from "../ProfileStatus";


type OwnPropsProfileData = {
	profile: ProfileType
	isOwner: boolean
	toOpenEditMode: () => void
	toCloseEditMode: () => void
	status: string
	updateUserStatus: (status: string) => void
}

const ProfileData: FC<OwnPropsProfileData> = ({
												  isOwner,
												  toOpenEditMode,
												  toCloseEditMode,
												  profile,
												  status,
												  updateUserStatus
											  }) => {

	return <div>

		<div>
			<div className={s.profile_data_title}>
				{profile.fullName}
			</div>

			<ProfileStatus updateUserStatus={updateUserStatus}
						   status={status}/>
		</div>


		<div className={s.profile_data_info}>
			<div>
				<b>About me</b>: {profile.aboutMe}
			</div>

			<div>
				<b>Looking for a job</b> : {profile.lookingForAJob ? "yes" : "no"}
			</div>

			{profile.lookingForAJob &&
                <div>
                    <b>My professional skills</b>: {profile.lookingForAJobDescription}
                </div>
			}
		</div>


		{Object.values(profile.contacts).some(contact => contact) && (
			<div className={s.profile_data_contacts}>
				<b className={s.profile_data_contacts_title}>Contacts</b>
				<div className={s.profile_data_contacts_items}>
					{Object
						.keys(profile.contacts)
						.map(key => {
							if (profile.contacts[key as keyof ContactsType].length) {
								return <Contact key={key} contactTitle={key}
												contactValue={profile.contacts[key as keyof ContactsType]}/>
							}

						})}
				</div>
			</div>
		)}

		{isOwner && <Button size={'small'} onClick={toOpenEditMode}>edit</Button>}

	</div>
}


type ContactsPropsType = {
	contactTitle: string,
	contactValue: string
}

const Contact: FC<ContactsPropsType> = ({contactTitle, contactValue}) => {
	return <a className={s.profile_data_contacts_link} target={"_blank"} href={`${contactValue}`}><b>{contactTitle}</b>: {contactValue} </a>
}

export default ProfileData