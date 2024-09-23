import React, {FC} from "react";
import {maxLengthCreator, required} from "../../utils/validators/validations";
import {login} from "../../redux/auth_reducer";
import {connect, useDispatch, useSelector} from "react-redux";
// @ts-ignore
import styles from "../../common/FormsControls/FormsControls.module.css"

import {Navigate} from "react-router-dom";
import {AppStateType} from "../../redux/store";
import {Controller, SubmitErrorHandler, useForm} from "react-hook-form";


export const Login :FC<{}> = () => {

	const {control, handleSubmit, getFieldState, formState:{errors, touchedFields}} = useForm<LoginFormValuesType>({ mode: "onChange"})

	const dispatch:any = useDispatch();
	const isAuth = useSelector((state: AppStateType) => state.auth.isAuth);
	const captchaURL = useSelector((state:AppStateType) => state.auth.captchaURL)




	const loginPush = (email: string, password: string, rememberMe: boolean, captcha: string) =>{
		dispatch(login({email, password, rememberMe, captcha}))
	}


	const onSubmit = (data: LoginFormValuesType) => {
		console.log(data)
		loginPush(data.email, data.password, data.rememberMe, data.captcha)
	}

	const error: SubmitErrorHandler<any> = data =>{
		console.log(data)

	}

	const maxLength = maxLengthCreator(30)

	if (isAuth) {
		return <Navigate to={"/profile"} />
	}

	return (
		<div>
			<h1> login </h1>
			<form onSubmit={handleSubmit(onSubmit, error)}>
				<Controller
					name={"email"}
					control={control}
					aria-invalid ={errors.email && <div>{errors.email.message}</div>}
					rules={{
						validate: {
							required,
							maxLength
						}}}
					render={({field:{onBlur, onChange}}) => <input onBlur={onBlur} onChange={onChange} />}

				/>



				{errors.email && getFieldState('email').isTouched && <div>{errors.email.message}</div>}


				<Controller
					name={"password"}
					control={control}

					aria-invalid ={ errors.password && <span>{errors.password.message}</span> }
					rules = {{validate:{
							required
						}}}
					render={({field:{onBlur, onChange}}) => <input type={'password'} onBlur={onBlur} onChange={onChange}   />}

				/>
				{errors.password && getFieldState('password').isTouched && <div>{errors.password.message}</div>}


				<Controller
					name={"rememberMe"}
					control={control}
					defaultValue={false}
					render={({field:{value, onChange}}) => <input type={'checkbox'} checked={value} onChange={onChange} />}

				/>

				{captchaURL && <img src={captchaURL} alt={'captcha'}/> }
				{captchaURL &&
                    <Controller
                        name={"captcha"}
                        control={control}
                        rules = {{required: true}}
                        render={({field}) => <input {...field} />}

                    />
				}

				<div>
					<button>Login</button>
				</div>

			</form>


			{/*<LoginReduxForm onSubmit={onSubmit} captchaURL={captchaURL}/>*/}
		</div>
	)
}





type LoginFormValuesType = {
	email: string
	password: string
	rememberMe: boolean
	captcha: string
}

type LoginFormOwnProps = {
    captchaURL: string | null
}


type LoginFormKeys = Extract<keyof LoginFormValuesType, string>





// const LoginForm: FC<InjectedFormProps<LoginFormValuesType, LoginFormOwnProps> & LoginFormOwnProps> = ({error, captchaURL, handleSubmit }) => {
//
//
//
// 	return (
// 		<form onSubmit={handleSubmit}>
//             {createField<LoginFormKeys>("Email", 'email', [required, maxLength], Input)}
//             {createField<LoginFormKeys>("Password", "password", [required], Input, {type: "password"})}
//             {createField<LoginFormKeys>(undefined, "rememberMe", [], Input, {type: "checkbox"}, "remember me")}
//
// 			{captchaURL && <img src={captchaURL} alt={'captcha'}/> }
// 			{captchaURL && createField<LoginFormKeys>("Symbols from image", "captcha", [required], Input, {})}
//
// 			{error && <div className={styles.formSummaryError}>
// 				{error}
// 			</div>}
// 			<div>
// 				<button>Login</button>
// 			</div>
//
// 		</form>
// 	)
// }
//
//
// const LoginReduxForm = reduxForm<LoginFormValuesType, LoginFormOwnProps>({
// 	form: 'login'
// })(LoginForm)