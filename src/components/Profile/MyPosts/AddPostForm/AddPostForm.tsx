import {maxLengthCreator, required} from "../../../../utils/validators/validations";
import s from "../MyPosts.module.css";

import {GetStringKeys} from "../../../../common/FormsControls/FormsControls";
import React, {FC} from "react";
import {Controller, useForm} from "react-hook-form";
import {addPostActionCreator} from "../../../../redux/profile_reducer";


export const AddPostForm: FC<{}> = (props) => {
    const {control, handleSubmit} = useForm<any>({ mode: "onChange"})



    const addPost = (values:AddPostFormValuesType) =>{
        addPostActionCreator(values.newPostText)
    }


    const maxLength = maxLengthCreator(15)
    return (
        <div className={s.postsBlock}>
            <form onSubmit={handleSubmit(addPost)}>
                <div>

                    <Controller
                        name={"newPostText"}
                        control={control}
                        rules = {{validate:{
                                required,
                                maxLength

                            }}}

                        render={({field}) => <textarea placeholder={"Write messages"} {...field}/>}

                    />

                    {/*{createField<addPostFormKeys>("", 'newPostText', [required, maxLength], Textarea)}*/}



                </div>
                <div>
                    <button>Add post</button>
                </div>
            </form>
        </div>
    )
}

// const PostReduxForm = reduxForm<AddPostFormValuesType & PropsType>({
//     form: 'postsForm'
// })(AddPostForm)

// export default PostReduxForm


type PropsType = {}
export type AddPostFormValuesType = {
    newPostText: string
}
type addPostFormKeys = GetStringKeys<AddPostFormValuesType>