import React, {FC, useEffect} from "react";
import {FilterType} from "../../features/users/users_reducer";
import {useSelector} from "react-redux";
import {getUsersFilter} from "../../features/users/selector_users";
import {Controller, useForm} from "react-hook-form";
import {Button, Form, Input, Select} from "antd";


// const usersSearchFormValidate = () => {
// 	const errors = {};
// 	return errors
// }

type FriendType = "true" | "false" | "null";
type FormType = {
	term: string,
	friend: FriendType
}

type PropsType = {
	onFilterChanged: (filter: FilterType) => void
	filter: FilterType
}

export const UsersSearchForm: FC<PropsType> = React.memo(({onFilterChanged, filter}) => {

	// const filter = useSelector(getUsersFilter)
	const {control, handleSubmit, reset  } = useForm<FormType>()

	useEffect(() => {
		reset({
			term: filter.term,
			friend: String(filter.friend) as FriendType,
		});
	}, [filter, reset]);

	const submit = (values: FormType) => {
		//Making a conversion string to boolean
		const filter: FilterType = {
			term: values.term,
			friend: values.friend === "null" ? null : values.friend === "true"
		}

		onFilterChanged(filter)

	}

	return <div>

		<Form action=""
			  onFinish={handleSubmit(submit)}
		>
			<Controller
				name={'term'}
				control={control}
				render={({field: {onChange,value}}) =>
					<Input
						value={value}
						style={{maxWidth: 150}}
						onChange={onChange}
					/>}
			/>
			<Controller
				name={'friend'}
				control={control}
				render={({field: {onChange,value}}) =>
					<Select
						value={value}
						style={{width: 150}}
						onChange={onChange}
						options={[
							{value: 'null', label: 'All'},
							{value: 'true', label: 'Only followed'},
							{value: 'false', label: 'Only unfollowed'}
						]}
					/>


				}
			/>
			<Button htmlType={"submit"}>Submit</Button>
		</Form>


	</div>
})