import React, {FC} from "react";
import s from './Header.module.css'
import {NavLink} from "react-router-dom";

export type MapPropsType = {
    isAuth: boolean
    login: string | null

}

export type MapDispatchType = {
    logout: () => void
}

const Header: FC<MapPropsType & MapDispatchType> = (props) => {
    return (
        <header className={s.header}>
            <div className={s.headerContent}>
                <img
                    src="https://i.pinimg.com/originals/b9/05/3d/b9053d873e9f69058997913e0fffca2e.png"
                    alt="logo"
                ></img>
                <div className={s.loginBlock}>
                    {props.isAuth
                        ? <div> {props.login} - <button onClick={props.logout}>log out</button></div>
                        : <NavLink to={'/login'}>Login</NavLink>}

                </div>
            </div>
        </header>

    )
}

export default Header