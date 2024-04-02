import s from './Dialogs.module.css'
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";

import {InjectedFormProps, reduxForm} from "redux-form";
import {maxLengthCreator, required} from "../../utils/validators/validations";
import {createField, Textarea} from "../../common/FormsControls/FormsControls";
import {FC} from "react";
import {initialStateType} from "../../redux/dialogs_reducer";


type OwnPropsType = {
    dialogsPage : initialStateType
}

type mapDispatchType = {
    sendMessage: (newMessageBody:string) => void
}




const Dialogs: FC<OwnPropsType & mapDispatchType> = (props) => {
    
    let dialogsElements = props.dialogsPage.dialogsData.map(dialog => <DialogItem name={dialog.name} id={dialog.id} />)
    let messagesElements = props.dialogsPage.messageData.map( message => <Message message={message.message}/>)

	let addNewMessage = (values: {newMessageBody: string}) => {
		props.sendMessage(values.newMessageBody)
	}

    return (
        <div className={s.dialogs}>
            <div className={s.dialog_items}>
                {dialogsElements}
            </div>

            <div className={s.messages}>
                <div>{messagesElements}</div>
            </div>

			<DialogsReduxForm onSubmit={addNewMessage} />

        </div>
    )
}


const AddMessageForm: FC<InjectedFormProps<NewMessageFormValuesType, OwnFormPropsType> & OwnFormPropsType> = (props) =>{
	const maxLength = maxLengthCreator(100)

	return(
		<form onSubmit={props.handleSubmit} >
			<div>
                {createField<NewMessageFormKeys>("Enter ur message", 'newMessageBody', [required, maxLength], Textarea)}

			</div>
			<div>
				<button> Send </button>
			</div>
		</form>
	)
}

const DialogsReduxForm = reduxForm<NewMessageFormValuesType, OwnFormPropsType>({
	form: 'dialogAddMessage'
})(AddMessageForm)



export default Dialogs

type OwnFormPropsType = {

}

type NewMessageFormValuesType = {
    newMessageBody:string,

}

type NewMessageFormKeys = Extract<keyof NewMessageFormValuesType, string>