import {maxLengthCreator, required} from "../../../../utils/validators/validations";
import s from "../MyPosts.module.css";
import {InjectedFormProps, reduxForm} from "redux-form";
import {createField, GetStringKeys, Textarea} from "../../../../common/FormsControls/FormsControls";
import React, {FC} from "react";



const AddPostForm: FC<InjectedFormProps<AddPostFormValuesType, PropsType> & PropsType> = (props) => {
    const maxLength = maxLengthCreator(15)
    return (
        <div className={s.postsBlock}>
            <form onSubmit={props.handleSubmit}>
                <div>
                    {createField<addPostFormKeys>("", 'newPostText', [required, maxLength], Textarea)}
                </div>
                <div>
                    <button>Add post</button>
                </div>
            </form>
        </div>
    )
}

const PostReduxForm = reduxForm<AddPostFormValuesType & PropsType>({
    form: 'postsForm'
})(AddPostForm)

export default PostReduxForm


type PropsType = {}
export type AddPostFormValuesType = {
    newPostText: string
}
type addPostFormKeys = GetStringKeys<AddPostFormValuesType>