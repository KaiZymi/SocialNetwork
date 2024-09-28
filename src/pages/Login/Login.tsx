import React, {FC} from "react";
import {maxLengthCreator, required} from "../../utils/validators/validations";
import {login} from "../../features/auth/auth_reducer";
import {useDispatch, useSelector} from "react-redux";
// @ts-ignore
import styles from "../../common/FormsControls/FormsControls.module.css"

import {Navigate} from "react-router-dom";
import {Controller, SubmitErrorHandler, useForm} from "react-hook-form";
import {getCaptchaURLSelector, isAuthSelector} from "../../features/auth/selector_auth";
import {Button, Checkbox, Form, Input} from "antd";


export const Login :FC<{}> = () => {

	const {control, handleSubmit, getFieldState, formState:{errors}} = useForm<LoginFormValuesType>({ mode: "onChange"})

	const dispatch:any = useDispatch();
	const isAuth = useSelector(isAuthSelector);
	const captchaURL = useSelector(getCaptchaURLSelector)




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
		<div style={{textAlign:'center'}}>
			<h1> login </h1>
			<div style={{ maxWidth: 600, margin: '0 auto' }}>
				<Form
					onFinish={handleSubmit(onSubmit, error)}
					labelCol={{ span: 4 }}
					wrapperCol={{ span: 16}}

				>
					<Form.Item
						label={'email'}
					>

						<Controller
							name={"email"}
							control={control}
							aria-invalid ={errors.email && <div>{errors.email.message}</div>}
							rules={{
								validate: {
									required,
									maxLength
								}}}
							render={({field:{onBlur, onChange}}) => <Input  onBlur={onBlur} onChange={onChange} />}

						/>
						{errors.email && getFieldState('email').isTouched && <div>{errors.email.message}</div>}
					</Form.Item>

					<Form.Item
						label={'password'}
					>
						<Controller
							name={"password"}
							control={control}

							aria-invalid ={ errors.password && <span>{errors.password.message}</span> }
							rules = {{validate:{
									required
								}}}
							render={({field:{onBlur, onChange}}) => <Input  type={'password'} onBlur={onBlur} onChange={onChange}   />}

						/>
						{errors.password && getFieldState('password').isTouched && <div>{errors.password.message}</div>}
					</Form.Item>

					<Form.Item
						wrapperCol={{ offset: 4, span: 16 }}
					>
						<Controller
							name={"rememberMe"}
							control={control}
							defaultValue={false}

							render={({field:{value, onChange}}) => <Checkbox  checked={value} onChange={onChange}> Remember me</Checkbox>}

						/>
					</Form.Item>


					<Form.Item
						wrapperCol={{ offset: 4, span: 16 }}
					>
						<Button htmlType={'submit'}>Login</Button>
					</Form.Item>
					<Form.Item>
						{captchaURL && <img src={captchaURL} alt={'captcha'}/> }
						{captchaURL &&
                            <Controller
                                name={"captcha"}
                                control={control}
                                rules = {{required: true}}
                                render={({field}) => <Input style ={{width:'250px'}} {...field} />}

                            />
						}
					</Form.Item>

				</Form>
			</div>




		</div>
	)
}





type LoginFormValuesType = {
	email: string
	password: string
	rememberMe: boolean
	captcha: string
}






