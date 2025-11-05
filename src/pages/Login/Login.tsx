import React, {FC, useCallback, useMemo, useState} from "react";
import {maxLengthCreator, required} from "../../utils/validators/validations";

import {useDispatch, useSelector} from "react-redux";


import {Navigate} from "react-router-dom";
import {Control, Controller, FormState, useForm, UseFormTrigger} from "react-hook-form";
import {getCaptchaURLSelector, isAuthSelector} from "../../features/auth/selector_auth";
import {Button, Checkbox, Form, Input} from "antd";
import {useActions} from "../../lib/hooks/useActions";
import {login} from "../../features/auth/auth_actions";

interface InputFieldProps {
	name: keyof LoginFormValuesType
	control: Control<LoginFormValuesType, any>;
	type?: string
	rules: any;
	serverError: string | null
	setServerError: (error: string | null) => void
	trigger: UseFormTrigger<LoginFormValuesType>
	formState: FormState<LoginFormValuesType>
	InputComponent: typeof Input | typeof Input.Password;
	defaultValue: string
}

const InputField: FC<InputFieldProps> = React.memo(({
														name,
														type = "text",
														rules,
														serverError,
														setServerError,
														control,
														formState,
														trigger,
														InputComponent = Input,
														defaultValue
													}) => {
	const {errors} = formState
	const maxLength = typeof rules.maxLength === "number" ? rules.maxLength : undefined;

	return <>
		<Controller
			name={name}
			control={control}
			rules={rules}
			defaultValue={defaultValue}
			render={({field: {onBlur, onChange,value}}) => (
				<InputComponent
					type={type}
					defaultValue={defaultValue}
					onBlur={async () => {
						onBlur()
						await trigger(name)
					}}
					onChange={async (e) => {
						if (e.target.value.length <= (rules.maxLength || Infinity)) {
							onChange(e);
						}
						await trigger(name)
						if (serverError) {
							setServerError(null)
						}

					}}
					maxLength={maxLength}
					style={{
						borderColor: errors[name] ? 'red' : undefined,
					}}
				/>
			)}
		/>
		{errors[name] && <div style={{color: 'red'}}>{errors[name]?.message?.toString()}</div>}

	</>

})


export const Login = () => {


	const {control, handleSubmit, trigger, formState} = useForm<LoginFormValuesType>()

	const [serverError, setServerError] = useState<string | null>(null)

	const dispatch:any = useDispatch()
	const isAuth = useSelector(isAuthSelector);
	const captchaURL = useSelector(getCaptchaURLSelector)


	const loginPush = useCallback(async (email: string, password: string, rememberMe: boolean, captcha: string) => {
		const data = await dispatch(login({email, password, rememberMe, captcha}))
		setServerError(data.error ? data.error.message : null);
	}, [dispatch]);


	const onSubmit = useCallback((data: LoginFormValuesType) => {
		setServerError(null);
		loginPush(data.email, data.password, data.rememberMe, data.captcha).then(() => {
		})

	}, [loginPush]);

	const renderInput = useCallback((name: keyof LoginFormValuesType, type = "text", InputComponent: typeof Input | typeof Input.Password, defaultValue:string, validationRules: any) => {

		return (
			<InputField
				name={name}
				control={control}
				type={type}
				rules={validationRules}
				serverError={serverError}
				setServerError={setServerError}
				trigger={trigger}
				formState={formState}
				InputComponent={InputComponent}
				defaultValue = {defaultValue}

			/>
		)

	}, [setServerError, control, trigger, formState])

	const maxLengthError = useMemo(() => maxLengthCreator(30), []);


	if (isAuth) {
		return <Navigate to={"/profile"}/>
	}

	return (
		<div style={{textAlign: 'center'}}>
			<h1> login </h1>
			<div style={{maxWidth: 600, margin: '0 auto'}}>
				<Form
					onFinish={handleSubmit(onSubmit)}
					labelCol={{span: 4}}
					wrapperCol={{span: 16}}

				>
					<Form.Item
						label={'email'}
					>

						{renderInput('email', 'text', Input,'mark-test-api@mail.ru', {
							maxLength:30,
							validate: {
								required,
								maxLengthError
							}
						}
						)}

					</Form.Item>

					<Form.Item
						label={'password'}
					>
						{renderInput('password', 'password', Input.Password, 'test123', {
							validate: {
								required,
							},

						})}

						{serverError && <div style={{color: 'red'}}>{serverError}</div>}
					</Form.Item>

					<Form.Item
						wrapperCol={{offset: 4, span: 16}}
					>
						<Controller
							name={"rememberMe"}
							control={control}
							defaultValue={false}

							render={({field: {value, onChange}}) => <Checkbox checked={value}
																			  onChange={onChange}> Remember
								me</Checkbox>}

						/>
					</Form.Item>


					<Form.Item
						wrapperCol={{offset: 4, span: 16}}
					>
						<Button htmlType={'submit'}>Login</Button>

					</Form.Item>
					<Form.Item>
						{captchaURL && <img src={captchaURL} alt={'captcha'}/>}
						{captchaURL &&
                            <Controller
                                name={"captcha"}
                                control={control}
                                rules={{required: true}}
                                render={({field}) => <Input style={{width: '250px'}} {...field} />}

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






