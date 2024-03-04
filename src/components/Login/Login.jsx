import React from "react";
import {Field, reduxForm} from "redux-form";
import {maxLengthCreator, required} from "../../utils/validators/validations";
import {Input} from "../../common/FormsControls/FormsControls";
import {login} from "../../redux/auth_reducer";
import {connect} from "react-redux";
import styles from "../../common/FormsControls/FormsControls.module.css"

import {Navigate} from "react-router-dom";


const LoginForm = ({error, captchaURL, handleSubmit }) => {
	const maxLength = maxLengthCreator(30)
	return (
		<form onSubmit={handleSubmit}>
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

			{captchaURL && <img src={captchaURL} /> }
			{captchaURL && <Field component={Input} name={"captcha"} placeholder={"Symbols from image"} validate={[required, maxLength]} />}

			{error && <div className={styles.formSummaryError}>
				{error}
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
		props.login(value.login, value.password, value.rememberMe, value.captcha)
	}

	if (props.isAuth) {
		return <Navigate to={"/profile"} />
	}

	return (
		<div>

			<h1> login </h1>

			<LoginReduxForm onSubmit={onSubmit} captchaURL={props.captchaURL}/>


		</div>
	)
}

const mapStateToProps = (state) => ({
	isAuth: state.auth.isAuth,
	captchaURL: state.auth.captchaURL
})

export default connect(mapStateToProps, {login})(Login)