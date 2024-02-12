import React from "react";
import s from './Header.module.css'
import {NavLink} from "react-router-dom";

class Header extends React.Component{

    render(){
        return (
                <header className={s.header}>
					<div className={s.headerContent}>
						<img
							src="https://i.pinimg.com/originals/b9/05/3d/b9053d873e9f69058997913e0fffca2e.png"
							alt="logo"
						></img>
						<div className={s.loginBlock}>
							{this.props.isAuth
								? <div> {this.props.login} - <button onClick={this.props.logout} >log out</button> </div>
								: <NavLink to={'/login'}>Login</NavLink> }

						</div>
					</div>
                </header>

        )
    }


}

export default Header