import {NavLink} from "react-router-dom";
// @ts-ignore
import userPhoto from "../../assets/images/user.png";
// @ts-ignore
import styles from "./Users.module.css";
import React, {FC} from "react";
import {UsersType} from "../../types/typeReducers";
import {Button} from "antd";




type PropsType = {
    user: UsersType,
    followingInProgress: Array<number>,
    unfollowHandler: (userId:number) => void,
    followHandler: (userId:number) => void
}

const User: FC<PropsType> = React.memo(({user, followingInProgress, unfollowHandler, followHandler}) => {


	return <div style = {{marginBottom: '15px'}} >
                <span>
                    <div>
                        <NavLink to={'/profile/'+ user.id}>
                            <img src={user.photos.small != null ? user.photos.small : userPhoto} className={styles.userPhoto}
								 alt={"userAvatar"}/>

                        </NavLink>
                    </div>

                    <div>
                        {user.followed
							? <Button size={'small'} disabled={followingInProgress
								.some(id => id === user.id)}
									  onClick={() => { unfollowHandler(user.id) }}>
								Unfollow</Button>
							: <Button size={'small'} disabled={followingInProgress.some(id => id === user.id)}
									  onClick={() => { followHandler(user.id) }}>
								Follow</Button>}
                    </div>

                </span>
				<span>
                    <span>
                        <div>{user.name}</div>
                        <div>{user.status}</div>
                    </span>
                    <span>
                        <div>{"user.location.country"}</div>
                        <div>{"user.location.city"}</div>
                    </span>
                </span>
	</div>
})

export default User