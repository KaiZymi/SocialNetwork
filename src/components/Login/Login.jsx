import React from "react";
import {Field, reduxForm} from "redux-form";
import {maxLengthCreator, required} from "../../utils/validators/validations";
import {Input} from "../../common/FormsControls/FormsControls";
import {login} from "../../redux/auth_reducer";
import {connect} from "react-redux";
import styles from "../../common/FormsControls/FormsControls.module.css"

import {Navigate} from "react-router-dom";


const LoginForm = (props) => {
	const maxLength = maxLengthCreator(30)
	return (
		<form onSubmit={props.handleSubmit}>
			<div>
				<Field component={Input} name={"login"} placeholder={"Login"}
					   validate={[required, maxLength]} />
			</div>
			<div>
				<Field component={Input} name={"password"} placeholder={"Password"}
					   type={"password"} validate={[required, maxLength]} />
			</div>
			<div>
				<Field component={Input} name={"rememberMe"} type="checkbox"/> remember me
			</div>
			{props.error && <div className={styles.formSummaryError}>
				{props.error}
			</div>}
			<div>
				<button>Login</button>
			</div>

		</form>
	)
}


const LoginReduxForm = reduxForm({
	form: 'login'
})(LoginForm)





const Login = (props) => {
	const onSubmit = (value) => {
		props.login(value.login, value.password, value.rememberMe)
	}

	if (props.isAuth) {
		return <Navigate to={"/profile"} />
	}

	return (
		<div>

			<h1> login </h1>

			<LoginReduxForm onSubmit={onSubmit}/>


		</div>
	)
}

const mapStateToProps = (state) => ({
	isAuth: state.auth.isAuth
})

export default connect(mapStateToProps, {login})(Login)