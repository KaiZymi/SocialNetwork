import React, {FC} from "react";
import {InjectedFormProps, reduxForm} from "redux-form";
import {maxLengthCreator, required} from "../../utils/validators/validations";
import {createField, Input} from "../../common/FormsControls/FormsControls";
import {login} from "../../redux/auth_reducer";
import {connect} from "react-redux";
// @ts-ignore
import styles from "../../common/FormsControls/FormsControls.module.css"

import {Navigate} from "react-router-dom";
import {AppStateType} from "../../redux/store";




const LoginForm: FC<InjectedFormProps<LoginFormValuesType, LoginFormOwnProps> & LoginFormOwnProps> = ({error, captchaURL, handleSubmit }) => {
	const maxLength = maxLengthCreator(30)
	return (
		<form onSubmit={handleSubmit}>
            {createField<LoginFormKeys>("Email", 'email', [required, maxLength], Input)}
            {createField<LoginFormKeys>("Password", "password", [required], Input, {type: "password"})}
            {createField<LoginFormKeys>(undefined, "rememberMe", [], Input, {type: "checkbox"}, "remember me")}

			{captchaURL && <img src={captchaURL} alt={'captcha'}/> }
			{captchaURL && createField<LoginFormKeys>("Symbols from image", "captcha", [required], Input, {})}

			{error && <div className={styles.formSummaryError}>
				{error}
			</div>}
			<div>
				<button>Login</button>
			</div>

		</form>
	)
}


const LoginReduxForm = reduxForm<LoginFormValuesType, LoginFormOwnProps>({
	form: 'login'
})(LoginForm)


const Login:FC<MapStatePropsType & MapDispatchType> = (props) => {

	const onSubmit = (value:LoginFormValuesType) => {
		props.login(value.email, value.password, value.rememberMe, value.captcha)
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

const mapStateToProps = (state: AppStateType):MapStatePropsType => ({
	isAuth: state.auth.isAuth,
	captchaURL: state.auth.captchaURL
})

export default connect(mapStateToProps, {login})(Login)


type LoginFormOwnProps = {
    captchaURL: string | null
}

type MapStatePropsType = {
    isAuth: boolean,
    captchaURL: string | null
}

type MapDispatchType = {
    login: (email:string, password:string, rememberMe:boolean, captcha:string) => void
}

type LoginFormValuesType = {
    email:string,
    password:string,
    rememberMe:boolean,
    captcha:string
}

type LoginFormKeys = Extract<keyof LoginFormValuesType, string>