import React from 'react'
import styles from "./Users.module.css";
import userPhoto from "../../assets/images/user.png";
import {NavLink} from "react-router-dom";



let Users = (props) => {
    // let pageCount = Math.ceil(this.props.totalUsersCount / this.props.pageSize)

    let pages = []
    for (let i=1; i <= 10; i++){
        pages.push(i)
    }

    return <div className={styles.cheloveniki}>

        <div>
            {pages.map(p => {
                return <span className={props.currentPage === p && styles.selectedPage}
                             onClick={() => {
                                 props.onPageChanged(p)
                             }}> {p} </span>
            })}
        </div>

        {
            props.users.map(u => <div key={u.id}>
                <span>
                    <div>
                        <NavLink to={'/profile/'+ u.id}>
                            <img src={u.photos.small != null ? u.photos.small : userPhoto} className={styles.userPhoto}
                                 alt={"userAvatar"}/>

                        </NavLink>
                    </div>

                    <div>
                        {u.followed
                            ? <button disabled={props.followingInProgress
                                .some(id => id === u.id)}
                                      onClick={() => { props.unfollow(u.id) }}>
                                Unfollow</button>
                            : <button disabled={props.followingInProgress.some(id => id === u.id)}
                                      onClick={() => { props.follow(u.id) }}>
                                Follow</button>}
                    </div>

                </span>
                <span>
                    <span>
                        <div>{u.name}</div>
                        <div>{u.status}</div>
                    </span>
                    <span>
                        <div>{"u.location.country"}</div>
                        <div>{"u.location.city"}</div>
                    </span>
                </span>
            </div>)
        }
    </div>

}

export default Users

