import React, {FC} from 'react';
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import MyPostsContainer from "./MyPosts/MyPostsContainer";
import {ProfileType} from "../../types/typeReducers";

type PropsType = {
    profile: ProfileType | null
    status: string
    updateUserStatus: (status:string) => void
    isOwner: boolean
    savePhoto: (file: File) => void
    saveProfile: (formData:any) => Promise<void>
}


const Profile: FC<PropsType> = (props) => {

    return (
        <div>
            <ProfileInfo profile={props.profile}  status={props.status}
                         updateUserStatus = {props.updateUserStatus}
						 isOwner = {props.isOwner}
						 savePhoto={props.savePhoto}
						 saveProfile={props.saveProfile}/>
            <MyPostsContainer />
        </div>
    )


}



export default Profile;