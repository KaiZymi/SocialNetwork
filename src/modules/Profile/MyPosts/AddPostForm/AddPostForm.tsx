import {maxLengthCreator, required} from "../../../../shared/model/validators/validations";
import s from "../MyPosts.module.css";
import React, {ChangeEvent, FC} from "react";
import {Controller, useForm} from "react-hook-form";

import {Button, Form, Input} from "antd";
import {profileActions} from "../../profile_reducer";

const {TextArea} = Input;

export const AddPostForm: FC<{}> = () => {
	const {control, handleSubmit} = useForm<any>({mode: "onChange"})

	const addPostCreator = (values: AddPostFormValuesType) => {
		profileActions.addPost(values.newPostText)
	}

	const handleInput = (e: ChangeEvent<HTMLTextAreaElement>) => {
		e.target.style.height = 'auto'
		e.target.style.height = `${e.target.scrollHeight}px`
	};

	const maxLength = maxLengthCreator(15)


	return (
		<div className={s.postsBlock}>
			<Form onFinish={handleSubmit(addPostCreator)}>

				<div className={s.postsBlock_message}>
					<Controller
						name={"newPostText"}
						control={control}
						rules={{
							validate: {
								required,
								maxLength

							}
						}}

						render={({field}) =>
							<TextArea
								placeholder={"Write messages"}
								style={{resize: 'none', width: "400px", overflow: 'hidden'}}
								onInput={handleInput}
								{...field}
							/>}

					/>
				</div>


				<div className={s.postsBlock_button}>
					<Button htmlType="submit">Add post</Button>
				</div>


			</Form>
		</div>
	)
}


export type AddPostFormValuesType = {
	newPostText: string
}
