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
    unfollow: (userId:number) => void,
    follow: (userId:number) => void
}

const User: FC<PropsType> = ({user, followingInProgress, unfollow, follow}) => {
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
									  onClick={() => { unfollow(user.id) }}>
								Unfollow</button>
							: <button disabled={followingInProgress.some(id => id === user.id)}
									  onClick={() => { follow(user.id) }}>
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