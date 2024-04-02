import s from './Navbar.module.css'
import {NavLink} from "react-router-dom";
import {FC} from "react";


const Navbar: FC = () => {
    return (
        <nav className={s.nav}>
                <div className={s.item}>
                    <NavLink to="/profile"  >Profile</NavLink>
                </div>
                <div className={s.item}>
                    <NavLink to="/dialogs">Message</NavLink>
                </div>
                {/*<div className={s.item}>*/}
                {/*    <NavLink to="/profile">News</NavLink>*/}
                {/*</div>*/}
                {/*<div className={s.item}>*/}
                {/*    <NavLink to="/profile/">Music</NavLink>*/}
                {/*</div>*/}
                <div className={s.item}>
                    <NavLink to="/users">Users</NavLink>
                </div>
                {/*<div className={s.item}>*/}
                {/*    <NavLink to="/profile">Settings</NavLink>*/}
                {/*</div>*/}
            </nav>
    )
}

export default Navbar