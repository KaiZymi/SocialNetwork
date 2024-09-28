import {maxLengthCreator, required} from "../../../../utils/validators/validations";
import s from "../MyPosts.module.css";
import React, {ChangeEvent, FC} from "react";
import {Controller, useForm} from "react-hook-form";
import {addPost} from "../../../../features/profile/profile_reducer";
import {Button, Form, Input} from "antd";
import {useDispatch} from "react-redux";

const {TextArea} = Input;

export const AddPostForm: FC<{}> = (props) => {
    const {control, handleSubmit} = useForm<any>({ mode: "onChange"})
    const dispatch = useDispatch()

    const addPostCreator = (values:AddPostFormValuesType) =>{
        dispatch(addPost(values.newPostText))
    }

    const handleInput = (e:ChangeEvent<HTMLTextAreaElement>) => {
        e.target.style.height = 'auto'
        e.target.style.height = `${e.target.scrollHeight}px`
    };

    const maxLength = maxLengthCreator(15)


    return (
        <div className={s.postsBlock}>
            <Form onFinish={handleSubmit(addPostCreator)}>

                    <Controller
                        name={"newPostText"}
                        control={control}
                        rules = {{validate:{
                                required,
                                maxLength

                            }}}

                        render={({field}) =>
                            <TextArea
                            placeholder={"Write messages"}
                            style = {{resize: 'none',width: "400px", overflow:'hidden'}}
                            onInput={handleInput}
                            {...field}
                            />}

                    />

                    <div>
                        <Button htmlType="submit">Add post</Button>
                    </div>


            </Form>
        </div>
    )
}





export type AddPostFormValuesType = {
    newPostText: string
}
