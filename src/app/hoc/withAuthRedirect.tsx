import {Navigate} from "react-router-dom";
import React from "react";
import {useSelector} from "react-redux";
import {isAuthSelector} from "../../modules/Login/model/selector_auth";


export function withAuthRedirect<WCP extends {}>(WrappedComponent: React.ComponentType<WCP>) {

	const RedirectComponent: React.FC<WCP> = (props) => {
		let {...restProps} = props
		const isAuth = useSelector(isAuthSelector)

		if (!isAuth) return <Navigate to='/login'/>

		return <WrappedComponent {...restProps as WCP}/>
	}

	return RedirectComponent
}