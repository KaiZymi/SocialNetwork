import {NavLink} from "react-router-dom";
// @ts-ignore
import userPhoto from "../../assets/images/user.png";
// @ts-ignore
import styles from "./Users.module.css";
import React, {FC} from "react";
import {UsersType} from "../../types/typeReducers";




type PropsType = {
    user: UsersType,
    followingInProgress: Array<number>,
    unfollowHandler: (userId:number) => void,
    followHandler: (userId:number) => void
}

const User: FC<PropsType> = ({user, followingInProgress, unfollowHandler, followHandler}) => {
	return <div>
                <span>
                    <div>
                        <NavLink to={'/profile/'+ user.id}>
                            <img src={user.photos.small != null ? user.photos.small : userPhoto} className={styles.userPhoto}
								 alt={"userAvatar"}/>

                        </NavLink>
                    </div>

                    <div>
                        {user.followed
							? <button disabled={followingInProgress
								.some(id => id === user.id)}
									  onClick={() => { unfollowHandler(user.id) }}>
								Unfollow</button>
							: <button disabled={followingInProgress.some(id => id === user.id)}
									  onClick={() => { followHandler(user.id) }}>
								Follow</button>}
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
}

export default User