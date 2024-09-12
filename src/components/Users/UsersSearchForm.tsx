import {Field, Form, Formik} from "formik";
import React, {FC} from "react";
import {FilterType} from "../../redux/users_reducer";
import {useSelector} from "react-redux";
import {getUsersFilter} from "../../redux/selecter_users";


const usersSearchFormValidate = () => {
    const errors = {};
    return errors
}

type FriendType = "true" | "false" | "null";
type FormType = {
    term: string,
    friend: FriendType
}

type PropsType = {
    onFilterChanged: (filter:FilterType)=> void
}

export const UsersSearchForm: FC<PropsType> = React.memo((props) => {

    const filter = useSelector(getUsersFilter)

    const submit = (values: FormType, {setSubmitting}: { setSubmitting: (setSubmitting: boolean) => void }) => {
        //Making a conversion string to boolean
        const filter : FilterType = {
            term: values.term,
            friend: values.friend === "null" ? null : values.friend === "true"
        }

        props.onFilterChanged(filter)
        setSubmitting(false);
    }

    return <div>

        <Formik
            enableReinitialize={true}
            initialValues={{term: filter.term, friend : String(filter.friend) as FriendType}}
            validate={usersSearchFormValidate}
            onSubmit={submit}
        >
            {({isSubmitting}) => (
                <Form>
                    <Field type="text" name = "term"/>
                    <Field name="friend" as="select">
                        <option value="null">All</option>
                        <option value="true">Only followed</option>
                        <option value="false">Only unfollowed</option>
                    </Field>
                    <button type="submit" disabled={isSubmitting}>
                        Submit
                    </button>
                </Form>
            )}
        </Formik>
    </div>
})