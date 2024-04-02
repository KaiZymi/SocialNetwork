import React, {FC} from "react";
import {ContactsType, ProfileType} from "../../../../types/typeReducers";



type OwnPropsProfileData = {
    profile: ProfileType
    isOwner: boolean
    goToEditMode: () => void
}

const ProfileData: FC<OwnPropsProfileData> = (props) => {
    return <div>

        {props.isOwner && <button onClick={props.goToEditMode}>edit</button>}

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
            <b>Contacts</b>:
            {Object
                .keys(props.profile.contacts)
                .map(key => {
            return <Contact key={key} contactTitle={key} contactValue={props.profile.contacts[key as keyof ContactsType]}/>
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