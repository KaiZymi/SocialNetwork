import s from './ProfileInfo.module.css'
import React from 'react';
import userPhoto from "../../../assets/images/user.png";
import Preloader from "../../../common/preloader/Preloader";
import ProfileStatus from "./ProfileStatus.jsx"

const ProfileInfo = (props) => {
    if (!props.profile){
        return <Preloader/>
    }



    return (

        <div>

            {/*<div className={s.imge}>*/}
            {/*    <img src='https://vsegda-pomnim.com/uploads/posts/2022-04/1649128360_66-vsegda-pomnim-com-p-prirodnii-peizazh-foto-78.jpg' alt='avatar'></img>*/}
            {/*</div>*/}

            <div className={s.description_block}>
                <img className={s.img} src={props.profile.photos.large != null ? props.profile.photos.large : userPhoto } alt="ava"/>

                <ProfileStatus updateUserStatus = {props.updateUserStatus}
                               status={props.status}/>
            </div>
        </div>
    )


}




export default ProfileInfo