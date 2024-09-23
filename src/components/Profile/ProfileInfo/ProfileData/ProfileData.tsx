import React, {FC} from "react";
import {ContactsType, ProfileType} from "../../../../types/typeReducers";



type OwnPropsProfileData = {
    profile: ProfileType
    isOwner: boolean
    goToEditMode: () => void
}

const ProfileData: FC<OwnPropsProfileData> = ({isOwner, goToEditMode, profile}) => {
    return <div>

        {isOwner && <button onClick={goToEditMode}>edit</button>}

        <div>
            <b>Full name</b> : {profile.fullName}
        </div>
        <div>
            <b>Looking for a job</b> : {profile.lookingForAJob ? "yes" : "no"}
        </div>

        {profile.lookingForAJob &&
			<div>
				<b>My professional skills</b>: {profile.lookingForAJobDescription}
			</div>
        }

        <div>
            <b>About me</b>: {profile.aboutMe}
        </div>
        <div>
            <b>Contacts</b>:
            {Object
                .keys(profile.contacts)
                .map(key => {
            return <Contact key={key} contactTitle={key} contactValue={profile.contacts[key as keyof ContactsType]}/>
        })}
        </div>

    </div>
}


type ContactsPropsType = {
    contactTitle: string,
    contactValue: string
}

const Contact: FC<ContactsPropsType> = ({contactTitle, contactValue}) => {
    return <div><b>{contactTitle}</b>: {contactValue} </div>
}

export default ProfileData